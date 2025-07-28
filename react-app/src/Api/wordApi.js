

const API_BASE = 'http://itgirlschool.justmakeit.ru/api/words';

export async function fetchWords() {
    const response = await fetch(API_BASE);
    if (!response.ok) throw new Error('Ошибка при получении слов');
    const data = await response.json();
    return data.map(word => ({
    ...word,
    id: parseInt(word.id, 10),
    }));
}

export async function addWord(newWord) {
    const response = await fetch(`${API_BASE}/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newWord),
    });
    if (!response.ok) throw new Error('Ошибка при добавлении слова');
}

export async function updateWord(updatedWord) {
    const response = await fetch(`${API_BASE}/${updatedWord.id}/update`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedWord),
    });
    if (!response.ok) throw new Error('Ошибка при обновлении слова');
}

export async function deleteWord(id) {
    const response = await fetch(`${API_BASE}/${id}/delete`, {
        method: 'POST',
    });
    if (!response.ok) throw new Error('Ошибка при удалении слова');
}
