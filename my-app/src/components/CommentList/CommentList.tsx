import React, { memo } from 'react';
import { Comment } from '../../types';
import { CommentItem } from '../CommentItem/CommentItem';

interface CommentListProps {
  comments: readonly Comment[];
  expandedComments: Set<number>;
  onToggleComment: (commentId: number) => void;
}

export const CommentList = memo(({
  comments,
  expandedComments,
  onToggleComment,
}: CommentListProps) => {
  console.log('📝 Рендер списка комментариев');

  if (comments.length === 0) {
    return (
      <div className="no-comments">
        <span className="no-comments-icon">💭</span>
        <h4>Пока нет комментариев</h4>
        <p>Будьте первым, кто оставит комментарий!</p>
      </div>
    );
  }

  return (
    <div className="comment-list">
      <h3>Комментарии</h3>
      {comments.map((comment, index) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          index={index}
          isExpanded={expandedComments.has(comment.id)}
          onToggle={onToggleComment}
        />
      ))}
    </div>
  );
});

CommentList.displayName = 'CommentList';