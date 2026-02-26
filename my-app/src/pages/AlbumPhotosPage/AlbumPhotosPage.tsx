import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useGetPhotosByAlbumIdQuery } from '../../entities/photo/api/photosApi';
import './AlbumPhotosPage.css';

export const AlbumPhotosPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const albumId = parseInt(id || '0');

  const { data: photos = [], isLoading } = useGetPhotosByAlbumIdQuery(albumId);

  if (isLoading) {
    return <div className="loading-container">Загрузка фотографий...</div>;
  }

  return (
    <div className="album-photos-page">
      <Link to={`/users/1/albums`} className="back-link">← Назад к альбомам</Link>

      <h1>Фото альбома #{albumId}</h1>

      <div className="photos-grid">
        {photos.map(photo => (
          <div key={photo.id} className="photo-card">
            <img src={photo.thumbnailUrl} alt={photo.title} />
            <p>{photo.title.substring(0, 30)}...</p>
          </div>
        ))}
      </div>
    </div>
  );
};