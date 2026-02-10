import React from "react";
import PostCard from "../../entities/post/ui/PostCard";
import { Post } from "../../entities/post/types/types";
import { mockPosts } from "../../shared/api/posts";

interface PostListProps {
  posts?: Post[];
}

const PostList: React.FC<PostListProps> = ({ posts = mockPosts }) => {
  // Добавляем несколько категорий для демонстрации группировки
  const categories = [
    { id: 1, name: "Все посты", posts: posts },
    { id: 2, name: "Популярные", posts: posts.slice(0, 2) },
  ];

  return (
    <div className="post-list">
      <h2>Список постов</h2>

      {/* Используем React.Fragment для группировки */}
      <>
        {categories.map((category) => (
          <React.Fragment key={category.id}>
            <h3>{category.name}</h3>
            <div className="category-posts">
              {/* Используем key для каждого поста */}
              {category.posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </React.Fragment>
        ))}
      </>
    </div>
  );
};

export default PostList;
