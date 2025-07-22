import { rqClient } from "@/shared/api/instance";
import type { ApiSchemas } from "@/shared/api/schema";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const navigate = useNavigate();

  const loginMutation = rqClient.useMutation("post", "/auth/login", {
    onSuccess() {
      navigate("/");
      toast.success("Вы успешно авторизовались!", {
        icon: "👏",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    },
    onError(error: any) {
      const serverErrorMessage =
        error.response?.data?.message ||
        error.message ||
        "Ошибка при авторизации";

      toast.error(serverErrorMessage, {
        icon: "😞",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    },
  });

  const login = (data: ApiSchemas["LoginRequest"]) => {
    loginMutation.mutate({ body: data });
  };

  return {
    login,
    isPending: loginMutation.isPending,
  };
}
