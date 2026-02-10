import React, { useState } from "react";
import { ThemeSwitcher } from "../../features/ThemeSwitcher/ui/ThemeSwitcher";
import { Button } from "../../shared/ui/Button/Button";
import { ProjectInfoModal } from "../../widgets/ProjectInfoModal/ui/ProjectInfoModal";

export const Header: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <header className="header">
        <div className="header-left">
          <h1>React Blog</h1>
        </div>
        <nav className="header-nav">
          <a href="#">Главная</a>
          <a href="#">Посты</a>
          <a href="#">О нас</a>
        </nav>
        <div className="header-actions">
          <Button onClick={handleOpenModal} variant="secondary" size="small">
            О проекте
          </Button>
          <ThemeSwitcher />
        </div>
      </header>

      <ProjectInfoModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
};

export default Header;
