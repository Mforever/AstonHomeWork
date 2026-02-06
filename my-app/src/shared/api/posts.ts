import { Post } from "../../entities/post/types/types";

export const mockPosts: Post[] = [
  {
    id: 1,
    title: "Мой первый пост",
    body: "Это содержимое моего первого поста в этом блоге...",
    date: "2024-01-15",
    author: "Иван Иванов",
  },
  {
    id: 2,
    title: "Изучаем React",
    body: "React — это JavaScript-библиотека для создания пользовательских интерфейсов...",
    date: "2024-01-16",
    author: "Анна Петрова",
  },
  {
    id: 3,
    title: "TypeScript в действии",
    body: "TypeScript добавляет статическую типизацию к JavaScript...",
    date: "2024-01-17",
    author: "Сергей Сидоров",
  },
];
