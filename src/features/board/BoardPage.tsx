import { useParams } from "react-router-dom";

export default function BoardPage() {
  const { boardId } = useParams();
  return (
    <div>
      <h1>Board page {boardId}</h1>
    </div>
  );
}
