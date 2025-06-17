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
          <Route path="/" element={<WordList />} />         {/* ← добавь это */}
          <Route path="/words" element={<WordList />} />
          <Route path="/card/:id" element={<Card />} />
</Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

