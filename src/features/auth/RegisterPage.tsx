import { Link } from "react-router-dom";
import { AuthLayout } from "./ui/auth-layout";
import { RegisterForm } from "./ui/register-form";

export default function RegisterPage() {
  return (
    <AuthLayout
      title="Регистрация"
      description="Введите ваш email и пароль для регистрации в систему"
      form={<RegisterForm />}
      footerText={
        <>
          Уже есть аккаунт?{" "}
          <Link
            className="text-primary underline-offset-4 hover:underline"
            to="/login"
          >
            Войти
          </Link>
        </>
      }
    />
  );
}
