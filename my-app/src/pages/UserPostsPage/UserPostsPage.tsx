import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useGetPostsByUserIdQuery } from '../../entities/post/api/postsApi';
import { UserTabs } from '../../widgets/UserTabs/UserTabs';
import './UserPostsPage.css';

export const UserPostsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const userId = parseInt(id || '0');

  const { data: posts = [], isLoading } = useGetPostsByUserIdQuery(userId);

  if (isLoading) {
    return <div className="loading-container">Загрузка постов...</div>;
  }

  return (
    <div className="user-posts-page">
      <h1>Посты пользователя #{userId}</h1>

      <UserTabs userId={userId} activeTab="posts" />

      <div className="posts-grid">
        {posts.map(post => (
          <Link
            key={post.id}
            to={`/posts/${post.id}`}
            className="post-card"
          >
            <h3>{post.title}</h3>
            <p>{post.body.substring(0, 100)}...</p>
            <span className="read-more">Читать далее →</span>
          </Link>
        ))}
      </div>
    </div>
  );
};