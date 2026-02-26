/**
 * Типы для сущности "Задача" (Todo)
 */

export interface Todo {
  /** Уникальный идентификатор задачи */
  id: number;
  /** ID пользователя, владельца задачи */
  userId: number;
  /** Название задачи */
  title: string;
  /** Статус выполнения */
  completed: boolean;
}

/**
 * Тип для создания новой задачи
 */
export type CreateTodoDto = Omit<Todo, 'id'>;

/**
 * Тип для обновления задачи
 */
export type UpdateTodoDto = Partial<Omit<Todo, 'id'>> & Pick<Todo, 'id'>;

/**
 * Тип для фильтрации задач
 */
export interface TodoFilters {
  /** Фильтр по статусу */
  completed?: boolean;
  /** Поиск по названию */
  search?: string;
}

/**
 * Тип для статистики задач
 */
export interface TodoStats {
  total: number;
  completed: number;
  active: number;
  completionRate: number;
}