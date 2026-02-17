import React, { useState, useCallback } from "react";

interface Comment {
  id: number;
  name: string;
  email: string;
  body: string;
}

interface CommentListProps {
  comments: Comment[];
}

export const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  const [expandedComments, setExpandedComments] = useState<Set<number>>(
    new Set(),
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

  return (
    <div className="comment-list">
      <h3>Комментарии ({comments.length})</h3>
      {comments.map((comment) => {
        const isExpanded = expandedComments.has(comment.id);

        return (
          <React.Fragment key={comment.id}>
            <div className="comment-item">
              <div className="comment-header">
                <strong>{comment.name}</strong> ({comment.email})
                <button
                  onClick={() => toggleComment(comment.id)}
                  className="toggle-btn"
                >
                  {isExpanded ? "▼ Свернуть" : "▶ Развернуть"}
                </button>
              </div>
              {isExpanded && (
                <div className="comment-body">
                  <p>{comment.body}</p>
                </div>
              )}
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
};
