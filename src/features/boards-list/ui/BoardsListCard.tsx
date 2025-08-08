import { Button } from "@/shared/ui/kit/button";
import { Card, CardFooter, CardHeader } from "@/shared/ui/kit/card";
import ConfirmModal from "@/shared/ui/modals/ConfirmModal";
import { Link } from "react-router-dom";
import BoardFavoriteToggle from "./BoardFavoriteToggle";

interface BoardsListCardProps {
  board: {
    id: string;
    createdAt: string;
    lastOpenedAt: string;
    name: string;
  };
  isFavorite: boolean;
  isFavoriteToggle: () => void;
  isPendingToggle: (boardId: string) => boolean;
  isPendingDelete: (boardId: string) => boolean;
  onDeleteBoard: (boardId: string) => void;
}

export default function BoardsListCard({
  isFavorite,
  isFavoriteToggle,
  board,
  isPendingToggle,
  isPendingDelete,
  onDeleteBoard,
}: BoardsListCardProps) {
  return (
    <Card className="relative">
      <div className="absolute top-2 right-2 ">
        <BoardFavoriteToggle isFavorite={isFavorite} isFavoriteToggle={isFavoriteToggle} disabled={isPendingToggle(board.id)} /> 
      </div>
      <CardHeader>
        <div className="flex flex-col gap-2">
          <Button
            asChild
            variant="link"
            className="text-left justify-start h-auto p-0"
          >
            <Link to={`/board/${board.id}`}>
              <span className="text-xl font-medium">{board.name}</span>
            </Link>
          </Button>
          <div className="text-sm text-gray-500">
            Создано: {new Date(board.createdAt).toLocaleDateString()}
          </div>
          <div className="text-sm text-gray-500">
            Последнее открытие:{" "}
            {new Date(board.lastOpenedAt).toLocaleDateString()}
          </div>
        </div>
      </CardHeader>
      <CardFooter>
        <ConfirmModal handleClick={() => onDeleteBoard(board.id)}>
          <Button variant="destructive" disabled={isPendingDelete(board.id)}>
            Удалить
          </Button>
        </ConfirmModal>
      </CardFooter>
    </Card>
  );
}
