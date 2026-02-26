import React from 'react';
import './PostList.css';

interface Post {
  id: number;
  title: string;
  body: string;
}

interface PostListProps {
  posts: Post[];
  loading: boolean;
  onPostClick: (post: Post) => void;
}

export const PostList: React.FC<PostListProps> = ({ posts, loading, onPostClick }) => {
  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Загрузка постов...</p>
      </div>
    );
  }

  const handleClick = (post: Post) => {
    console.log('Пост выбран:', post.id);
    onPostClick(post);
  };

  return (
    <div className="posts-grid">
      {posts.map(post => (
        <div
          key={post.id}
          className="post-card"
          onClick={() => handleClick(post)}
        >
          <h3 className="post-title">{post.title}</h3>
          <p className="post-excerpt">{post.body.substring(0, 100)}...</p>
          <span className="post-read-more">Читать далее →</span>
        </div>
      ))}
    </div>
  );
};