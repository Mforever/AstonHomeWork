import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { PostsPage } from './pages/PostsPage/PostsPage';
import { PostDetailsPage } from './pages/PostDetailsPage/PostDetailsPage';
import { UserAlbumsPage } from './pages/UserAlbumsPage/UserAlbumsPage';
import { AlbumPhotosPage } from './pages/AlbumPhotosPage/AlbumPhotosPage';
import { UserTodosPage } from './pages/UserTodosPage/UserTodosPage';
import { UserPostsPage } from './pages/UserPostsPage/UserPostsPage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import './App.css';
import './index.css';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/posts" replace />} />
          <Route path="/posts" element={<PostsPage />} />
          <Route path="/posts/:id" element={<PostDetailsPage />} />
          <Route path="/users/:id/posts" element={<UserPostsPage />} />
          <Route path="/users/:id/albums" element={<UserAlbumsPage />} />
          <Route path="/users/:id/todos" element={<UserTodosPage />} />
          <Route path="/albums/:id/photos" element={<AlbumPhotosPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;