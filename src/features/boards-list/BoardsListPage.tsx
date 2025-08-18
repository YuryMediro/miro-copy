import { Button } from "@/shared/ui/kit/button";
import { useBoardsList } from "./model/useBoardsList";
import { useBoardsFilters } from "./model/useBoardsFilter";
import { useDebounce } from "@/shared/lib/react";
import useCreateBoard from "./model/use-create-board";
import useDeleteBoard from "./model/useDeleteBoard";
import useToggleFavoriteBoard from "./model/useToggleFavoriteBoard";
import {
  BoardsListLayout,
  BoardsListLayoutContent,
  BoardsListLayoutFilters,
  BoardsListLayoutHeader,
} from "./ui/BoardsListLayout";
import { PlusIcon } from "lucide-react";
import ViewToggleList, { type ViewMode } from "./ui/ViewToggleList";
import BoardsSearchInput from "./ui/BoardsSearchInput";
import BoardsSortFilter from "./ui/BoardsSortFilter";
import BoardsListCard from "./ui/BoardsListCard";
import { useState } from "react";
import BoardFavoriteToggle from "./ui/BoardFavoriteToggle";
import ConfirmModal from "@/shared/ui/modals/ConfirmModal";
import BoardsListItem from "./ui/BoardsListItem";
import BoardsSidebar from "./ui/BoardsSidebar";
import TemplatesGallery from "../boardTemplates/templatesGallery";
import { useTemplateModal } from "../boardTemplates/useTemplatesModal";
import TemplatesModal from "../boardTemplates/templatesModal";

export default function BoardsListPage() {
  const boardsFilters = useBoardsFilters();
  const boardsQuery = useBoardsList({
    sort: boardsFilters.sort,
    search: useDebounce(boardsFilters.search, 300),
  });
  const createBoard = useCreateBoard();
  const deleteBoard = useDeleteBoard();
  const handleToggleFavorite = useToggleFavoriteBoard();
  
  const templateModal = useTemplateModal()

  const [viewMode, setViewMode] = useState<ViewMode>("list");

  return (
    <>
    <TemplatesModal/>
    <BoardsListLayout
    templates={<TemplatesGallery/>}
      sidebar={<BoardsSidebar />}
      header={
        <BoardsListLayoutHeader
          title="Доски"
          description="Здесь вы можете просматривать и управлять своими досками"
          actions={
            <>
            <Button variant='outline' onClick={() => templateModal.open()}>Выбрать шаблон</Button>
            <Button
              disabled={createBoard.isPending}
              onClick={createBoard.createBoard}
            >
              <PlusIcon /> Создать доску
            </Button></>
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
    </>
  );
}
