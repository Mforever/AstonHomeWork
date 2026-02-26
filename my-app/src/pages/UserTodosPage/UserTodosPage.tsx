import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetTodosByUserIdQuery, useUpdateTodoStatusMutation } from '../../entities/todo/api/todosApi';
import { UserTabs } from '../../widgets/UserTabs/UserTabs';
import './UserTodosPage.css';

export const UserTodosPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const userId = parseInt(id || '0');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const { data: todos = [], isLoading } = useGetTodosByUserIdQuery(userId);
  const [updateTodoStatus] = useUpdateTodoStatusMutation();

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const handleToggleTodo = async (id: number, completed: boolean) => {
    try {
      await updateTodoStatus({ id, completed: !completed });
    } catch (error) {
      console.error('Ошибка обновления задачи:', error);
    }
  };

  if (isLoading) {
    return <div className="loading-container">Загрузка задач...</div>;
  }

  const stats = {
    total: todos.length,
    completed: todos.filter(t => t.completed).length,
    active: todos.filter(t => !t.completed).length
  };

  return (
    <div className="user-todos-page">
      <h1>Задачи пользователя #{userId}</h1>

      <UserTabs userId={userId} activeTab="todos" />

      <div className="todos-stats">
        <div className="stat-card small">
          <span className="stat-label">Всего</span>
          <span className="stat-value">{stats.total}</span>
        </div>
        <div className="stat-card small">
          <span className="stat-label">Выполнено</span>
          <span className="stat-value success">{stats.completed}</span>
        </div>
        <div className="stat-card small">
          <span className="stat-label">Активных</span>
          <span className="stat-value warning">{stats.active}</span>
        </div>
      </div>

      <div className="todos-filters">
        <button
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          Все
        </button>
        <button
          className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
          onClick={() => setFilter('active')}
        >
          Активные
        </button>
        <button
          className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
          onClick={() => setFilter('completed')}
        >
          Выполненные
        </button>
      </div>

      <div className="todos-list">
        {filteredTodos.map(todo => (
          <div
            key={todo.id}
            className={`todo-item ${todo.completed ? 'completed' : ''}`}
            onClick={() => handleToggleTodo(todo.id, todo.completed)}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => {}}
              onClick={e => e.stopPropagation()}
            />
            <span className="todo-title">{todo.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};