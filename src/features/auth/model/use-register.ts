import { publicRqClient } from "@/shared/api/instance";
import type { ApiSchemas } from "@/shared/api/schema";
import { useSession } from "@/shared/model/session";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useRegister() {
  const navigate = useNavigate();

  const session = useSession();

  const registerMutation = publicRqClient.useMutation(
    "post",
    "/auth/register",
    {
      onSuccess(data) {
        session.login(data.accessToken);
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
    },
  );

  const register = (data: ApiSchemas["RegisterRequest"]) => {
    registerMutation.mutate({ body: data });
  };

  return {
    register,
    isPending: registerMutation.isPending,
  };
}
