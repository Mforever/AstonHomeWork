import React from 'react';
import { ItemList } from './ItemList';
import { Post } from '../../../entities/post/model/types';
import { User } from '../../../entities/user/model/types';

/**
 * Пример использования ItemList с постами
 */
export const PostListExample: React.FC<{ posts: Post[]; loading: boolean }> = ({
  posts,
  loading,
}) => {
  return (
    <ItemList
      items={posts}
      loading={loading}
      getItemKey={(post) => post.id}
      renderItem={(post) => (
        <div>
          <h3>{post.title}</h3>
          <p>{post.body.substring(0, 100)}...</p>
          <small>User ID: {post.userId}</small>
        </div>
      )}
      onItemClick={(post) => console.log('Clicked post:', post.id)}
      emptyMessage="Посты не найдены"
      layout="grid"
      gridColumns={3}
    />
  );
};

/**
 * Пример использования ItemList с пользователями
 */
export const UserListExample: React.FC<{ users: User[]; loading: boolean }> = ({
  users,
  loading,
}) => {
  return (
    <ItemList
      items={users}
      loading={loading}
      getItemKey={(user) => user.id}
      renderItem={(user) => (
        <div>
          <h3>{user.name}</h3>
          <p>@{user.username}</p>
          <p>{user.email}</p>
          <small>{user.company.name}</small>
        </div>
      )}
      onItemClick={(user) => console.log('Clicked user:', user.id)}
      emptyMessage="Пользователи не найдены"
      layout="grid"
      gridColumns={4}
    />
  );
};

/**
 * Пример использования ItemList в виде списка
 */
export const TodoListExample: React.FC<{
  todos: Array<{ id: number; title: string; completed: boolean }>
}> = ({ todos }) => {
  return (
    <ItemList
      items={todos}
      loading={false}
      getItemKey={(todo) => todo.id}
      renderItem={(todo) => (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          opacity: todo.completed ? 0.7 : 1,
          textDecoration: todo.completed ? 'line-through' : 'none'
        }}>
          <input type="checkbox" checked={todo.completed} readOnly />
          <span>{todo.title}</span>
        </div>
      )}
      layout="list"
      emptyMessage="Задачи не найдены"
    />
  );
};