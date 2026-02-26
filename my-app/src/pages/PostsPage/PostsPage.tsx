import React, { useState } from 'react';
import { useGetPostsQuery } from '../../entities/post/api/postsApi';
import { useAppSelector, useAppDispatch } from '../../app/providers/store/hooks';
import { selectAllPosts, setSelectedPostId, selectSelectedPost } from '../../entities/post/model/slice/postSlice';
import { Header } from '../../components/Header/Header';
import { Stats } from '../../components/Stats/Stats';
import { Filter } from '../../components/Filter/Filter';
import { PostList } from '../../components/PostList/PostList';
import { Modal } from '../../components/Modal/Modal';
import './PostsPage.css';

export const PostsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const [filterMin, setFilterMin] = useState(0);
  const [filterMax, setFilterMax] = useState(100);

  // RTK Query hook
  const { data: posts = [], isLoading } = useGetPostsQuery({ limit: 20 });

  // Redux selectors
  const allPosts = useAppSelector(selectAllPosts);
  const selectedPost = useAppSelector(selectSelectedPost);

  // Local state for modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter posts
  const filteredPosts = posts.filter(post =>
    post.title.length >= filterMin && post.title.length <= filterMax
  );

  // Stats
  const totalPosts = filteredPosts.length;
  const avgTitleLength = totalPosts > 0
    ? (filteredPosts.reduce((acc, p) => acc + p.title.length, 0) / totalPosts).toFixed(1)
    : '0';

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterMin(Number(e.target.value));
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterMax(Number(e.target.value));
  };

  const handleReset = () => {
    setFilterMin(0);
    setFilterMax(100);
  };

  const openModal = (post: any) => {
    dispatch(setSelectedPostId(post.id));
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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

      <PostList
        posts={filteredPosts}
        loading={isLoading}
        onPostClick={openModal}
      />

      {isModalOpen && selectedPost && (
        <Modal
          isOpen={isModalOpen}
          post={selectedPost}
          expandedComments={new Set()}
          onClose={closeModal}
          onToggleComment={() => {}}
        />
      )}
    </div>
  );
};