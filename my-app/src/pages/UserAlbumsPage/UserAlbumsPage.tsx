import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useGetAlbumsByUserIdQuery } from '../../entities/album/api/albumsApi';
import { UserTabs } from '../../widgets/UserTabs/UserTabs';
import './UserAlbumsPage.css';

export const UserAlbumsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const userId = parseInt(id || '0');

  const { data: albums = [], isLoading } = useGetAlbumsByUserIdQuery(userId);

  if (isLoading) {
    return <div className="loading-container">Загрузка альбомов...</div>;
  }

  return (
    <div className="user-albums-page">
      <h1>Альбомы пользователя #{userId}</h1>

      <UserTabs userId={userId} activeTab="albums" />

      <div className="albums-grid">
        {albums.map(album => (
          <Link
            key={album.id}
            to={`/albums/${album.id}/photos`}
            className="album-card"
          >
            <h3>{album.title}</h3>
            <span className="view-photos">Смотреть фото →</span>
          </Link>
        ))}
      </div>
    </div>
  );
};