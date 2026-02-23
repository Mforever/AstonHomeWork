import React, { memo } from 'react';

interface StatsProps {
  totalPosts: number;
  avgTitleLength: string;
  totalComments: number;
  allPostsCount: number;
}

export const Stats = memo(({
  totalPosts,
  avgTitleLength,
  totalComments,
  allPostsCount,
}: StatsProps) => {
  console.log('📊 Рендер статистики');

  return (
    <div className="stats-container">
      <div className="stat-card">
        <div className="stat-icon">📊</div>
        <div className="stat-label">Всего постов</div>
        <div className="stat-value">{totalPosts}</div>
        <div className="stat-description">из {allPostsCount} доступных</div>
      </div>
      <div className="stat-card">
        <div className="stat-icon">📏</div>
        <div className="stat-label">Средняя длина</div>
        <div className="stat-value">{avgTitleLength}</div>
        <div className="stat-description">символов в заголовке</div>
      </div>
      <div className="stat-card">
        <div className="stat-icon">💬</div>
        <div className="stat-label">Комментариев</div>
        <div className="stat-value">{totalComments}</div>
        <div className="stat-description">во всех постах</div>
      </div>
    </div>
  );
});

Stats.displayName = 'Stats';