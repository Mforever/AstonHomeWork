import React, { memo } from 'react';
import { Post } from '../../types';

interface HeaderProps {
  posts: readonly Post[];
}

export const Header = memo(({ posts }: HeaderProps) => {
  console.log('🏠 Рендер шапки');

  const totalComments = posts.reduce((acc, p) => acc + p.commentsCount, 0);

  return (
    <header className="app-header">
      <h1>React Mastery</h1>
      <div className="header-stats">
        <div className="header-stat">
          <span className="header-stat-label">Постов</span>
          <span className="header-stat-value">{posts.length}</span>
        </div>
        <div className="header-stat">
          <span className="header-stat-label">Комментариев</span>
          <span className="header-stat-value">{totalComments}</span>
        </div>
      </div>
    </header>
  );
});

Header.displayName = 'Header';