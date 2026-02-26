import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useGetPostByIdQuery } from '../../entities/post/api/postsApi';
import { useGetCommentsByPostIdQuery } from '../../entities/comment/api/commentsApi';
import './PostDetailsPage.css';

export const PostDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const postId = parseInt(id || '0');
  const [expandedComments, setExpandedComments] = useState<Set<number>>(new Set());

  // RTK Query хуки
  const { data: post, isLoading: postLoading } = useGetPostByIdQuery(postId);
  const { data: comments = [], isLoading: commentsLoading } = useGetCommentsByPostIdQuery(postId, {
    skip: !postId,
  });

  const toggleComment = (commentId: number) => {
    setExpandedComments(prev => {
      const newSet = new Set(prev);
      if (newSet.has(commentId)) {
        newSet.delete(commentId);
      } else {
        newSet.add(commentId);
      }
      return newSet;
    });
  };

  if (postLoading) {
    return <div className="loading-container">Загрузка...</div>;
  }

  if (!post) {
    return (
      <div className="error-container">
        <h2>Пост не найден</h2>
        <Link to="/posts">Вернуться к постам</Link>
      </div>
    );
  }

  return (
    <div className="post-details-page">
      <Link to="/posts" className="back-link">← Назад к постам</Link>

      <article className="post-details">
        <h1>{post.title}</h1>
        <p className="post-body">{post.body}</p>

        <div className="post-meta">
          <p>ID поста: {post.id}</p>
          <p>ID пользователя: {post.userId}</p>
        </div>

        <div className="user-links">
          <Link to={`/users/${post.userId}/posts`}>📝 Посты пользователя</Link>
          <Link to={`/users/${post.userId}/albums`}>🖼️ Альбомы пользователя</Link>
          <Link to={`/users/${post.userId}/todos`}>✅ Задачи пользователя</Link>
        </div>

        <section className="comments-section">
          <h2>Комментарии ({comments.length})</h2>
          {commentsLoading ? (
            <div>Загрузка комментариев...</div>
          ) : (
            <div className="comments-list">
              {comments.map(comment => (
                <div key={comment.id} className="comment-card">
                  <div
                    className="comment-header"
                    onClick={() => toggleComment(comment.id)}
                  >
                    <strong>{comment.name}</strong>
                    <span className="comment-email">{comment.email}</span>
                  </div>
                  {expandedComments.has(comment.id) && (
                    <div className="comment-body">
                      <p>{comment.body}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      </article>
    </div>
  );
};