import React, { useState, useEffect } from "react";
import "./App.css";
import "./index.css";
import "./shared/ui/Modal/Modal.css";
import "./widgets/CommentList/ui/CommentList.css";

// Локальные данные с расширенной информацией
const MOCK_POSTS = [
  {
    id: 1,
    title: "Введение в React: Современный подход к разработке",
    body: "React - это мощная библиотека для создания пользовательских интерфейсов. Она позволяет создавать переиспользуемые компоненты, управлять состоянием приложения и эффективно обновлять DOM. В этой статье мы рассмотрим основные концепции и лучшие практики использования React в современных проектах.",
    commentsCount: 3,
  },
  {
    id: 2,
    title: "Компоненты и пропсы: Архитектура приложения",
    body: "Компоненты позволяют разбить интерфейс на независимые, переиспользуемые части. Пропсы - это входные данные для компонентов, которые делают их гибкими и настраиваемыми. Узнайте, как правильно организовывать компонентную архитектуру в ваших проектах.",
    commentsCount: 2,
  },
  {
    id: 3,
    title: "Состояние и хуки: Управление данными",
    body: "useState, useEffect, useContext - эти хуки революционизировали способ управления состоянием в React. Мы подробно разберем каждый хук, их особенности и случаи использования. Вы узнаете, как избежать распространенных ошибок при работе с хуками.",
    commentsCount: 0,
  },
  {
    id: 4,
    title: "Обработка событий и формы",
    body: "В React события именуются в camelCase и работают немного иначе, чем в обычном JavaScript. Мы рассмотрим все тонкости обработки событий, работу с формами, валидацию и лучшие практики при создании интерактивных интерфейсов.",
    commentsCount: 1,
  },
  {
    id: 5,
    title: "Условный рендеринг и циклы",
    body: "В React можно создавать разные компоненты в зависимости от условий, используя if, тернарный оператор или логическое И. Также мы рассмотрим рендеринг списков, важность ключей и оптимизацию производительности.",
    commentsCount: 0,
  },
  {
    id: 6,
    title: "Продвинутые паттерны React",
    body: "Компаунд-компоненты, render-props, HOC - эти паттерны помогут вам создавать более гибкие и переиспользуемые компоненты. Разберем каждый паттерн с примерами и определим случаи их применения.",
    commentsCount: 2,
  },
];

const MOCK_COMMENTS = [
  {
    id: 1,
    postId: 1,
    name: "Анна Смирнова",
    email: "anna.smirnova@design.ru",
    body: "Потрясающая статья! Я наконец-то поняла, как работают хуки в React. Особенно понравилось объяснение про useEffect и зависимости. Спасибо большое за такой качественный контент!",
  },
  {
    id: 2,
    postId: 1,
    name: "Петр Волков",
    email: "petr.volkov@dev.com",
    body: "Очень структурированный материал. Добавил в избранное. Буду перечитывать и углублять знания. Отдельное спасибо за примеры кода - они очень наглядные.",
  },
  {
    id: 3,
    postId: 1,
    name: "Елена Прекрасная",
    email: "elena.design@mail.ru",
    body: "Наконец-то нашла понятное объяснение! До этого читала много статей, но здесь все разложено по полочкам. Жду продолжения про Redux и другие библиотеки.",
  },
  {
    id: 4,
    postId: 2,
    name: "Михаил Иванов",
    email: "mikhail.ivanov@yandex.ru",
    body: "Отличная статья про компоненты! Пропсы теперь стали понятнее. Особенно полезным было объяснение про children и композицию компонентов.",
  },
  {
    id: 5,
    postId: 2,
    name: "Ольга Петрова",
    email: "olga.petrova@gmail.com",
    body: "Очень помогло объяснение про типизацию пропсов с TypeScript. Раньше не понимала, зачем это нужно, теперь все встало на свои места.",
  },
  {
    id: 6,
    postId: 4,
    name: "Дмитрий Соколов",
    email: "dmitry.sokolov@dev.ru",
    body: "Спасибо за раздел про формы! Наконец-то разобрался с контролируемыми и неконтролируемыми компонентами. Очень полезная информация.",
  },
  {
    id: 7,
    postId: 6,
    name: "Алексей Федоров",
    email: "alexey.fedorov@pro.ru",
    body: "Продвинутые паттерны - это то, что нужно! Особенно понравился раздел про компаунд-компоненты. Теперь буду использовать в своих проектах.",
  },
  {
    id: 8,
    postId: 6,
    name: "Наталья Морозова",
    email: "natalia.morozova@mail.ru",
    body: "HOC и render-props наконец-то стали понятны. Спасибо за подробные примеры и объяснения. Жду новых статей!",
  },
];

