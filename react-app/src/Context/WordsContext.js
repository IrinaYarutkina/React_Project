import { createContext, useState, useEffect } from 'react';
import * as wordsApi from '../Api/wordApi';

export const WordsContext = createContext();

export function WordsProvider({ children }) {
    const [words, setWords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadWords = async () => {
        setLoading(true);
        try {
        const data = await wordsApi.fetchWords();
        setWords(data);
        setError(null);
        } catch (err) {
        setError(err.message);
    } finally {
        setLoading(false);
    }
    };

    const addWord = async (newWord) => {
    try {
        await wordsApi.addWord(newWord);
        await loadWords();
    } catch (err) {
        setError(err.message);
    }
    };

    const updateWord = async (updatedWord) => {
    try {
        await wordsApi.updateWord(updatedWord);
        await loadWords();
    } catch (err) {
        setError(err.message);
    }
    };

    const deleteWord = async (id) => {
    try {
        await wordsApi.deleteWord(id);
        await loadWords();
    } catch (err) {
        setError(err.message);
    }
    };

    useEffect(() => {
        loadWords();
    }, []);

    return (
        <WordsContext.Provider value={{
        words,
        loading,
        error,
        loadWords, 
        addWord,
        updateWord,
        deleteWord,
    }}>
        {children}
        </WordsContext.Provider>
    );
}

export default WordsProvider; 