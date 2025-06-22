import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

function NotFound() {
    return (
        <div className="not-found-container">
            <h1>404</h1>
            <p>Упс! Такой страницы не существует.</p>
            <Link to="/" className="back-home-button">Вернуться на главную</Link>
        </div>
    );
}

export default NotFound;
