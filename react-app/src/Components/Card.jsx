import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../Card.css';

const words = [
  { id: 1, word: 'apple', translation: 'яблоко' },
  { id: 2, word: 'book', translation: 'книга' },
  { id: 3, word: 'sun', translation: 'солнце' },
];

function Card() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Преобразуем id из строки в число
  const currentId = parseInt(id, 10);

  const word = words.find(w => w.id === currentId);

  const [showTranslation, setShowTranslation] = useState(false);

  useEffect(() => {
    // При смене слова перевод скрываем
    setShowTranslation(false);
  }, [id]);

  if (!word) {
    return <div>Слово не найдено</div>;
  }

  // Функции перехода по словам
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
      {/* Кнопки вне карточки */}
      <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '420px', margin: '20px auto' }}>
        <button className="word-list-button" onClick={goPrev}>← Назад</button>
        <button className="word-list-button" onClick={goNext}>Вперед →</button>
      </div>

      {/* Карточка слова */}
      <div className="word-card">
        <div className="card-content">
          <p className="english-word"><strong>Слово:</strong> {word.word}</p>

          {!showTranslation ? (
            <button
              className="word-list-button"
              onClick={() => setShowTranslation(true)}
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
        </div>
      </div>
    </div>
  );
}

export default Card;
