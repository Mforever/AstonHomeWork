import React, { memo, useCallback } from 'react';
import { Post } from '../../types';
import { PostCard } from '../PostCard/PostCard';

interface PostListProps {
  posts: readonly Post[];
  loading: boolean;
  onPostClick: (post: Post) => void;
}

export const PostList = memo(({ posts, loading, onPostClick }: PostListProps) => {
  console.log('📋 Рендер списка постов');

  const handlePostClick = useCallback(
    (post: Post) => {
      onPostClick(post);
    },
    [onPostClick]
  );

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <div className="loading-text">
          Загружаем посты<span className="loading-dots"></span>
        </div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="no-results">
        <span className="no-results-icon">🔍</span>
        <h3>Посты не найдены</h3>
        <p>Попробуйте изменить параметры фильтра</p>
      </div>
    );
  }

  return (
    <div className="posts-grid">
      {posts.map((post, index) => (
        <PostCard
          key={post.id}
          post={post}
          index={index}
          onClick={handlePostClick}
        />
      ))}
    </div>
  );
});

PostList.displayName = 'PostList';