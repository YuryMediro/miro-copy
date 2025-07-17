import { LoginPage, RegisterPage } from "@/features/auth";
import { BoardPage } from "@/features/board";
import { BoardsListPage } from "@/features/boards-list";
import { Route, Routes } from "react-router-dom";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/boards" element={<BoardPage />} />
      <Route path="/boards/:boardId" element={<BoardsListPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
};
