import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { LoginFormValues } from "@/schema/login.schema";
import { loginSchema } from "@/schema/login.schema";
import { useAuthStore } from "@/store/auth.store";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"

export default function Login() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues> ({resolver: zodResolver(loginSchema),});

  const onSubmit = ( data: LoginFormValues) => {
    login(
      {
        id: "1",
        name: "Akash V",
        email: data.email,
      }
    );
    
    navigate("/profile", {replace: true});
  };

  return (
    <div className="mx-auto mt-20 max-w-sm space-y-6">
      <h1 className="text-2xl font-bold">Login</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" {...register("email")} />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" {...register("password")} />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        <Button type="submit" className="w-full">Login</Button>
      </form>
    </div>
  )
}
