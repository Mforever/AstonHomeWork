import React, { memo } from 'react';
import { Post } from '../../types';

interface PostCardProps {
  post: Post;
  index: number;
  onClick: (post: Post) => void;
}

export const PostCard = memo(({ post, index, onClick }: PostCardProps) => {
  console.log(`🃏 Рендер карточки поста ${post.id}`);

  return (
    <article
      className="post-card"
      onClick={() => onClick(post)}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <span className="post-badge">ID: {post.id}</span>
      <h3 className="post-title">{post.title}</h3>
      <span className="post-title-length">
        📏 {post.title.length} символов
      </span>
      <p className="post-excerpt">{post.body.substring(0, 120)}...</p>
      <div className="post-footer">
        <span className="post-comments-count">
          {post.commentsCount} комментариев
        </span>
        <span className="post-read-more">Читать</span>
      </div>
    </article>
  );
});

PostCard.displayName = 'PostCard';