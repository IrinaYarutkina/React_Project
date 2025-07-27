import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useStores } from '../stores/StoreContext';
import '../Card.css';

const Card = observer(({ onViewTranslation, learnedCount }) => {
  const { wordStore } = useStores();
  if (!wordStore) return <div>Ошибка загрузки данных</div>;
  const { words = [], loading, error } = wordStore;

  const { id } = useParams();
  const navigate = useNavigate();

  const currentId = parseInt(id, 10);
  const [showTranslation, setShowTranslation] = useState(false);
  const [viewed, setViewed] = useState(false);
  const showTranslationBtnRef = useRef(null);

  useEffect(() => {
    setShowTranslation(false);
    setViewed(false);
    if (showTranslationBtnRef.current) {
      showTranslationBtnRef.current.focus();
    }
  }, [id]);

  if (loading || !Array.isArray(words) || words.length === 0) {
    return (
      <div id="loadingText"> 
        {'Загрузка'.split('').map((char, i) => (
          <div key={i} id={`loadingText_${i + 1}`} className="loadingText">
            {char}
          </div>
        ))}
      </div>
    );
  }

  if (error) return <p>Ошибка: {error}</p>;

  const word = words.find((w) => w.id === currentId);

  if (!word) {
    console.log('❌ Слово не найдено. currentId:', currentId, 'Список слов:', words);
    return <div>Слово не найдено</div>;
  }

  const handleShowTranslation = () => {
    if (!viewed && onViewTranslation) {
      onViewTranslation();
      setViewed(true);
    }
    setShowTranslation(true);
  };

  const getPrevId = () => {
    const currentIndex = words.findIndex((w) => w.id === currentId);
    return currentIndex === 0 ? words[words.length - 1].id : words[currentIndex - 1].id;
  };

  const getNextId = () => {
    const currentIndex = words.findIndex((w) => w.id === currentId);
    return currentIndex === words.length - 1 ? words[0].id : words[currentIndex + 1].id;
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '420px', margin: '20px auto' }}>
        <button className="word-list-button" onClick={() => navigate(`/card/${getPrevId()}`)}>← Назад</button>
        <button className="word-list-button" onClick={() => navigate(`/card/${getNextId()}`)}>Вперед →</button>
      </div>

      <div className="word-card">
        <div className="card-content">
          <p className="english-word"><strong>Слово:</strong> {word.english}</p>
          <p><strong>Транскрипция:</strong> {word.transcription}</p>

          {!showTranslation ? (
            <button
              ref={showTranslationBtnRef}
              className="word-list-button"
              onClick={handleShowTranslation}
            >
              Показать перевод
            </button>
          ) : (
            <>
              <p className="translation"><strong>Перевод:</strong> {word.russian}</p>
              <button
                className="word-list-button"
                onClick={() => setShowTranslation(false)}
                style={{ marginTop: '10px' }}
              >
                Скрыть перевод
              </button>
            </>
          )}

          <p style={{ marginTop: '20px', fontStyle: 'italic' }}>
            Изучено слов за тренировку: {learnedCount}
          </p>
        </div>
      </div>
    </div>
  );
});

export default Card;
