import { Button } from "@/shared/ui/kit/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/shared/ui/kit/dropdown-menu";
import { MoreHorizontalIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface BoardsListItemProps {
  board: {
    id: string;
    createdAt: string;
    lastOpenedAt: string;
    name: string;
  };
  rightActions?: React.ReactNode;
  menuActions?: React.ReactNode;
}

export default function BoardsListItem({
  board,
  rightActions,
  menuActions,
}: BoardsListItemProps) {
  return (
    <div className="flex items-center gap-4 p-4 border-b last:border-b-0">
      <div className="flex-grow min-w-0">
        <Button
          asChild
          variant="link"
          className="text-left justify-start h-auto p-0"
        >
          <Link to={`/board/${board.id}`}>
            <span className="text-lg font-medium truncate block">
              {board.name}
            </span>
          </Link>
        </Button>
        <div className="flex gap-4 text-sm text-gray-500 mt-1">
          <div>Создано: {new Date(board.createdAt).toLocaleDateString()}</div>
          <div>
            Последнее открытие:{" "}
            {new Date(board.lastOpenedAt).toLocaleDateString()}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {rightActions}
        {menuActions && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <MoreHorizontalIcon className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">{menuActions}</DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
}
