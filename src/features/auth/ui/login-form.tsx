import { Button } from "@/shared/ui/kit/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "@/shared/ui/kit/form";
import { Input } from "@/shared/ui/kit/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye } from "lucide-react";
import { useLogin } from "../model/use-login";
import { useVisible } from "@/shared/lib/react";

const loginSchema = z.object({
  email: z.email("Неверный формат email"),
  password: z
    .string({ message: "Введите пароль" })
    .min(6, { message: "Пароль должен быть не менее 6 символов" })
    .refine((value) => !/\s/.test(value), {
      message: "Пароль не должен содержать пробелы",
    }),
});

export function LoginForm() {
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { isPending, login } = useLogin();

  const onSubmit = form.handleSubmit(login);

  const passwordVisible = useVisible(false);

  return (
    <Form {...form}>
      <form className="flex flex-col gap-4" onSubmit={onSubmit}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="example@exmaple.com"
                  type="email"
                  autoComplete="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Пароль</FormLabel>
              <FormControl>
                <div className="relative inline-block">
                  <Input
                    placeholder="******"
                    autoComplete="new-password"
                    className="pr-[40px]"
                    type={passwordVisible.visible ? "text" : "password"}
                    {...field}
                  />
                  <Eye
                    className="absolute right-[10px] top-1/2 -translate-y-1/2 cursor-pointer"
                    onClick={passwordVisible.handleOnClick}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={isPending} type="submit">
          Войти
        </Button>
      </form>
    </Form>
  );
}
