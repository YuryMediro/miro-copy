import { Link } from "react-router-dom";
import { AuthLayout } from "./auth-layout";
import { LoginForm } from "./login-form";

export default function LoginPage() {
  return (
    <AuthLayout
      title="Вход в систему"
      description="Введите ваш email и пароль для входа в систему"
      form={<LoginForm/>}
      footerText={
        <>
          Нет аккаунта?{" "}
          <Link
            className="text-primary underline-offset-4 hover:underline"
            to="/register"
          >
            Зарегистрироваться
          </Link>
        </>
      }
    />
  );
}
