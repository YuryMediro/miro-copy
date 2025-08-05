import { useBoardsList } from "./model/useBoardsList";
import useDeleteBoard from "./model/useDeleteBoard";
import useToggleFavoriteBoard from "./model/useToggleFavoriteBoard";
import {
  BoardsListLayout,
  BoardsListLayoutCards,
  BoardsListLayoutHeader,
  BoardsListListLayout,
} from "./ui/BoardsListLayout";
import ViewToggleList, { type ViewMode } from "./ui/ViewToggleList";
import BoardsListLayoutContent from "./ui/BoardsListLayout";
import BoardsListCard from "./ui/BoardsListCard";
import { useState } from "react";

export default function BoardsListFavoritePage() {
  const boardsQuery = useBoardsList({
    isFavorite: true,
  });
  const deleteBoard = useDeleteBoard();
  const handleToggleFavorite = useToggleFavoriteBoard();

  const [viewMode, setViewMode] = useState<ViewMode>("list");

  return (
    <BoardsListLayout
      header={
        <BoardsListLayoutHeader
          title="Избранные доски"
          description="Здесь вы можете просматривать и управлять своими избранными досками"
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
