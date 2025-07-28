import React from 'react';
import './ErrorMessage.css';

function ErrorMessage({ message }) {
    if (!message) return null;

    return (
        <div className="error-message">
        <span role="img" aria-label="Ошибка">❌</span> {message}
        </div>
    );
}

export default ErrorMessage; 