import React, { useState, useCallback } from "react";
import { FilterOptions } from "../lib/filterByLength";

interface PostLengthFilterProps {
  onFilterChange: (options: FilterOptions) => void;
  minPossible?: number;
  maxPossible?: number;
}

export const PostLengthFilter: React.FC<PostLengthFilterProps> = ({
  onFilterChange,
  minPossible = 0,
  maxPossible = 100,
}) => {
  const [minLength, setMinLength] = useState<number>(0);
  const [maxLength, setMaxLength] = useState<number>(maxPossible);

  const handleMinChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = Number(e.target.value);
      setMinLength(value);
      onFilterChange({ minLength: value, maxLength });
    },
    [maxLength, onFilterChange],
  );

  const handleMaxChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = Number(e.target.value);
      setMaxLength(value);
      onFilterChange({ minLength, maxLength: value });
    },
    [minLength, onFilterChange],
  );

  const handleReset = useCallback(() => {
    setMinLength(0);
    setMaxLength(maxPossible);
    onFilterChange({ minLength: 0, maxLength: maxPossible });
  }, [maxPossible, onFilterChange]);

  return (
    <div className="post-filter">
      <h3>Фильтр по длине заголовка</h3>
      <div className="filter-controls">
        <label>
          Мин. длина:
          <input
            type="range"
            min={0}
            max={maxPossible}
            value={minLength}
            onChange={handleMinChange}
          />
          <span>{minLength}</span>
        </label>
        <label>
          Макс. длина:
          <input
            type="range"
            min={0}
            max={maxPossible}
            value={maxLength}
            onChange={handleMaxChange}
          />
          <span>{maxLength}</span>
        </label>
        <button onClick={handleReset}>Сбросить</button>
      </div>
    </div>
  );
};
