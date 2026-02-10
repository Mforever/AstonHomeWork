import React from "react";
import { Modal } from "../../../shared/ui/Modal/Modal";
import { Button } from "../../../shared/ui/Button/Button";

interface ProjectInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectInfoModal: React.FC<ProjectInfoModalProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="О проекте">
      <div className="project-info">
        <h4>React Blog App</h4>
        <p>
          Это учебное приложение, созданное в рамках курса по React и
          TypeScript. Проект демонстрирует современные подходы к разработке
          React-приложений.
        </p>

        <h5>Основные возможности:</h5>
        <ul>
          <li>📝 Отображение списка постов</li>
          <li>🎨 Переключение светлой/тёмной темы</li>
          <li>🪟 Модальные окна через React Portal</li>
          <li>🧩 Компонентный подход (FSD архитектура)</li>
          <li>⚡ Быстрая загрузка благодаря Vite</li>
        </ul>

        <h5>Используемые технологии:</h5>
        <div className="tech-stack">
          {["React", "TypeScript", "Vite", "CSS Modules", "FSD"].map(
            (tech, index) => (
              <span key={index} className="tech-tag">
                {tech}
              </span>
            ),
          )}
        </div>

        <div className="modal-footer">
          <Button onClick={onClose} variant="primary">
            Закрыть
          </Button>
        </div>
      </div>
    </Modal>
  );
};
