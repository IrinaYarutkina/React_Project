import { makeAutoObservable, runInAction } from "mobx";

class WordStore {
    words = [];
    loading = true;
    error = null;
    apiBase = 'http://itgirlschool.justmakeit.ru/api/words';

    constructor() {
        makeAutoObservable(this);
    }

    // Загрузка слов
    fetchWords = async () => {
    this.loading = true;
    try {
        const response = await fetch(this.apiBase);
        if (!response.ok) throw new Error('Ошибка при получении слов');
        const data = await response.json();

    runInAction(() => {
        this.words = data.map(word => ({
        ...word,
        id: parseInt(word.id, 10),
        }));
        this.error = null;
        this.loading = false;
        });
    } catch (err) {
        runInAction(() => {
        this.error = err.message;
        this.loading = false;
        });
    }
    };

// Добавление слова
    addWord = async (newWord) => {
    try {
        const response = await fetch(`${this.apiBase}/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newWord),
    });
        if (!response.ok) throw new Error('Ошибка при добавлении слова');
        this.fetchWords();
    } catch (err) {
        runInAction(() => {
        this.error = err.message;
    });
    }
    };

  // Обновление слова
    updateWord = async (updatedWord) => {
    try {
        const response = await fetch(`${this.apiBase}/${updatedWord.id}/update`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedWord),
    });
        if (!response.ok) throw new Error('Ошибка при обновлении слова');
        this.fetchWords();
    } catch (err) {
        runInAction(() => {
        this.error = err.message;
        });
    }
    };

  // Удаление слова
    deleteWord = async (id) => {
    try {
        const response = await fetch(`${this.apiBase}/${id}/delete`, {
        method: 'POST',
        });
        if (!response.ok) throw new Error('Ошибка при удалении слова');
        runInAction(() => {
        this.words = this.words.filter(w => w.id !== id);
    });
    } catch (err) {
        runInAction(() => {
        this.error = err.message;
        });
    }
    };
}

const wordStore = new WordStore();
export default wordStore; 
