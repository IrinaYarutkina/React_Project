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
    const [errorMessage, setErrorMessage] = useState(''); 
    const [isAddingNew, setIsAddingNew] = useState(false);

    const startEditing = (word) => {
    setEditingId(word.id);
    setEditedWord({ word: word.word, translation: word.translation });
    setIsAddingNew(false); 
    setErrorMessage(''); 
};

    const cancelEditing = () => {
    setEditingId(null);
    setEditedWord({ word: '', translation: '' });
    setIsAddingNew(false);
    setErrorMessage('');
    };

    const saveEditing = (id) => {
      const isWordEmpty = editedWord.word.trim() === '';
      const isTranslationEmpty = editedWord.translation.trim() === '';
  
      if (isWordEmpty || isTranslationEmpty) {
        setErrorMessage('❌ Пожалуйста, заполните все поля перед сохранением.');
        return; 
      } 
      if (isAddingNew) {
        const newId = Math.max(...words.map(w => w.id)) + 1;
        const newWord = { id: newId, ...editedWord };
        setWords([...words, newWord]);
        console.log('✅ Новое слово добавлено:', newWord);
      } else {
        const updatedWords = words.map(w =>
          w.id === id ? { ...w, ...editedWord } : w
        );
        setWords(updatedWords);
        console.log('✅ Слово обновлено:', editedWord);
      }

      cancelEditing();
    }; 

    const deleteWord = (id) => {
    setWords(words.filter(w => w.id !== id));
    };

    const startCreating = () => {
      setIsAddingNew(true);
      setEditingId(null);
      setEditedWord({ word: '', translation: '' });
      setErrorMessage('');
    };

    return (
        <div className="word-list">
            <h2>Список слов</h2>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <button className="add-button" onClick={startCreating}>➕ Добавить слово</button> 
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
                            isEditing={editingId === word.id}
                            />
                        ))}
                        {isAddingNew && (
                          <WordRow
                            word={{ id: null, word: '', translation: '' }}
                            editingId={null}
                            editedWord={editedWord}
                            startEditing={startEditing}
                            cancelEditing={cancelEditing}
                            saveEditing={saveEditing}
                            deleteWord={deleteWord}
                            setEditedWord={setEditedWord}
                            isEditing={true}
                            isNew={true}
                          />
                        )}
                </tbody>
            </table>
        </div>
    );
}

function WordRow({
  word,
  editedWord,
  isEditing,
  startEditing,
  cancelEditing,
  saveEditing,
  deleteWord,
  setEditedWord,
  isNew = false
}) {
  const isWordEmpty = editedWord.word.trim() === '';
  const isTranslationEmpty = editedWord.translation.trim() === '';

  if (isEditing) {
    return (
      <tr>
        <td>
          <input
            type="text"
            value={editedWord.word}
            onChange={(e) =>
              setEditedWord({ ...editedWord, word: e.target.value })
            }
            className={isWordEmpty ? 'input-error' : ''}
          />
        </td>
        <td>
          <input
            type="text"
            value={editedWord.translation}
            onChange={(e) =>
              setEditedWord({ ...editedWord, translation: e.target.value })
            }
            className={isTranslationEmpty ? 'input-error' : ''}
          />
        </td>
        <td>
          {!isNew && <Link to={`/card/${word.id}`}>Перейти</Link>}
        </td>
        <td>
          <button onClick={() => saveEditing(word.id)}>Сохранить</button>
          <button onClick={cancelEditing}>Отмена</button>
        </td>
      </tr>
    );
  }
  return (
    <tr>
      <td><strong>{word.word}</strong></td>
      <td>{word.translation}</td>
      <td>
        <Link to={`/card/${word.id}`}>Перейти</Link>
      </td>
      <td>
        <button onClick={() => startEditing(word)}>Редактировать</button>
        <button onClick={() => deleteWord(word.id)}>Удалить</button>
      </td>
    </tr>
  );
}

export default WordList;