import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './Components/Header';
import Card from './Components/Card';
import WordList from './Components/WordList';
import Footer from './Components/Footer';
import NotFound from './Components/NotFound';
import { StoreProvider, useStores } from './stores/StoreContext'; 
import { observer } from 'mobx-react-lite';               
import { themeStore } from './stores/themeStore';  
import './App.css';

const AppContent = observer(() => { 
  const { wordStore } = useStores();  
  const [learnedWordsSet, setLearnedWordsSet] = useState(new Set());
  const location = useLocation();

  const incrementLearnedCount = (wordId) => {
    setLearnedWordsSet(prevSet => {
      if (prevSet.has(wordId)) return prevSet; 
      const newSet = new Set(prevSet);
      newSet.add(wordId);
      return newSet;
    });
  };

  // Обнуление счётчика при переходе на первую карточку
  useEffect(() => {
    wordStore.fetchWords();
  }, [wordStore]);

  useEffect(() => {
    if (location.pathname === '/card/1') {
      setLearnedWordsSet(new Set());
    }
  }, [location.pathname]);

  const learnedCount = learnedWordsSet.size;

  return (
    <div className={`App ${themeStore.theme === 'dark' ? 'dark-theme' : 'light-theme'}`}> 
      <Header />
      <button onClick={() => themeStore.toggleTheme()} style={{ position: 'absolute', top: 10, right: 10 }}>
        Сменить тему
      </button> 
      <Routes>
        <Route path="/" element={<WordList />} />
        <Route path="/words" element={<WordList />} />
        <Route
          path="/card/:id"
          element={
            <Card 
              onViewTranslation={incrementLearnedCount} 
              learnedCount={learnedCount}
            />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
});

function App() {
  return (
    <Router>
      <StoreProvider>  
        <AppContent /> 
      </StoreProvider> 
    </Router>
  );
}

export default App;
