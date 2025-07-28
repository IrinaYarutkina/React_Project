import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useStores } from '../stores/StoreContext';
import ErrorMessage from './ErrorMessage';
import '../WordList.css';

const WordList = observer(() => {
  const { wordStore } = useStores();
  const { words, loading, error } = wordStore;

  const [editingId, setEditingId] = useState(null);
  const [editedWord, setEditedWord] = useState(emptyWord());
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
    setEditingId(word.id);
    setEditedWord({ ...word });
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
    if (!editedWord.english.trim() || !editedWord.russian.trim()) {
      setErrorMessage('❌ Пожалуйста, заполните поля "english" и "russian".');
      return;
    }

    try {
      if (isAddingNew) {
        await wordStore.addWord(editedWord);
      } else {
        await wordStore.updateWord({ ...editedWord, id });
      }
    } catch (err) {
      setErrorMessage(`Ошибка: ${err.message}`);
    }

    cancelEditing();
  };

  const handleDelete = async (id) => {
    try {
      await wordStore.deleteWord(id);
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
});

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
