import { Button } from "@/shared/ui/kit/button";
import { Card, CardFooter, CardHeader } from "@/shared/ui/kit/card";
import { Link } from "react-router-dom";

interface BoardsListCardProps {
  board: {
    id: string;
    createdAt: string;
    lastOpenedAt: string;
    name: string;
  };
  rightTopActions?: React.ReactNode;
  bottomActions?: React.ReactNode;
}

export default function BoardsListCard({
  board,
  rightTopActions,
  bottomActions,
}: BoardsListCardProps) {
  return (
    <Card className="relative hover:bg-gray-200">
      {<div className="absolute top-2 right-2 ">{rightTopActions}</div>}
      <CardHeader>
        <div className="flex flex-col gap-2">
          <Button
            asChild
            variant="link"
            className="text-left justify-start h-auto p-0"
          >
            <Link to={`/boards/${board.id}`}>
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
      {bottomActions && <CardFooter>{bottomActions}</CardFooter>}
      <CardFooter></CardFooter>
    </Card>
  );
}
