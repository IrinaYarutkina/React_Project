import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { WordsContext } from '../Context/WordsContext'; 
import '../Header.css';
import logo from '../assets/logo.png'; 

function Header(){
    const { words } = useContext(WordsContext);
  const navigate = useNavigate();

  const handleCardsClick = () => {
    if (words.length > 0) {
      navigate(`/card/${words[0].id}`); // Переход на первый ID
    } else {
      navigate('/'); // Если слов нет
    }
  };

    return (
        <header className="app-header">
            <div className="logo-container">
                <Link to="/" className="logo-link">
                    <img src={logo} alt="Логотип" className="logo" />
                </Link>
                <h1 className="site-title">Словарь</h1>
            </div>
            <nav className="nav-buttons">
        <button 
          onClick={() => navigate('/')}
          className="nav-link"
        >
          Главная
        </button>
        <button 
          onClick={handleCardsClick} 
          className="nav-link"
        >
          Карточки
        </button>          
      </nav>
        </header>
        );
}
//// <Link to="/card/1" className="nav-link">Карточки</Link>   
export default Header