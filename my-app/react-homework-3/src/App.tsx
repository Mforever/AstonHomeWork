import React from 'react';
import './App.css';
import './index.css';
import './shared/ui/Modal/Modal.css';
import './widgets/CommentList/ui/CommentList.css';

import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header/Header';
import { Stats } from './components/Stats/Stats';
import { Filter } from './components/Filter/Filter';
import { PostList } from './components/PostList/PostList';
import { Modal } from './components/Modal/Modal';

const AppContent: React.FC = () => {
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
    <div className="app">
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

      <Modal
        isOpen={isModalOpen}
        post={selectedPost}
        expandedComments={expandedComments}
        onClose={closeModal}
        onToggleComment={toggleComment}
      />
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;