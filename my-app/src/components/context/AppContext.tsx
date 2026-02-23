import React, { createContext, useContext, useMemo, ReactNode } from 'react';
import { MOCK_POSTS } from '../data/mockData';
import { useFilter } from '../hooks/useFilter';
import { useComments } from '../hooks/useComments';
import { useModal } from '../hooks/useModal';
import { useStatistics } from '../hooks/useStatistics';
import { Post } from '../types';

interface AppContextType {
  // Данные
  posts: readonly Post[];

  // Фильтр
  filterMin: number;
  filterMax: number;
  filteredPosts: Post[];
  maxPossible: number;
  handleMinChange: (value: number) => void;
  handleMaxChange: (value: number) => void;
  handleReset: () => void;

  // Статистика
  totalPosts: number;
  avgTitleLength: string;
  totalComments: number;

  // Комментарии
  expandedComments: Set<number>;
  toggleComment: (commentId: number) => void;

  // Модалка
  isModalOpen: boolean;
  selectedPost: Post | null;
  openModal: (post: Post) => void;
  closeModal: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const posts = MOCK_POSTS;

  const {
    filterMin,
    filterMax,
    filteredPosts,
    handleMinChange,
    handleMaxChange,
    handleReset,
    maxPossible,
  } = useFilter(posts);

  const { expandedComments, toggleComment } = useComments([1, 2, 4]);
  const { isModalOpen, selectedPost, openModal, closeModal } = useModal();
  const statistics = useStatistics(filteredPosts);

  const value = useMemo(
    () => ({
      posts,
      filterMin,
      filterMax,
      filteredPosts,
      maxPossible,
      handleMinChange,
      handleMaxChange,
      handleReset,
      ...statistics,
      expandedComments,
      toggleComment,
      isModalOpen,
      selectedPost,
      openModal,
      closeModal,
    }),
    [
      posts,
      filterMin,
      filterMax,
      filteredPosts,
      maxPossible,
      handleMinChange,
      handleMaxChange,
      handleReset,
      statistics,
      expandedComments,
      toggleComment,
      isModalOpen,
      selectedPost,
      openModal,
      closeModal,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};