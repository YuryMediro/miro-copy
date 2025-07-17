import { useLocation } from "react-router-dom";
import { AppRoutes } from "./routes";
import { AppHeader } from "@/features/header";

export function App() {
  const location = useLocation();

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <div>
      {!isAuthPage && <AppHeader />}
      <AppRoutes />
    </div>
  );
}
