import React, { memo, useCallback } from 'react';
import { Post } from '../../types';

interface FilterProps {
  filterMin: number;
  filterMax: number;
  onMinChange: (value: number) => void;
  onMaxChange: (value: number) => void;
  onReset: () => void;
  posts: readonly Post[];
}

export const Filter = memo(({
  filterMin,
  filterMax,
  onMinChange,
  onMaxChange,
  onReset,
  posts,
}: FilterProps) => {
  console.log('🔍 Рендер фильтра');

  const maxPossible = Math.max(...posts.map((p) => p.title.length));

  const handleMinChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onMinChange(Number(e.target.value));
  }, [onMinChange]);

  const handleMaxChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onMaxChange(Number(e.target.value));
  }, [onMaxChange]);

  return (
    <div className="filter-container">
      <h3 className="filter-title">Фильтр по длине заголовка</h3>
      <div className="filter-controls">
        <div className="filter-group">
          <label>От {filterMin} символов</label>
          <input
            type="range"
            min={0}
            max={maxPossible}
            value={filterMin}
            onChange={handleMinChange}
          />
          <span className="filter-value">{filterMin} мин</span>
        </div>

        <div className="filter-group">
          <label>До {filterMax} символов</label>
          <input
            type="range"
            min={0}
            max={maxPossible}
            value={filterMax}
            onChange={handleMaxChange}
          />
          <span className="filter-value">{filterMax} макс</span>
        </div>

        <button className="filter-reset-btn" onClick={onReset}>
          Сбросить
        </button>
      </div>
    </div>
  );
});

Filter.displayName = 'Filter';