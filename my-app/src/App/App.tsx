import React from "react";
import { ThemeProvider } from "./shared/lib/theme/ThemeContext";
import MainLayout from "./shared/layouts/MainLayout";
import PostList from "./widgets/PostList/PostList";

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <MainLayout>
        <PostList />
      </MainLayout>
    </ThemeProvider>
  );
};

export default App;
