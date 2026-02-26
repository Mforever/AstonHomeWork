import React from 'react';
import { Link } from 'react-router-dom';
import './NotFoundPage.css';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="not-found-page">
      <h1>404</h1>
      <h2>Страница не найдена</h2>
      <p>Запрашиваемая страница не существует</p>
      <Link to="/posts" className="home-link">Вернуться на главную</Link>
    </div>
  );
};