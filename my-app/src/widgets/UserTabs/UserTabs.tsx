import React from 'react';
import { NavLink } from 'react-router-dom';
import './UserTabs.css';

interface UserTabsProps {
  userId: number;
  activeTab?: 'posts' | 'albums' | 'todos';
}

export const UserTabs: React.FC<UserTabsProps> = ({ userId }) => {
  const tabs = [
    { id: 'posts', label: '📝 Посты', path: `/users/${userId}/posts` },
    { id: 'albums', label: '🖼️ Альбомы', path: `/users/${userId}/albums` },
    { id: 'todos', label: '✅ Задачи', path: `/users/${userId}/todos` }
  ];

  return (
    <div className="user-tabs">
      {tabs.map(tab => (
        <NavLink
          key={tab.id}
          to={tab.path}
          className={({ isActive }) =>
            `tab-link ${isActive ? 'active' : ''}`
          }
        >
          {tab.label}
        </NavLink>
      ))}
    </div>
  );
};