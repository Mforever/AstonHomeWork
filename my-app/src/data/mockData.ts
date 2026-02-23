import { Post, Comment } from '../types';

export const MOCK_POSTS: readonly Post[] = Object.freeze([
  {
    id: 1,
    title: "Введение в React: Современный подход к разработке",
    body: "React - это мощная библиотека для создания пользовательских интерфейсов. Она позволяет создавать переиспользуемые компоненты, управлять состоянием приложения и эффективно обновлять DOM.",
    commentsCount: 3,
  },
  {
    id: 2,
    title: "Компоненты и пропсы: Архитектура приложения",
    body: "Компоненты позволяют разбить интерфейс на независимые, переиспользуемые части. Пропсы - это входные данные для компонентов, которые делают их гибкими.",
    commentsCount: 2,
  },
  {
    id: 3,
    title: "Состояние и хуки: Управление данными",
    body: "useState, useEffect, useContext - эти хуки революционизировали способ управления состоянием в React. Мы подробно разберем каждый хук.",
    commentsCount: 0,
  },
  {
    id: 4,
    title: "Обработка событий и формы",
    body: "В React события именуются в camelCase и работают немного иначе, чем в обычном JavaScript. Мы рассмотрим все тонкости обработки событий.",
    commentsCount: 1,
  },
  {
    id: 5,
    title: "Условный рендеринг и циклы",
    body: "В React можно создавать разные компоненты в зависимости от условий, используя if, тернарный оператор или логическое И.",
    commentsCount: 0,
  },
  {
    id: 6,
    title: "Продвинутые паттерны React",
    body: "Компаунд-компоненты, render-props, HOC - эти паттерны помогут вам создавать более гибкие и переиспользуемые компоненты.",
    commentsCount: 2,
  },
]);

export const MOCK_COMMENTS: readonly Comment[] = Object.freeze([
  {
    id: 1,
    postId: 1,
    name: "Анна Смирнова",
    email: "anna.smirnova@design.ru",
    body: "Потрясающая статья! Я наконец-то поняла, как работают хуки в React.",
  },
  {
    id: 2,
    postId: 1,
    name: "Петр Волков",
    email: "petr.volkov@dev.com",
    body: "Очень структурированный материал. Добавил в избранное.",
  },
  {
    id: 3,
    postId: 1,
    name: "Елена Прекрасная",
    email: "elena.design@mail.ru",
    body: "Наконец-то нашла понятное объяснение! До этого читала много статей.",
  },
  {
    id: 4,
    postId: 2,
    name: "Михаил Иванов",
    email: "mikhail.ivanov@yandex.ru",
    body: "Отличная статья про компоненты! Пропсы теперь стали понятнее.",
  },
  {
    id: 5,
    postId: 2,
    name: "Ольга Петрова",
    email: "olga.petrova@gmail.com",
    body: "Очень помогло объяснение про типизацию пропсов с TypeScript.",
  },
  {
    id: 6,
    postId: 4,
    name: "Дмитрий Соколов",
    email: "dmitry.sokolov@dev.ru",
    body: "Спасибо за раздел про формы! Наконец-то разобрался.",
  },
  {
    id: 7,
    postId: 6,
    name: "Алексей Федоров",
    email: "alexey.fedorov@pro.ru",
    body: "Продвинутые паттерны - это то, что нужно!",
  },
  {
    id: 8,
    postId: 6,
    name: "Наталья Морозова",
    email: "natalia.morozova@mail.ru",
    body: "HOC и render-props наконец-то стали понятны.",
  },
]);

export const getCommentsByPostId = (() => {
  const cache = new Map<number, Comment[]>();

  return (postId: number): Comment[] => {
    if (cache.has(postId)) {
      return cache.get(postId)!;
    }

    const comments = MOCK_COMMENTS.filter(c => c.postId === postId);
    cache.set(postId, comments);
    return comments;
  };
})();