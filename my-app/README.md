Title: Домашнее задание 1

Description:

### Что было реализовано
Создано начальное React приложение на TypeScript с использованием Vite. Реализована отрисовка списка постов с передачей данных через props между компонентами в соответствии с методологией FSD.

### Структура проекта (FSD)

src/
├── app/ # App.tsx
├── entities/ # Бизнес-сущности (PostCard, типы постов)
│ └── post/
│ ├── ui/PostCard.tsx
│ └── types/types.ts
├── widgets/ # Самостоятельные виджеты
│ ├── LayoutHeader/Header.tsx
│ ├── LayoutFooter/Footer.tsx
│ └── PostList/PostList.tsx
├── shared/ # Переиспользуемые ресурсы
│ ├── layouts/MainLayout.tsx
│ └── api/posts.ts (моковые данные)
└── index.css

Основные компоненты
App.tsx - корневой компонент

MainLayout.tsx - макет с Header, Footer

PostList.tsx - список постов (принимает posts через props)

PostCard.tsx - карточка поста (принимает post через props)

Передача данных через props
PostList получает массив постов через пропс posts

PostCard получает объект поста через пропс post

Используются TypeScript интерфейсы для типизации пропсов
