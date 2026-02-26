import React, { ReactNode } from 'react';
import './ItemList.css';

/**
 * Интерфейс пропсов для дженерик компонента списка
 */
export interface ItemListProps<T> {
  /** Массив элементов для отображения */
  items: T[];
  /** Функция для получения уникального ключа элемента */
  getItemKey: (item: T) => string | number;
  /** Функция для рендеринга элемента */
  renderItem: (item: T, index: number) => ReactNode;
  /** Состояние загрузки */
  loading?: boolean;
  /** Сообщение об ошибке */
  error?: string | null;
  /** Сообщение при пустом списке */
  emptyMessage?: string;
  /** Дополнительные CSS классы */
  className?: string;
  /** Обработчик клика по элементу */
  onItemClick?: (item: T) => void;
  /** Grid или список */
  layout?: 'grid' | 'list';
  /** Количество колонок в grid */
  gridColumns?: number;
}

/**
 * Дженерик компонент для отображения списка элементов
 */
export function ItemList<T>({
  items,
  getItemKey,
  renderItem,
  loading = false,
  error = null,
  emptyMessage = 'Нет данных для отображения',
  className = '',
  onItemClick,
  layout = 'grid',
  gridColumns = 3,
}: ItemListProps<T>): React.ReactElement {

  // Состояние загрузки
  if (loading) {
    return (
      <div className="item-list-loading">
        <div className="spinner"></div>
        <p>Загрузка...</p>
      </div>
    );
  }

  // Состояние ошибки
  if (error) {
    return (
      <div className="item-list-error">
        <span className="error-icon">⚠️</span>
        <p>{error}</p>
      </div>
    );
  }

  // Пустой список
  if (!items.length) {
    return (
      <div className="item-list-empty">
        <span className="empty-icon">📭</span>
        <p>{emptyMessage}</p>
      </div>
    );
  }

  // Определяем стили сетки
  const gridStyle = layout === 'grid'
    ? {
        display: 'grid',
        gridTemplateColumns: `repeat(${gridColumns}, 1fr)`,
        gap: '20px',
      }
    : {
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '10px',
      };

  return (
    <div
      className={`item-list ${layout} ${className}`}
      style={gridStyle}
    >
      {items.map((item, index) => (
        <div
          key={getItemKey(item)}
          className={`item-list-card ${onItemClick ? 'clickable' : ''}`}
          onClick={() => onItemClick?.(item)}
        >
          {renderItem(item, index)}
        </div>
      ))}
    </div>
  );
}

/**
 * Хелпер для создания типизированного ItemList
 */
export function createTypedItemList<T>() {
  return ItemList<T>;
}