import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { UserTabs } from '../../widgets/UserTabs/UserTabs';
import './UserTodosPage.css';

interface Todo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

export const UserTodosPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const userId = parseInt(id || '0');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}/todos`)
      .then(res => res.json())
      .then(data => {
        setTodos(data);
        setLoading(false);
      });
  }, [userId]);

  if (loading) {
    return <div className="loading-container">Loading...</div>;
  }

  return (
    <div className="user-todos-page">
      <h1>User #{userId} Todos</h1>

      <UserTabs userId={userId} activeTab="todos" />

      <div className="todos-list">
        {todos.map(todo => (
          <div
            key={todo.id}
            className={`todo-item ${todo.completed ? 'completed' : ''}`}
          >
            <input type="checkbox" checked={todo.completed} readOnly />
            <span className="todo-title">{todo.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};