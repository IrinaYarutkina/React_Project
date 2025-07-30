import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './Components/Header';
import Card from './Components/Card';
import WordList from './Components/WordList';
import Footer from './Components/Footer';
import NotFound from './Components/NotFound';
import { StoreProvider, useStores } from './stores/StoreContext'; 
import './App.css';

function AppContent() {
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
//обнуление счетчика
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
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<WordList />} />
        <Route path="/words" element={<WordList />} />
        <Route
          path="/card/:id"
          element={
            <Card onViewTranslation={incrementLearnedCount} learnedCount={learnedCount}
            />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

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

