import React from "react";
import { useTheme } from "../../../shared/lib/theme/ThemeContext";
import { Button } from "../../../shared/ui/Button/Button";

export const ThemeSwitcher: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      onClick={toggleTheme}
      variant="outline"
      size="small"
      aria-label={`Переключить тему. Текущая тема: ${theme}`}
    >
      {theme === "light" ? (
        <>
          <span>🌙</span> Тёмная
        </>
      ) : (
        <>
          <span>☀️</span> Светлая
        </>
      )}
    </Button>
  );
};
