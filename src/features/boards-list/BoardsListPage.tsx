import { Button } from "@/shared/ui/kit/button";
import { useBoardsList } from "./model/useBoardsList";
import { useBoardsFilters } from "./model/useBoardsFilter";
import { useDebounce } from "@/shared/lib/react";
import useCreateBoard from "./model/use-create-board";
import useDeleteBoard from "./model/useDeleteBoard";
import useToggleFavoriteBoard from "./model/useToggleFavoriteBoard";
import {
  BoardsListLayout,
  BoardsListLayoutCards,
  BoardsListLayoutFilters,
  BoardsListLayoutHeader,
  BoardsListListLayout,
} from "./ui/BoardsListLayout";
import { PlusIcon } from "lucide-react";
import ViewToggleList, { type ViewMode } from "./ui/ViewToggleList";
import BoardsSearchInput from "./ui/BoardsSearchInput";
import BoardsSortFilter from "./ui/BoardsSortFilter";
import BoardsListLayoutContent from "./ui/BoardsListLayout";
import BoardsListCard from "./ui/BoardsListCard";
import { useState } from "react";

export default function BoardsListPage() {
  const boardsFilters = useBoardsFilters();
  const boardsQuery = useBoardsList({
    sort: boardsFilters.sort,
    search: useDebounce(boardsFilters.search, 300),
  });
  const createBoard = useCreateBoard();
  const deleteBoard = useDeleteBoard();
  const handleToggleFavorite = useToggleFavoriteBoard();

  const [viewMode, setViewMode] = useState<ViewMode>("list");

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
          actions={
            <ViewToggleList
              value={viewMode}
              onChange={(value) => setViewMode(value)}
            />
          }
        />
      }
    >
      <BoardsListLayoutContent
        isPending={boardsQuery.isPending}
        isPendingNext={boardsQuery.isFetchingNextPage}
        hasCursor={boardsQuery.hasNextPage}
        isEmpty={boardsQuery.boards.length === 0}
      >
        {viewMode === "list" ? (
          <BoardsListListLayout>
            {boardsQuery.boards.map((board) => (
              <BoardsListCard
                key={board.id}
                board={board}
                isFavorite={board.isFavorite}
                isFavoriteToggle={() =>
                  handleToggleFavorite.handleToggleFavorite(
                    board.id,
                    !board.isFavorite,
                  )
                }
                isPendingDelete={deleteBoard.isPending}
                isPendingToggle={handleToggleFavorite.isPending}
                onDeleteBoard={deleteBoard.deleteBoard}
              />
            ))}
          </BoardsListListLayout>
        ) : (
          <BoardsListLayoutCards>
            {boardsQuery.boards.map((board) => (
              <BoardsListCard
                key={board.id}
                board={board}
                isFavorite={board.isFavorite}
                isFavoriteToggle={() =>
                  handleToggleFavorite.handleToggleFavorite(
                    board.id,
                    !board.isFavorite,
                  )
                }
                isPendingDelete={deleteBoard.isPending}
                isPendingToggle={handleToggleFavorite.isPending}
                onDeleteBoard={deleteBoard.deleteBoard}
              />
            ))}
          </BoardsListLayoutCards>
        )}
      </BoardsListLayoutContent>
    </BoardsListLayout>
  );
}
