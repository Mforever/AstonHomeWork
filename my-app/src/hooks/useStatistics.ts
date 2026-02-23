import { useMemo } from 'react';
import { Post } from '../types';

export const useStatistics = (posts: readonly Post[]) => {
  return useMemo(() => {
    console.log('📊 Вычисление статистики...');

    const totalPosts = posts.length;

    const avgTitleLength =
      totalPosts > 0
        ? (posts.reduce((acc, p) => acc + p.title.length, 0) / totalPosts).toFixed(1)
        : '0';

    const totalComments = posts.reduce((acc, p) => acc + p.commentsCount, 0);

    return {
      totalPosts,
      avgTitleLength,
      totalComments,
    };
  }, [posts]);
};