import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';

export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

interface AppContextType {
  posts: Post[];
  filterMin: number;
  filterMax: number;
  filteredPosts: Post[];
  totalPosts: number;
  avgTitleLength: string;
  totalComments: number;
  expandedComments: Set<number>;
  isModalOpen: boolean;
  selectedPost: Post | null;
  handleMinChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleMaxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleReset: () => void;
  toggleComment: (id: number) => void;
  openModal: (post: Post) => void;
  closeModal: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Моковые данные
const MOCK_POSTS: Post[] = [
  { id: 1, userId: 1, title: 'Введение в React', body: 'React - это библиотека для создания пользовательских интерфейсов. Она позволяет создавать переиспользуемые компоненты.' },
  { id: 2, userId: 1, title: 'Компоненты и пропсы', body: 'Компоненты позволяют разбить интерфейс на независимые части. Пропсы - это входные данные для компонентов.' },
  { id: 3, userId: 2, title: 'Состояние и хуки', body: 'useState позволяет добавлять состояние в функциональные компоненты.' },
  { id: 4, userId: 2, title: 'Обработка событий', body: 'В React события именуются в camelCase. Обработчики событий передаются как функции.' },
  { id: 5, userId: 3, title: 'Условный рендеринг', body: 'В React можно создавать разные компоненты в зависимости от условий.' },
];

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [posts] = useState<Post[]>(MOCK_POSTS);
  const [filterMin, setFilterMin] = useState(0);
  const [filterMax, setFilterMax] = useState(100);
  const [expandedComments, setExpandedComments] = useState<Set<number>>(new Set());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const filteredPosts = posts.filter(post =>
    post.title.length >= filterMin && post.title.length <= filterMax
  );

  const totalPosts = filteredPosts.length;
  const avgTitleLength = totalPosts > 0
    ? (filteredPosts.reduce((acc, p) => acc + p.title.length, 0) / totalPosts).toFixed(1)
    : '0';
  const totalComments = 0; // Заглушка

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

  const toggleComment = useCallback((id: number) => {
    setExpandedComments(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  }, []);

  const openModal = useCallback((post: Post) => {
    console.log('Opening modal:', post);
    setSelectedPost(post);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    console.log('Closing modal');
    setIsModalOpen(false);
    setSelectedPost(null);
  }, []);

  const value = {
    posts,
    filterMin,
    filterMax,
    filteredPosts,
    totalPosts,
    avgTitleLength,
    totalComments,
    expandedComments,
    isModalOpen,
    selectedPost,
    handleMinChange,
    handleMaxChange,
    handleReset,
    toggleComment,
    openModal,
    closeModal,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};