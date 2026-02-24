import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './AlbumPhotosPage.css';

interface Photo {
  id: number;
  albumId: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export const AlbumPhotosPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const albumId = parseInt(id || '0');
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}/photos`)
      .then(res => res.json())
      .then(data => {
        setPhotos(data);
        setLoading(false);
      });
  }, [albumId]);

  if (loading) {
    return <div className="loading-container">Loading...</div>;
  }

  return (
    <div className="album-photos-page">
      <Link to={`/users/1/albums`} className="back-link">← Back to Albums</Link>

      <h1>Album #{albumId} Photos</h1>

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