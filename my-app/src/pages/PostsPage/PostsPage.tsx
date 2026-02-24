import React from 'react';
import { useApp } from '../../context/AppContext';
import { Header } from '../../components/Header/Header';
import { Stats } from '../../components/Stats/Stats';
import { Filter } from '../../components/Filter/Filter';
import { PostList } from '../../components/PostList/PostList';
import { Modal } from '../../components/Modal/Modal';
import './PostsPage.css';

export const PostsPage: React.FC = () => {
  const {
    posts,
    filterMin,
    filterMax,
    filteredPosts,
    handleMinChange,
    handleMaxChange,
    handleReset,
    totalPosts,
    avgTitleLength,
    totalComments,
    expandedComments,
    toggleComment,
    isModalOpen,
    selectedPost,
    openModal,
    closeModal,
  } = useApp();

  return (
    <div className="posts-page">
      <Header posts={posts} />

      <Stats
        totalPosts={totalPosts}
        avgTitleLength={avgTitleLength}
        totalComments={totalComments}
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
        loading={false}
        onPostClick={openModal}
      />

      {isModalOpen && selectedPost && (
        <Modal
          isOpen={isModalOpen}
          post={selectedPost}
          expandedComments={expandedComments}
          onClose={closeModal}
          onToggleComment={toggleComment}
        />
      )}
    </div>
  );
};