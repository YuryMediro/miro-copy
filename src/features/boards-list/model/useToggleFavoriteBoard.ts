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
  return;
}
