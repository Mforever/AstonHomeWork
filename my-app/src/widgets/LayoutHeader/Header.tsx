import React from "react";

const Header: React.FC = () => {
  return (
    <header className="header">
      <h1>Блог постов</h1>
      <nav>
        <a href="#">Главная</a>
        <a href="#">О нас</a>
        <a href="#">Контакты</a>
      </nav>
    </header>
  );
};

export default Header;
