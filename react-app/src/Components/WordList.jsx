import React from 'react';
import { Link } from 'react-router-dom';
import '../WordList.css'; 

const words = [
{ id: 1, word: 'apple', translation: 'яблоко' },
{ id: 2, word: 'book', translation: 'книга' },
{ id: 3, word: 'sun', translation: 'солнце' },
];

function WordList() {
    return (
        <div className="word-list">
            <h2>Список слов</h2>
            <ul>
                {words.map((word) => (
                    <li key={word.id}>
                        <strong>{word.word}</strong> — {word.translation}
                        {/* Ссылка */}
                        <Link to="/card" style={{ marginLeft: '10px' }}>
                Перейти к карточке
                        </Link>
                    </li>
        ))}
            </ul>
        </div>
    );
}

export default WordList;
