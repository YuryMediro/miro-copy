import { rqClient } from "@/shared/api/instance";
import type { ApiSchemas } from "@/shared/api/schema";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useRegister() {
  const navigate = useNavigate();

  const registerMutation = rqClient.useMutation("post", "/auth/register", {
    onSuccess() {
      navigate("/");
      toast.success("Вы успешно зарегистрировались!", {
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
        "Ошибка при регистрации";

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

  const register = (data: ApiSchemas["RegisterRequest"]) => {
    registerMutation.mutate({ body: data });
  };

  return {
    register,
    isPending: registerMutation.isPending,
  };
}
