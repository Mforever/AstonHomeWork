import React from 'react';
import './Stats.css';

interface StatsProps {
  totalPosts: number;
  avgTitleLength: string;
  totalComments: number;
  allPostsCount: number;
}

export const Stats: React.FC<StatsProps> = ({
  totalPosts,
  avgTitleLength,
  totalComments,
  allPostsCount
}) => {
  return (
    <div className="stats-container">
      <div className="stat-card">
        <div className="stat-value">{totalPosts}</div>
        <div className="stat-label">из {allPostsCount} постов</div>
      </div>
      <div className="stat-card">
        <div className="stat-value">{avgTitleLength}</div>
        <div className="stat-label">средняя длина</div>
      </div>
      <div className="stat-card">
        <div className="stat-value">{totalComments}</div>
        <div className="stat-label">комментариев</div>
      </div>
    </div>
  );
};