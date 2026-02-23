import { useState, useMemo, useCallback } from 'react';
import { Post } from '../types';

interface UseFilterReturn {
  filterMin: number;
  filterMax: number;
  filteredPosts: Post[];
  handleMinChange: (value: number) => void;
  handleMaxChange: (value: number) => void;
  handleReset: () => void;
  maxPossible: number;
}

export const useFilter = (posts: readonly Post[]): UseFilterReturn => {
  const [filterMin, setFilterMin] = useState(0);
  const [filterMax, setFilterMax] = useState(100);

  const maxPossible = useMemo(
    () => Math.max(...posts.map((p) => p.title.length)),
    [posts]
  );

  const filteredPosts = useMemo(() => {
    console.log('🔄 Фильтрация постов...');
    return posts.filter((post) => {
      const titleLength = post.title.length;
      return titleLength >= filterMin && titleLength <= filterMax;
    });
  }, [posts, filterMin, filterMax]);

  const handleMinChange = useCallback((value: number) => {
    setFilterMin(value);
  }, []);

  const handleMaxChange = useCallback((value: number) => {
    setFilterMax(value);
  }, []);

  const handleReset = useCallback(() => {
    setFilterMin(0);
    setFilterMax(maxPossible);
  }, [maxPossible]);

  return {
    filterMin,
    filterMax,
    filteredPosts,
    handleMinChange,
    handleMaxChange,
    handleReset,
    maxPossible,
  };
};