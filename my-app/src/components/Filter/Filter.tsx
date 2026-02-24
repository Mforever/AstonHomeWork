import React from 'react';
import './Filter.css';

interface FilterProps {
  filterMin: number;
  filterMax: number;
  onMinChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onMaxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onReset: () => void;
  posts: any[];
}

export const Filter: React.FC<FilterProps> = ({
  filterMin,
  filterMax,
  onMinChange,
  onMaxChange,
  onReset,
  posts
}) => {
  const maxPossible = Math.max(...posts.map(p => p.title.length), 100);

  return (
    <div className="filter-container">
      <h3 className="filter-title">Фильтр по длине заголовка</h3>
      <div className="filter-controls">
        <div className="filter-group">
          <label>От {filterMin}</label>
          <input
            type="range"
            min={0}
            max={maxPossible}
            value={filterMin}
            onChange={onMinChange}
          />
        </div>

        <div className="filter-group">
          <label>До {filterMax}</label>
          <input
            type="range"
            min={0}
            max={maxPossible}
            value={filterMax}
            onChange={onMaxChange}
          />
        </div>

        <button className="filter-reset-btn" onClick={onReset}>
          Сбросить
        </button>
      </div>
    </div>
  );
};