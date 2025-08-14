import { useBoardsList } from "./model/useBoardsList";
import useDeleteBoard from "./model/useDeleteBoard";
import useToggleFavoriteBoard from "./model/useToggleFavoriteBoard";
import {
  BoardsListLayout,
  BoardsListLayoutContent,
  BoardsListLayoutHeader,
} from "./ui/BoardsListLayout";
import ViewToggleList, { type ViewMode } from "./ui/ViewToggleList";
import BoardsListCard from "./ui/BoardsListCard";
import { useState } from "react";
import BoardFavoriteToggle from "./ui/BoardFavoriteToggle";
import ConfirmModal from "@/shared/ui/modals/ConfirmModal";
import { Button } from "@/shared/ui/kit/button";
import BoardsListItem from "./ui/BoardsListItem";
import BoardsSidebar from "./ui/BoardsSidebar";

export default function BoardsListFavoritePage() {
  const boardsQuery = useBoardsList({
    isFavorite: true,
  });
  const deleteBoard = useDeleteBoard();
  const handleToggleFavorite = useToggleFavoriteBoard();

  const [viewMode, setViewMode] = useState<ViewMode>("list");

  return (
    <BoardsListLayout
      sidebar={<BoardsSidebar />}
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
        cursorRef={boardsQuery.cursorRef}
        mode={viewMode}
        renderList={() =>
          boardsQuery.boards.map((board) => (
            <BoardsListItem
              key={board.id}
              board={board}
              rightActions={
                <BoardFavoriteToggle
                  isFavorite={board.isFavorite}
                  isFavoriteToggle={() =>
                    handleToggleFavorite.handleToggleFavorite(
                      board.id,
                      !board.isFavorite,
                    )
                  }
                  disabled={handleToggleFavorite.isPending(board.id)}
                />
              }
              menuActions={
                <ConfirmModal
                  handleClick={() => deleteBoard.deleteBoard(board.id)}
                >
                  <Button
                    variant="ghost"
                    className="text-red-500 hover:text-red-500/90"
                    disabled={deleteBoard.isPending(board.id)}
                  >
                    Удалить
                  </Button>
                </ConfirmModal>
              }
            />
          ))
        }
        renderGrid={() =>
          boardsQuery.boards.map((board) => (
            <BoardsListCard
              key={board.id}
              board={board}
              rightTopActions={
                <BoardFavoriteToggle
                  isFavorite={board.isFavorite}
                  isFavoriteToggle={() =>
                    handleToggleFavorite.handleToggleFavorite(
                      board.id,
                      !board.isFavorite,
                    )
                  }
                  disabled={handleToggleFavorite.isPending(board.id)}
                />
              }
              bottomActions={
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
              }
            />
          ))
        }
      />
    </BoardsListLayout>
  );
}
