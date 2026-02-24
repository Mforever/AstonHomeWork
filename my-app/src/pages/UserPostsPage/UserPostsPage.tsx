import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { UserTabs } from '../../widgets/UserTabs/UserTabs';
import './UserPostsPage.css';

interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export const UserPostsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const userId = parseInt(id || '0');
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
      .then(res => res.json())
      .then(data => {
        setPosts(data);
        setLoading(false);
      });
  }, [userId]);

  if (loading) {
    return <div className="loading-container">Loading...</div>;
  }

  return (
    <div className="user-posts-page">
      <h1>User #{userId} Posts</h1>

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
            <span className="read-more">Read more →</span>
          </Link>
        ))}
      </div>
    </div>
  );
};