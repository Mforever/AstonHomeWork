import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

interface ModalProps {
  isOpen: boolean;
  post: any;
  expandedComments: Set<number>;
  onClose: () => void;
  onToggleComment: (id: number) => void;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  post,
  onClose,
}) => {
  if (!isOpen || !post) return null;

  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{post.title}</h2>
          <button className="modal-close-btn" onClick={onClose}>×</button>
        </div>

        <div className="modal-body">
          <p>{post.body}</p>
          <div className="modal-meta">
            <span>ID поста: {post.id}</span>
            <span>ID пользователя: {post.userId}</span>
          </div>
        </div>

        <div className="modal-footer">
          <button className="modal-close-footer-btn" onClick={onClose}>
            Закрыть
          </button>
        </div>
      </div>
    </div>,
    modalRoot
  );
};