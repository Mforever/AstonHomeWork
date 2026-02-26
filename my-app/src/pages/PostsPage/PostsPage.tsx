import React, { useState, useCallback } from 'react';
import { useGetPostsQuery } from '../../entities/post/api/postsApi';
import { Post } from '../../entities/post/model/types';
import { ItemList } from '../../shared/ui/ItemList/ItemList';
import { Header } from '../../components/Header/Header';
import { Stats } from '../../components/Stats/Stats';
import { Filter } from '../../components/Filter/Filter';
import { Modal } from '../../components/Modal/Modal';
import './PostsPage.css';

export const PostsPage: React.FC = () => {
  const [filterMin, setFilterMin] = useState<number>(0);
  const [filterMax, setFilterMax] = useState<number>(100);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  // RTK Query hook с типизацией
  const { data: posts = [], isLoading, error } = useGetPostsQuery({ limit: 20 });

  console.log('PostsPage render:', { posts, isLoading, error });

  // Выводим информацию об ошибке в консоль
  if (error) {
    console.log('Error details:', error);
  }

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFilterMin(Number(e.target.value));
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFilterMax(Number(e.target.value));
  };

  const handleReset = useCallback((): void => {
    setFilterMin(0);
    setFilterMax(100);
  }, []);

  const handlePostClick = useCallback((post: Post): void => {
    console.log('Post clicked:', post);
    setSelectedPost(post);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback((): void => {
    setIsModalOpen(false);
    setSelectedPost(null);
  }, []);

  // Фильтрация постов с типизацией
  const filteredPosts = posts.filter((post: Post) =>
    post.title.length >= filterMin && post.title.length <= filterMax
  );

  // Статистика
  const totalPosts = filteredPosts.length;
  const avgTitleLength = totalPosts > 0
    ? (filteredPosts.reduce((acc: number, p: Post) => acc + p.title.length, 0) / totalPosts).toFixed(1)
    : '0';

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Загрузка постов...</p>
      </div>
    );
  }

  if (error) {
    // Форматируем ошибку для отображения
    const errorMessage = 'status' in error
      ? `Ошибка ${error.status}: ${JSON.stringify(error.data)}`
      : error.message || 'Неизвестная ошибка';

    return (
      <div className="error-container">
        <h3>Ошибка загрузки</h3>
        <p>{errorMessage}</p>
        <pre style={{ textAlign: 'left', background: '#1a1a1a', padding: '10px', borderRadius: '4px' }}>
          {JSON.stringify(error, null, 2)}
        </pre>
      </div>
    );
  }

  return (
    <div className="posts-page">
      <Header posts={posts} />

      <Stats
        totalPosts={totalPosts}
        avgTitleLength={avgTitleLength}
        totalComments={0}
        allPostsCount={posts.length}
      />

      <Filter
        filterMin={filterMin}
        filterMax={filterMax}
        onMinChange={handleMinChange}
        onMaxChange={handleMaxChange}
        onReset={handleReset}
        posts={posts}
      />

      <ItemList
        items={filteredPosts}
        loading={isLoading}
        getItemKey={(post: Post) => post.id}
        renderItem={(post: Post) => (
          <>
            <h3 className="post-title">{post.title}</h3>
            <p className="post-excerpt">{post.body.substring(0, 100)}...</p>
            <span className="post-read-more">Читать далее →</span>
          </>
        )}
        onItemClick={handlePostClick}
        emptyMessage="Посты не найдены"
        layout="grid"
        gridColumns={3}
      />

      {isModalOpen && selectedPost && (
        <Modal
          isOpen={isModalOpen}
          post={selectedPost}
          expandedComments={new Set()}
          onClose={handleCloseModal}
          onToggleComment={() => {}}
        />
      )}
    </div>
  );
};