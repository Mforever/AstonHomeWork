import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './PostDetailsPage.css';

interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export const PostDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(res => res.json())
      .then(data => {
        setPost(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error:', err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="loading-container">Loading...</div>;
  }

  if (!post) {
    return (
      <div className="error-container">
        <h2>Post not found</h2>
        <Link to="/posts">Back to Posts</Link>
      </div>
    );
  }

  return (
    <div className="post-details-page">
      <Link to="/posts" className="back-link">← Back to Posts</Link>

      <article className="post-details">
        <h1>{post.title}</h1>
        <p className="post-body">{post.body}</p>

        <div className="post-meta">
          <p>Post ID: {post.id}</p>
          <p>User ID: {post.userId}</p>
        </div>

        <div className="user-links">
          <Link to={`/users/${post.userId}/posts`}>📝 User Posts</Link>
          <Link to={`/users/${post.userId}/albums`}>🖼️ User Albums</Link>
          <Link to={`/users/${post.userId}/todos`}>✅ User Todos</Link>
        </div>
      </article>
    </div>
  );
};