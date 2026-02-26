import React from 'react';
import './Header.css';

interface HeaderProps {
  posts: any[];
}

export const Header: React.FC<HeaderProps> = ({ posts }) => {
  return (
    <header className="app-header">
      <h1 className="gradient-text">🚀 React Mastery</h1>
      <div className="header-stats">
        <span>Всего постов: {posts.length}</span>
      </div>
    </header>
  );
};