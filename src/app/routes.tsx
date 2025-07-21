import { Skeleton } from "@/shared/ui/kit/skeleton";
import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

const LoginPage = lazy(() => import("@/features/auth/LoginPage"));
const RegisterPage = lazy(() => import("@/features/auth/RegisterPage"));
const BoardPage = lazy(() => import("@/features/board/BoardPage"));
const BoardsListPage = lazy(
  () => import("@/features/boards-list/BoardsListPage"),
);

export const AppRoutes = () => {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-screen flex-col space-y-3">
          <Skeleton className="h-[125px] w-[250px] rounded-xl bg-gray-600" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px] bg-gray-600" />
            <Skeleton className="h-4 w-[200px] bg-gray-600" />
          </div>
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<Navigate to="/boards" replace />} />
        <Route path="/boards" element={<BoardsListPage />} />
        <Route path="/boards/:boardId" element={<BoardPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Suspense>
  );
};
