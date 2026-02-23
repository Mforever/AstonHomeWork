import React, { memo, useCallback } from 'react';
import { Comment } from '../../types';

interface CommentItemProps {
  comment: Comment;
  index: number;
  isExpanded: boolean;
  onToggle: (commentId: number) => void;
}

export const CommentItem = memo(({
  comment,
  index,
  isExpanded,
  onToggle,
}: CommentItemProps) => {
  console.log(`💬 Рендер комментария ${comment.id}`);

  const handleToggle = useCallback(() => {
    onToggle(comment.id);
  }, [comment.id, onToggle]);

  const handleButtonClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onToggle(comment.id);
  }, [comment.id, onToggle]);

  return (
    <div
      className={`comment-item ${isExpanded ? 'expanded' : ''}`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="comment-header" onClick={handleToggle}>
        <div className="comment-author">
          <span className="comment-author-name">{comment.name}</span>
          <span className="comment-author-email">{comment.email}</span>
        </div>
        <button
          className={`toggle-btn ${isExpanded ? 'expanded' : ''}`}
          onClick={handleButtonClick}
        >
          <span className="toggle-icon">{isExpanded ? '▼' : '▶'}</span>
          {isExpanded ? 'Свернуть' : 'Читать'}
        </button>
      </div>
      {isExpanded && (
        <div className="comment-body">
          <p>{comment.body}</p>
        </div>
      )}
    </div>
  );
});

CommentItem.displayName = 'CommentItem';