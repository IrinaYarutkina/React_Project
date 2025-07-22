import { createContext, useState, useEffect } from 'react';

export const WordsContext = createContext();

export function WordsProvider({ children }) {
    const [words, setWords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const apiBase = 'http://itgirlschool.justmakeit.ru/api/words';

  // Загрузка слов
    const fetchWords = async () => {
        setLoading(true);
        try {
            const response = await fetch(apiBase);
            if (!response.ok) throw new Error('Ошибка при получении слов');
            const data = await response.json();
            
            const normalizedData = data.map(word => ({
                ...word,
                id: parseInt(word.id, 10), 
            }));

            setWords(normalizedData);
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }; 
        
  // Добавление слова
    const addWord = async (newWord) => {
    try {
        const response = await fetch(`${apiBase}/add`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newWord),
        });
        if (!response.ok) throw new Error('Ошибка при добавлении слова');
        await fetchWords(); // Перезагрузка списка
    } catch (err) {
        setError(err.message);
    }
};


  // Обновление слова
  const updateWord = async (updatedWord) => {
    try {
        const response = await fetch(`${apiBase}/${updatedWord.id}/update`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedWord),
        });
        if (!response.ok) throw new Error('Ошибка при обновлении слова');
        await fetchWords(); // Перезагрузка списка
    } catch (err) {
        setError(err.message);
    }
};

  // Удаление слова
    const deleteWord = async (id) => {
    try {
        const response = await fetch(`${apiBase}/${id}/delete`, {
            method: 'POST',
        });
        if (!response.ok) throw new Error('Ошибка при удалении слова');
        setWords(prev => prev.filter(w => w.id !== id));
    } catch (err) {
        setError(err.message);
    }
};

    useEffect(() => {
    fetchWords();
    }, []);

    return (
        <WordsContext.Provider value={{
            words,
            loading,
            error,
            addWord,
            updateWord,
            deleteWord
        }}>
            {children}
        </WordsContext.Provider>
    );
}