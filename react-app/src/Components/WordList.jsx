import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { WordsContext } from '../Context/WordsContext';
import ErrorMessage from './ErrorMessage';
import '../WordList.css';

function WordList() {
  const {
    words,
    loading,
    error,
    addWord,
    updateWord,
    deleteWord,
  } = useContext(WordsContext);

  const [editingId, setEditingId] = useState(null);
  const [editedWord, setEditedWord] = useState({ word: '', translation: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [isAddingNew, setIsAddingNew] = useState(false); 

  function emptyWord() {
    return {
      english: '',
      russian: '',
      transcription: '',
      tags: '',
      tags_json: ''
    };
  }

  const startEditing = (word) => {
    setEditingId({
      english: word.english,
      russian: word.russian,
      transcription: word.transcription || '',
      tags: word.tags || '',
      tags_json: word.tags_json || ''
    });
    setIsAddingNew(false);
    setErrorMessage('');
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditedWord(emptyWord());
    setIsAddingNew(false);
    setErrorMessage('');
  };

  const saveEditing = async (id) => {
    const isEmpty = !editedWord.english.trim() || !editedWord.russian.trim();
    if (isEmpty) {
      setErrorMessage('❌ Пожалуйста, заполните поля "english" и "russian".');
      return;
    } 

    try {
      if (isAddingNew) {
        await addWord(editedWord);
        console.log('✅ Новое слово добавлено:', editedWord);
      } else {
        await updateWord({ ...editedWord, id });
        console.log('✅ Слово обновлено:', editedWord);
      }
    } catch (err) {
      setErrorMessage(`Ошибка: ${err.message}`);
    }

    cancelEditing();
  }; 

  const handleDelete = async (id) => {
    try {
      await deleteWord(id);
    } catch (err) {
      setErrorMessage(`Ошибка: ${err.message}`);
    }
  };

  const startCreating = () => {
    setIsAddingNew(true);
    setEditingId(null);
    setEditedWord(emptyWord());
    setErrorMessage('');
  };

  if (loading) return <p>Загрузка...</p>;
  if (error) return <ErrorMessage message={error} />; 

  return (
    <div className="word-list">
      <h2>Список слов</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <button className="add-button" onClick={startCreating}>
        ➕ Добавить слово
      </button>
      <table>
        <thead>
          <tr>
            <th>English</th>
            <th>Russian</th>
            <th>Transcription</th>
            <th>Карточка</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {words.map((word) => ( 
            <WordRow
            key={word.id}
              word={word}
              isEditing={editingId === word.id}
              editedWord={editedWord}
              startEditing={startEditing}
              cancelEditing={cancelEditing}
              saveEditing={saveEditing}
              deleteWord={handleDelete}
              setEditedWord={setEditedWord}
          />
        ))}
        {isAddingNew && (
            <WordRow
            word={{ id: null }}
            isEditing={true}
            editedWord={editedWord}
            cancelEditing={cancelEditing}
            saveEditing={saveEditing}
            setEditedWord={setEditedWord}
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
  isNew = false,
}) {

  if (isEditing) {
    return (
      <tr>
        <td>
          <input
            type="text"
            value={editedWord.english}
            onChange={(e) =>
              setEditedWord({ ...editedWord, english: e.target.value })
            }
            className={!editedWord.english.trim() ? 'input-error' : ''}
          />
        </td> 
        <td>
          <input
            type="text"
            value={editedWord.russian}
            onChange={(e) =>
              setEditedWord({ ...editedWord, russian: e.target.value })
            }
            className={!editedWord.russian.trim() ? 'input-error' : ''}
          />
        </td>
        <td>
          <input
            type="text"
            value={editedWord.transcription}
            onChange={(e) =>
              setEditedWord({ ...editedWord, transcription: e.target.value })
            }
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
      <td><strong>{word.english}</strong></td>
      <td>{word.russian}</td>
      <td>{word.transcription}</td>
      <td><Link to={`/card/${word.id}`}>Перейти</Link></td>
      <td>
        <button onClick={() => startEditing(word)}>Редактировать</button>
        <button onClick={() => deleteWord(word.id)}>Удалить</button>
      </td>
    </tr>
  );
}

export default WordList;






/* const initialWords = [
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

export default WordList; */ 