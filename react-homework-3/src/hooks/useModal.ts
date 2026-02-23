import { useState, useCallback } from 'react';
import { Post } from '../types';

export const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const openModal = useCallback((post: Post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedPost(null), 300);
  }, []);

  return {
    isModalOpen,
    selectedPost,
    openModal,
    closeModal,
  };
};