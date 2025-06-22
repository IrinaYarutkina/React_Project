import { Link } from 'react-router-dom'; 
import '../Header.css';
import logo from '../assets/logo.png'; 

function Header(){
    return (
        <header className="app-header">
            <div className="logo-container">
                <Link to="/" className="logo-link">
                    <img src={logo} alt="Логотип" className="logo" />
                </Link>
                <h1 className="site-title">Словарь</h1>
            </div>
            <nav className="nav-buttons">
                <Link to="/" className="nav-link">Главная</Link>
                <Link to="/cards" className="nav-link">Карточки</Link>
            </nav>
        </header>
        );
}

export default Header