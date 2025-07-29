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
import { useRegister } from "../model/use-register";
import { useConfirmPasswordVisible, useVisible } from "@/shared/lib/react";

const registerSchema = z
  .object({
    email: z.email("Неверный формат email"),
    password: z
      .string({ message: "Введите пароль" })
      .min(6, { message: "Пароль должен быть не менее 6 символов" })
      .refine((value) => !/\s/.test(value), {
        message: "Пароль не должен содержать пробелы",
      }),
    confirmPassword: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Пароли должны совпадать",
  });

export function RegisterForm() {
  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { isPending, register } = useRegister();

  const onSubmit = form.handleSubmit(register);

  const passwordVisible = useVisible(false);
  const confirmPasswordVisible = useConfirmPasswordVisible(false);

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
                    type={passwordVisible.visible ? "text" : "password"}
                    autoComplete="new-password"
                    className="pr-[40px]"
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
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Подтвердите пароль</FormLabel>
              <FormControl>
                <div className="relative inline-block">
                  <Input
                    placeholder="******"
                    type={confirmPasswordVisible.visible ? "text" : "password"}
                    className="pr-[40px]"
                    autoComplete="new-password"
                    {...field}
                  />
                  <Eye
                    className="absolute right-[10px] top-1/2 -translate-y-1/2 cursor-pointer"
                    onClick={confirmPasswordVisible.handleOnClick}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isPending} type="submit">
          Зарегистрироваться
        </Button>
      </form>
    </Form>
  );
}
