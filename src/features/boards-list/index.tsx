import { CONFIG } from "@/shared/model/config";
import { Link } from "react-router-dom";

export function BoardsListPage() {
  return (
    <div>
      <h1>Boards list {CONFIG.API_BASE_URL}</h1>
      <Link to={`/boards/1`}>Board 1</Link>
    </div>
  );
}
