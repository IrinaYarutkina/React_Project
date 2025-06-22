import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../WordList.css';

const initialWords = [
    { id: 1, word: 'apple', translation: 'яблоко' },
    { id: 2, word: 'book', translation: 'книга' },
    { id: 3, word: 'sun', translation: 'солнце' },
];

function WordList() {
    const [words, setWords] = useState(initialWords);
    const [editingId, setEditingId] = useState(null);
    const [editedWord, setEditedWord] = useState({ word: '', translation: '' });

    const startEditing = (word) => {
    setEditingId(word.id);
    setEditedWord({ word: word.word, translation: word.translation });
};

    const cancelEditing = () => {
    setEditingId(null);
    setEditedWord({ word: '', translation: '' });
    };

    const saveEditing = (id) => {
    setWords(words.map(w => (w.id === id ? { ...w, ...editedWord } : w)));
    cancelEditing();
    };

    const deleteWord = (id) => {
    setWords(words.filter(w => w.id !== id));
    };

    return (
        <div className="word-list">
            <h2>Список слов</h2>
            <table>
                <thead>
                <tr>
                    <th>Слово</th>
                    <th>Перевод</th>
                    <th>Карточка</th>
                    <th>Действия</th>
                </tr>
                </thead>
                <tbody>
                    {words.map((word) => (
                        <WordRow
                            key={word.id}
                            word={word}
                            editingId={editingId}
                            editedWord={editedWord}
                            startEditing={startEditing}
                            cancelEditing={cancelEditing}
                            saveEditing={saveEditing}
                            deleteWord={deleteWord}
                            setEditedWord={setEditedWord}
                            />
                        ))}
                </tbody>
            </table>
        </div>
    );
}

function WordRow({
  word,
  editingId,
  editedWord,
  startEditing,
  cancelEditing,
  saveEditing,
  deleteWord,
  setEditedWord
}) {
  const isEditing = editingId === word.id;

  return (
    <tr>
      {isEditing ? (
        <>
          <td>
            <input
              type="text"
              value={editedWord.word}
              onChange={(e) =>
                setEditedWord({ ...editedWord, word: e.target.value })
              }
            />
          </td>
          <td>
            <input
              type="text"
              value={editedWord.translation}
              onChange={(e) =>
                setEditedWord({ ...editedWord, translation: e.target.value })
              }
            />
          </td>
          <td>
            <Link to={`/card/${word.id}`}>Перейти</Link>
          </td>
          <td>
            <button onClick={() => saveEditing(word.id)}>Сохранить</button>
            <button onClick={cancelEditing}>Отмена</button>
          </td>
        </>
      ) : (
        <>
          <td><strong>{word.word}</strong></td>
          <td>{word.translation}</td>
          <td>
            <Link to={`/card/${word.id}`}>Перейти</Link>
          </td>
          <td>
            <button
              className="word-list-button"
              onClick={() => startEditing(word)}
            >
              Редактировать
            </button>
            <button
              className="word-list-button-delete"
              onClick={() => deleteWord(word.id)}
            >
              Удалить
            </button>
          </td>
        </>
      )}
    </tr>
  );
}

export default WordList;