function App() {
  const [posts] = useState(MOCK_POSTS);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedComments, setExpandedComments] = useState<Set<number>>(
    new Set([1, 2, 4]),
  );
  const [filterMin, setFilterMin] = useState(0);
  const [filterMax, setFilterMax] = useState(100);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Находим максимальную длину заголовка
    const maxTitleLength = Math.max(...posts.map((p) => p.title.length));
    setFilterMax(maxTitleLength);
  }, [posts]);

  // Фильтрация постов
  const filteredPosts = posts.filter((post) => {
    const titleLength = post.title.length;
    return titleLength >= filterMin && titleLength <= filterMax;
  });

  // Статистика
  const totalPosts = filteredPosts.length;
  const avgTitleLength =
    totalPosts > 0
      ? (
          filteredPosts.reduce((acc, p) => acc + p.title.length, 0) / totalPosts
        ).toFixed(1)
      : 0;
  const totalComments = filteredPosts.reduce(
    (acc, p) => acc + p.commentsCount,
    0,
  );

  const openModal = (post: any) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const toggleComment = (commentId: number) => {
    setExpandedComments((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(commentId)) {
        newSet.delete(commentId);
      } else {
        newSet.add(commentId);
      }
      return newSet;
    });
  };

  const handleFilterReset = () => {
    setFilterMin(0);
    setFilterMax(Math.max(...posts.map((p) => p.title.length)));
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>React Mastery</h1>
        <div className="header-stats">
          <div className="header-stat">
            <span className="header-stat-label">Постов</span>
            <span className="header-stat-value">{posts.length}</span>
          </div>
          <div className="header-stat">
            <span className="header-stat-label">Комментариев</span>
            <span className="header-stat-value">
              {posts.reduce((acc, p) => acc + p.commentsCount, 0)}
            </span>
          </div>
        </div>
      </header>

      <div className="stats-container">
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-label">Всего постов</div>
          <div className="stat-value">{totalPosts}</div>
          <div className="stat-description">из {posts.length} доступных</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📏</div>
          <div className="stat-label">Средняя длина</div>
          <div className="stat-value">{avgTitleLength}</div>
          <div className="stat-description">символов в заголовке</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">💬</div>
          <div className="stat-label">Комментариев</div>
          <div className="stat-value">{totalComments}</div>
          <div className="stat-description">во всех постах</div>
        </div>
      </div>

      <div className="filter-container">
        <h3 className="filter-title">Фильтр по длине заголовка</h3>
        <div className="filter-controls">
          <div className="filter-group">
            <label>От {filterMin} символов</label>
            <input
              type="range"
              min={0}
              max={Math.max(...posts.map((p) => p.title.length))}
              value={filterMin}
              onChange={(e) => setFilterMin(Number(e.target.value))}
            />
            <span className="filter-value">{filterMin} мин</span>
          </div>

          <div className="filter-group">
            <label>До {filterMax} символов</label>
            <input
              type="range"
              min={0}
              max={Math.max(...posts.map((p) => p.title.length))}
              value={filterMax}
              onChange={(e) => setFilterMax(Number(e.target.value))}
            />
            <span className="filter-value">{filterMax} макс</span>
          </div>

          <button className="filter-reset-btn" onClick={handleFilterReset}>
            Сбросить
          </button>
        </div>
      </div>

      {loading ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <div className="loading-text">
            Загружаем посты<span className="loading-dots"></span>
          </div>
        </div>
      ) : (
        <div className="posts-grid">
          {filteredPosts.map((post, index) => (
            <article
              key={post.id}
              className="post-card"
              onClick={() => openModal(post)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <span className="post-badge">ID: {post.id}</span>
              <h3 className="post-title">{post.title}</h3>
              <span className="post-title-length">
                📏 {post.title.length} символов
              </span>
              <p className="post-excerpt">{post.body.substring(0, 120)}...</p>
              <div className="post-footer">
                <span className="post-comments-count">
                  {post.commentsCount} комментариев
                </span>
                <span className="post-read-more">Читать</span>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Модальное окно */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{selectedPost?.title}</h2>
              <button
                className="modal-close-btn"
                onClick={() => setIsModalOpen(false)}
              >
                ✕
              </button>
            </div>

            <div className="modal-body">
              <p>{selectedPost?.body}</p>

              <div className="comment-list">
                <h3>Комментарии</h3>
                {MOCK_COMMENTS.filter((c) => c.postId === selectedPost?.id).map(
                  (comment, index) => (
                    <div
                      key={comment.id}
                      className={`comment-item ${expandedComments.has(comment.id) ? "expanded" : ""}`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div
                        className="comment-header"
                        onClick={() => toggleComment(comment.id)}
                      >
                        <div className="comment-author">
                          <span className="comment-author-name">
                            {comment.name}
                          </span>
                          <span className="comment-author-email">
                            {comment.email}
                          </span>
                        </div>
                        <button
                          className={`toggle-btn ${expandedComments.has(comment.id) ? "expanded" : ""}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleComment(comment.id);
                          }}
                        >
                          <span className="toggle-icon">
                            {expandedComments.has(comment.id) ? "▼" : "▶"}
                          </span>
                          {expandedComments.has(comment.id)
                            ? "Свернуть"
                            : "Читать"}
                        </button>
                      </div>
                      {expandedComments.has(comment.id) && (
                        <div className="comment-body">
                          <p>{comment.body}</p>
                        </div>
                      )}
                    </div>
                  ),
                )}
                {MOCK_COMMENTS.filter((c) => c.postId === selectedPost?.id)
                  .length === 0 && (
                  <div className="no-comments">
                    Пока нет комментариев
                    <br />
                    Будьте первым, кто оставит комментарий!
                  </div>
                )}
              </div>
            </div>

            <div className="modal-footer">
              <button
                className="btn btn-primary"
                onClick={() => setIsModalOpen(false)}
              >
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
