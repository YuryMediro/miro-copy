import { rqClient } from "@/shared/api/instance";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function useDeleteBoard() {
  const queryClient = useQueryClient();

  const deleteBoardMutation = rqClient.useMutation(
    "delete",
    "/boards/{boardId}",
    {
      onSettled: async () => {
        await queryClient.invalidateQueries(
          rqClient.queryOptions("get", "/boards"),
        );
      },
      onSuccess() {
        toast.success("Вы удалили доску!", {
          icon: "👏",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      },
      onError() {
        toast.error("Ошибка при удаление доски", {
          icon: "😞",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      },
    },
  );
  return {
    deleteBoard: (boardId: string) =>
      deleteBoardMutation.mutate({
        params: { path: { boardId } },
      }),
    isPending: (boardId: string) =>
      deleteBoardMutation.isPending && deleteBoardMutation.variables?.params?.path?.boardId === boardId,
  };
}
