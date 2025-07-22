import { publicRqClient} from "@/shared/api/instance";
import type { ApiSchemas } from "@/shared/api/schema";
import { useSession } from "@/shared/model/session";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const navigate = useNavigate();

  const session = useSession();

  const loginMutation = publicRqClient.useMutation("post", "/auth/login", {
    onSuccess(data) {
      session.login(data.accessToken);
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
