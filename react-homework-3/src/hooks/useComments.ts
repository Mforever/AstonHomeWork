import { useState, useCallback } from 'react';

export const useComments = (initialExpanded: number[] = []) => {
  const [expandedComments, setExpandedComments] = useState<Set<number>>(
    () => new Set(initialExpanded)
  );

  const toggleComment = useCallback((commentId: number) => {
    setExpandedComments((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(commentId)) {
        newSet.delete(commentId);
      } else {
        newSet.add(commentId);
      }
      return newSet;
    });
  }, []);

  return {
    expandedComments,
    toggleComment,
  };
};