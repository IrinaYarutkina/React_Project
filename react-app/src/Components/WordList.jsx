import React, { useContext, useState } from 'react';
import { WordsContext } from '../Context/WordsContext';
import ErrorMessage from './ErrorMessage';
import { Link } from 'react-router-dom';
import '../WordList.css';

function WordList() {
  const {
    words,
    error,
    loading,
    addWord,
    updateWord,
    deleteWord,
  } = useContext(WordsContext);

  const [editingId, setEditingId] = useState(null);
  const [editedWord, setEditedWord] = useState({ english: '', russian: '', transcription: '' });
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const startEditing = (word) => {
    setEditingId(word.id);
    setEditedWord({ ...word });
    setIsAddingNew(false);
    setErrorMessage('');
  };

  const cancelEditing = () => {
    setEditingId(null);
    setIsAddingNew(false);
    setEditedWord({ english: '', russian: '', transcription: '' });
    setErrorMessage('');
  };

  const saveEditing = async (id) => {
    const { english, russian, transcription } = editedWord;
    if (!english.trim() || !russian.trim() || !transcription.trim()) {
      setErrorMessage('Все поля обязательны для заполнения.');
      return;
    }

    try {
      if (isAddingNew) {
        await addWord(editedWord);
      } else {
        await updateWord({ ...editedWord, id });
      }
      cancelEditing();
    } catch (err) {
      setErrorMessage(err.message || 'Ошибка при сохранении слова');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteWord(id);
    } catch (err) {
      setErrorMessage(err.message || 'Ошибка при удалении слова');
    }
  };

  const startCreating = () => {
    setEditingId(null);
    setIsAddingNew(true);
    setEditedWord({ english: '', russian: '', transcription: '' });
    setErrorMessage('');
  };

  if (loading) return <p>Загрузка...</p>;

  return (
    <div className="word-list">
      <h2>Список слов</h2>

      <ErrorMessage message={errorMessage || error} />

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
        <td>{!isNew && <Link to={`/card/${word.id}`}>Перейти</Link>}</td>
        <td>
          <button className="save-word-button" onClick={() => saveEditing(word.id)}>Сохранить</button>
          <button className="cancel-word-button" onClick={cancelEditing}>Отмена</button>
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
        <button className="edit-button" onClick={() => startEditing(word)}>Редактировать</button>
        <button className="delete-button" onClick={() => deleteWord(word.id)}>Удалить</button>
      </td>
    </tr>
  );
}

export default WordList;
