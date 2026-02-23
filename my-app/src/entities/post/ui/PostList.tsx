import React, { useMemo, useCallback } from "react";
import { withLoading } from "../../../shared/lib/hoc/withLoading";

export interface Post {
  id: number;
  title: string;
  body: string;
}

interface PostListProps {
  posts: Post[];
  onPostClick?: (post: Post) => void;
}

const PostListComponent: React.FC<PostListProps> = ({ posts, onPostClick }) => {
  // Оптимизация: мемоизация вычислений
  const postStats = useMemo(() => {
    console.log("Вычисление статистики постов...");
    const totalPosts = posts.length;
    const averageTitleLength =
      posts.reduce((acc, post) => acc + post.title.length, 0) / totalPosts || 0;

    return {
      totalPosts,
      averageTitleLength: averageTitleLength.toFixed(2),
    };
  }, [posts]);

  // Оптимизация: мемоизация обработчика
  const handlePostClick = useCallback(
    (post: Post) => {
      if (onPostClick) {
        onPostClick(post);
      }
    },
    [onPostClick],
  );

  return (
    <div className="post-list">
      <div className="post-stats">
        <p>Всего постов: {postStats.totalPosts}</p>
        <p>Средняя длина заголовка: {postStats.averageTitleLength}</p>
      </div>

      {posts.map((post) => (
        <React.Fragment key={post.id}>
          <article className="post-item" onClick={() => handlePostClick(post)}>
            <h3>{post.title}</h3>
            <p className="post-title-length">
              Длина заголовка: {post.title.length}
            </p>
            <p>{post.body.substring(0, 100)}...</p>
          </article>
        </React.Fragment>
      ))}
    </div>
  );
};

// Применяем HOC для загрузки
export const PostList = withLoading(PostListComponent);
