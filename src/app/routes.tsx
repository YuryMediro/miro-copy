import { LoginPage, RegisterPage } from "@/features/auth";
import { BoardPage } from "@/features/board";
import { BoardsListPage } from "@/features/boards-list";
import { Navigate, Route, Routes } from "react-router-dom";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to='/boards' replace/>}/>
      <Route path="/boards" element={<BoardsListPage />} />
      <Route path="/boards/:boardId" element={<BoardPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
};
