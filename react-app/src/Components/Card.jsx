import React, { useState, useEffect, useRef, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { WordsContext } from '../Context/WordsContext';
import '../Card.css';


function Card({ onViewTranslation, learnedCount }) {
  const { words, loading, error } = useContext(WordsContext);
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

  if (loading || words.length === 0) {
    return (
      <div id="loadingText"> 
      <div id="loadingText_1" className="loadingText"> З </div>
      <div id="loadingText_2" className="loadingText"> а </div>
      <div id="loadingText_3" className="loadingText"> г </div>
      <div id="loadingText_4" className="loadingText"> р </div>
      <div id="loadingText_5" className="loadingText"> у </div>
      <div id="loadingText_6" className="loadingText"> з </div>
      <div id="loadingText_7" className="loadingText"> к </div>
      <div id="loadingText_8" className="loadingText"> а </div>
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
    const currentIndex = words.findIndex(w => w.id === currentId);
    return currentIndex === 0 ? words[words.length - 1].id : words[currentIndex - 1].id;
  };

  const getNextId = () => {
    const currentIndex = words.findIndex(w => w.id === currentId);
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
}

export default Card; 




/* import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../Card.css';

const words = [
  { id: 1, word: 'apple', translation: 'яблоко' },
  { id: 2, word: 'book', translation: 'книга' },
  { id: 3, word: 'sun', translation: 'солнце' },
];

function Card({ onViewTranslation, learnedCount}) {
  const { id } = useParams();
  const navigate = useNavigate();

  // id из строки в число
  const currentId = parseInt(id, 10);
  const word = words.find(w => w.id === currentId);
  const [showTranslation, setShowTranslation] = useState(false);
  const [viewed, setViewed] = useState(false);
  const showTranslationBtnRef = useRef(null); 

  useEffect(() => {
    // скрывается перевод при смене слова
    setShowTranslation(false);
    setViewed(false);
    // автофокус на кнопке "показать перевод"
    if (showTranslationBtnRef.current) {
      showTranslationBtnRef.current.focus();
    }
  }, [id]);

  if (!word) {
    return <div>Слово не найдено</div>;
  }
  const handleShowTranslation = () => {
    if (!viewed && onViewTranslation) {
      onViewTranslation(); // увеличиваем счётчик
      setViewed(true);
    }
    setShowTranslation(true);
  };

  // переход по словам
  const goPrev = () => {
    const prevId = currentId === words[0].id ? words[words.length - 1].id : currentId - 1;
    navigate(`/card/${prevId}`);
  };

  const goNext = () => {
    const nextId = currentId === words[words.length - 1].id ? words[0].id : currentId + 1;
    navigate(`/card/${nextId}`);
  }; 

  return (
    <div>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '420px', margin: '20px auto' }}>
        <button className="word-list-button" onClick={goPrev}>← Назад</button>
        <button className="word-list-button" onClick={goNext}>Вперед →</button>
      </div>

        
      <div className="word-card">
        <div className="card-content">
          <p className="english-word"><strong>Слово:</strong> {word.word}</p>

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
              <p className="translation"><strong>Перевод:</strong> {word.translation}</p>
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
}

export default Card; */ 
