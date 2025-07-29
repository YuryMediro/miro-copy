import { rqClient } from "@/shared/api/instance";
import { useQueryClient } from "@tanstack/react-query";

export default function useToggleFavoriteBoard() {
  const queryClient = useQueryClient();

  const toggleFavoriteMutation = rqClient.useMutation(
    "put",
    "/boards/{boardId}/favorite",
    {
      onSettled: async () => {
        await queryClient.invalidateQueries(
          rqClient.queryOptions("get", "/boards"),
        );
      },
    },
  );

  const handleToggleFavorite = (boardId: string, isFavorite: boolean) => {
    toggleFavoriteMutation.mutate({
      params: { path: { boardId } },
      body: { isFavorite },
    });
  };

  return {
    handleToggleFavorite,
    isPending: (boardId: string) =>
      toggleFavoriteMutation.isPending &&
      toggleFavoriteMutation.variables?.params?.path?.boardId === boardId,
  };
}
