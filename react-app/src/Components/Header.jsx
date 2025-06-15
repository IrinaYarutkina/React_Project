import { Link } from 'react-router-dom'; 
import '../Header.css';
function Header(){
    return (
        <header className="app-header"> 
            <h1> Словарь </h1>
            <nav className="nav-buttons"> 
                <Link to="" className="nav-link"> Cписок слов </Link>
                <Link to="" className="nav-link"> Карточки </Link>
            </nav>
        </header>
    )
}

export default Header