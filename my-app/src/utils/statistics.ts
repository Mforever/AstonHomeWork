import { Post } from '../types';

export const calculateStatistics = (posts: readonly Post[]) => {
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
};

export const formatCommentsCount = (count: number): string => {
  if (count === 0) return 'Нет комментариев';
  if (count === 1) return '1 комментарий';
  if (count >= 2 && count <= 4) return `${count} комментария`;
  return `${count} комментариев`;
};