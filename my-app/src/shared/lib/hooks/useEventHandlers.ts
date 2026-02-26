import { useCallback, MouseEventHandler, ChangeEventHandler, FormEventHandler } from 'react';

/**
 * Типизированные хуки для обработчиков событий
 */

/**
 * Хук для создания обработчика клика с типизированным параметром
 */
export function useClickHandler<T = HTMLDivElement>(
  handler: (event: React.MouseEvent<T>) => void,
  deps: React.DependencyList = []
): MouseEventHandler<T> {
  return useCallback<MouseEventHandler<T>>(handler, deps);
}

/**
 * Хук для создания обработчика клика по элементу с данными
 */
export function useItemClickHandler<T, E = HTMLDivElement>(
  item: T,
  handler: (item: T, event: React.MouseEvent<E>) => void,
  deps: React.DependencyList = []
): MouseEventHandler<E> {
  return useCallback<MouseEventHandler<E>>(
    (event) => handler(item, event),
    [item, ...deps]
  );
}

/**
 * Хук для создания обработчика изменения input
 */
export function useInputChangeHandler(
  handler: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void,
  deps: React.DependencyList = []
): ChangeEventHandler<HTMLInputElement> {
  return useCallback<ChangeEventHandler<HTMLInputElement>>(
    (event) => handler(event.target.value, event),
    deps
  );
}

// Экспортируем все хуки
export {
  useClickHandler,
  useItemClickHandler,
  useInputChangeHandler
};