import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import Card from './Components/Card';
import WordList from './Components/WordList';
import Footer from './Components/Footer';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/words" element={<WordList />} />
          <Route path="/card" element={<Card />} />
          {/* можно и стартовую страницу */}
          <Route path="/" element={<WordList />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

