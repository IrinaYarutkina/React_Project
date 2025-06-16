import { useParams } from 'react-router-dom';

const words = [
    { id: 1, word: 'apple', translation: 'яблоко' },
    { id: 2, word: 'book', translation: 'книга' },
    { id: 3, word: 'sun', translation: 'солнце' },
];

function WordCard() {
    const { id } = useParams();
    const word = words.find((w) => w.id === parseInt(id));

    if (!word) {
    return <div>Слово не найдено</div>;
    }

    return (
    <div className="word-card">
        <h2>Карточка слова</h2>
        <p><strong>{word.word}</strong> — {word.translation}</p>
    </div>
    );
}

export default WordCard;
