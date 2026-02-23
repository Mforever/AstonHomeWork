import React, { memo, useEffect, useCallback } from 'react';
import { Post } from '../../types';
import { CommentList } from '../CommentList/CommentList';
import { getCommentsByPostId } from '../../data/mockData';

interface ModalProps {
  isOpen: boolean;
  post: Post | null;
  expandedComments: Set<number>;
  onClose: () => void;
  onToggleComment: (commentId: number) => void;
}

export const Modal = memo(({
  isOpen,
  post,
  expandedComments,
  onClose,
  onToggleComment,
}: ModalProps) => {
  console.log('🪟 Рендер модального окна');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'unset';
      };
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const handleOverlayClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }, [onClose]);

  const handleContentClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  if (!isOpen || !post) return null;

  const postComments = getCommentsByPostId(post.id);

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content" onClick={handleContentClick}>
        <div className="modal-header">
          <h2>{post.title}</h2>
          <button className="modal-close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="modal-body">
          <p>{post.body}</p>
          <CommentList
            comments={postComments}
            expandedComments={expandedComments}
            onToggleComment={onToggleComment}
          />
        </div>

        <div className="modal-footer">
          <button className="btn btn-primary" onClick={onClose}>
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
});

Modal.displayName = 'Modal';