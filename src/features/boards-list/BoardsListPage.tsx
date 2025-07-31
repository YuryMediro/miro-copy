import { Button } from "@/shared/ui/kit/button";
import { Card, CardFooter, CardHeader } from "@/shared/ui/kit/card";
import { Link } from "react-router-dom";
import { Switch } from "@/shared/ui/kit/switch";
import { useBoardsList } from "./model/useBoardsList";
import { useBoardsFilters } from "./model/useBoardsFilter";
import { useDebounce } from "@/shared/lib/react";
import useCreateBoard from "./model/use-create-board";
import useDeleteBoard from "./model/useDeleteBoard";
import ConfirmModal from "@/shared/ui/modals/ConfirmModal";
import useToggleFavoriteBoard from "./model/useToggleFavoriteBoard";
import {
  BoardsListLayout,
  BoardsListLayoutFilters,
  BoardsListLayoutHeader,
} from "./ui/BoardsListLayout";
import { PlusIcon } from "lucide-react";
import ViewToggleList from "./ui/ViewToggleList";
import BoardsSearchInput from "./ui/BoardsSearchInput";
import BoardsSortFilter from "./ui/BoardsSortFilter";
import BoardsListLayoutContent from "./ui/BoardsListLayout";

export default function BoardsListPage() {
  const boardsFilters = useBoardsFilters();
  const boardsQuery = useBoardsList({
    sort: boardsFilters.sort,
    search: useDebounce(boardsFilters.search, 300),
  });
  const createBoard = useCreateBoard();
  const deleteBoard = useDeleteBoard();
  const handleToggleFavorite = useToggleFavoriteBoard();

  return (
    <BoardsListLayout
      header={
        <BoardsListLayoutHeader
          title="Доски"
          description="Здесь вы можете просматривать и управлять своими досками"
          actions={
            <Button
              disabled={createBoard.isPending}
              onClick={createBoard.createBoard}
            >
              <PlusIcon /> Создать доску
            </Button>
          }
        />
      }
      filters={
        <BoardsListLayoutFilters
          search={
            <BoardsSearchInput
              value={boardsFilters.search}
              onChange={boardsFilters.setSearch}
            />
          }
          sort={
            <BoardsSortFilter
              value={boardsFilters.sort}
              onValueChange={boardsFilters.setSort}
            />
          }
          actions={<ViewToggleList />}
        />
      }
    >
      <BoardsListLayoutContent
        isPending={boardsQuery.isPending}
        isPendingNext={boardsQuery.isFetchingNextPage}
        hasCursor={boardsQuery.hasNextPage}
        isEmpty={boardsQuery.boards.length === 0}
      >
        <></>
      </BoardsListLayoutContent>
      {boardsQuery.isPending ? (
        <div className="text-center py-10">Загрузка...</div>
      ) : (
        <>
          {boardsQuery.boards.map((board) => (
            <Card key={board.id} className="relative">
              <div className="absolute top-2 right-2 flex items-center gap-2">
                <span className="text-sm text-gray-500">
                  {board.isFavorite ? "В избранном" : ""}
                </span>
                <Switch
                  className="cursor-pointer"
                  checked={board.isFavorite}
                  onCheckedChange={() =>
                    handleToggleFavorite.handleToggleFavorite(
                      board.id,
                      !board.isFavorite,
                    )
                  }
                  disabled={handleToggleFavorite.isPending(board.id)}
                />
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
                <ConfirmModal
                  handleClick={() => deleteBoard.deleteBoard(board.id)}
                >
                  <Button
                    variant="destructive"
                    disabled={deleteBoard.isPending(board.id)}
                  >
                    Удалить
                  </Button>
                </ConfirmModal>
              </CardFooter>
            </Card>
          ))}

          {boardsQuery.boards.length === 0 && !boardsQuery.isPending && (
            <div className="text-center py-10">Доски не найдены</div>
          )}

          {boardsQuery.hasNextPage && (
            <div ref={boardsQuery.cursorRef} className="text-center py-8">
              {boardsQuery.isFetchingNextPage &&
                "Загрузка дополнительных досок..."}
            </div>
          )}
        </>
      )}
    </BoardsListLayout>
  );
}
