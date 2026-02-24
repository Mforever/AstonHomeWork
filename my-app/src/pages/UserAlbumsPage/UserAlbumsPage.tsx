import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { UserTabs } from '../../widgets/UserTabs/UserTabs';
import './UserAlbumsPage.css';

interface Album {
  id: number;
  userId: number;
  title: string;
}

export const UserAlbumsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const userId = parseInt(id || '0');
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}/albums`)
      .then(res => res.json())
      .then(data => {
        setAlbums(data);
        setLoading(false);
      });
  }, [userId]);

  if (loading) {
    return <div className="loading-container">Loading...</div>;
  }

  return (
    <div className="user-albums-page">
      <h1>User #{userId} Albums</h1>

      <UserTabs userId={userId} activeTab="albums" />

      <div className="albums-grid">
        {albums.map(album => (
          <Link
            key={album.id}
            to={`/albums/${album.id}/photos`}
            className="album-card"
          >
            <h3>{album.title}</h3>
            <span className="view-photos">View Photos →</span>
          </Link>
        ))}
      </div>
    </div>
  );
};