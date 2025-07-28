import { Link, useNavigate } from 'react-router-dom';
import { useStores } from '../stores/StoreContext';
import { observer } from 'mobx-react-lite';
import '../Header.css';
import logo from '../assets/logo.png';  

  const Header = observer(() => {
  const { wordStore } = useStores();
  const { words } = wordStore;
  const navigate = useNavigate();
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
          onClick={() => {
            if (words.length > 0) {
              navigate(`/card/${words[0].id}`);
            } else {
              navigate('/');
            }
          }}
          className="nav-link"
        >
          Карточки
        </button>          
      </nav>
    </header>
  );
});

export default Header;