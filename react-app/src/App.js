import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './Components/Header';
import Card from './Components/Card';
import WordList from './Components/WordList';
import Footer from './Components/Footer';
import NotFound from './Components/NotFound';
import './App.css';

function AppContent() {
  const [learnedCount, setLearnedCount] = useState(0);
  const location = useLocation();

  const incrementLearnedCount = () => {
    setLearnedCount(prev => prev + 1);
  };
//обнуление счетчика
  useEffect(() => {
    if (location.pathname === '/card/1') {
      setLearnedCount(0);
    }
  }, [location.pathname]);
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
      <AppContent />
    </Router>
  );
}

export default App;

