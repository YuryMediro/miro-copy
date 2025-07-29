import { rqClient } from "@/shared/api/instance";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function useCreateBoard() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const createBoardMutation = rqClient.useMutation("post", "/boards", {
    onSettled: async () => {
      await queryClient.invalidateQueries(
        rqClient.queryOptions("get", "/boards"),
      );
    },
    onSuccess(data) {
      navigate(`/boards/${data.id}`);
      toast.success("Вы успешно создали доску!", {
        icon: "👏",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    },
    onError() {
      toast.error("Ошибка при создание доски", {
        icon: "😞",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    },
  });
  return {
    createBoard: () => createBoardMutation.mutate({}),
    isPending: createBoardMutation.isPending,
  };
}
