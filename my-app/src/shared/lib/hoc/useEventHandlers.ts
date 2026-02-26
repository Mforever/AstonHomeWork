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

/**
 * Хук для создания обработчика изменения select
 */
export function useSelectChangeHandler<T = string>(
  handler: (value: T, event: React.ChangeEvent<HTMLSelectElement>) => void,
  deps: React.DependencyList = []
): ChangeEventHandler<HTMLSelectElement> {
  return useCallback<ChangeEventHandler<HTMLSelectElement>>(
    (event) => handler(event.target.value as T, event),
    deps
  );
}

/**
 * Хук для создания обработчика отправки формы
 */
export function useFormSubmitHandler<T = HTMLFormElement>(
  handler: (event: React.FormEvent<T>) => void,
  deps: React.DependencyList = []
): FormEventHandler<T> {
  return useCallback<FormEventHandler<T>>(handler, deps);
}

/**
 * Хук для создания обработчика с предотвращением дефолтного поведения
 */
export function usePreventDefaultHandler<E = React.SyntheticEvent>(
  handler?: (event: E) => void
): (event: E) => void {
  return useCallback(
    (event: any) => {
      event.preventDefault();
      handler?.(event);
    },
    [handler]
  );
}

/**
 * Хук для создания обработчика с остановкой всплытия
 */
export function useStopPropagationHandler<E = React.SyntheticEvent>(
  handler?: (event: E) => void
): (event: E) => void {
  return useCallback(
    (event: any) => {
      event.stopPropagation();
      handler?.(event);
    },
    [handler]
  );
}

/**
 * Типы для пропсов компонентов с событиями
 */
export interface ClickableProps<T = HTMLDivElement> {
  onClick?: MouseEventHandler<T>;
  onDoubleClick?: MouseEventHandler<T>;
  onMouseEnter?: MouseEventHandler<T>;
  onMouseLeave?: MouseEventHandler<T>;
}

export interface InputableProps {
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: ChangeEventHandler<HTMLInputElement>;
  onFocus?: ChangeEventHandler<HTMLInputElement>;
}

export interface FormProps {
  onSubmit?: FormEventHandler<HTMLFormElement>;
  onReset?: FormEventHandler<HTMLFormElement>;
}