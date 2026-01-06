import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import type { LoginFormValues } from "@/schema/login.schema";
import { loginSchema } from "@/schema/login.schema";
import { useAuthStore } from "@/store/auth.store";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { Eye, EyeOff } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({ resolver: zodResolver(loginSchema) });

  
  const onSubmit = async (data: LoginFormValues) => {
    try{
      setLoginError(null)
      await login(data.email, data.password);
      navigate("/profile", {replace: true});
    } catch (error: any) {
      console.log("Error: ", error);
      const message = error?.response?.data?.message || "Something went wrong please try again";
      setLoginError(message);
    }
  };

  const passwordValue = watch("password");

  return (
    <div className="w-full max-w-sm space-y-6 rounded-md border px-6 pb-12 pt-6 shadow-md">
      <div className="flex justify-center">
        <h1 className="text-2xl font-bold">Login</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            disabled={isSubmitting}
            type="email"
            {...register("email", {
              onChange: () => loginError && setLoginError(null),
            })}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="password">Password</Label>

          <div className="relative">
            <Input
              id="password"
              disabled={isSubmitting}
              type={showPassword ? "text" : "password"}
              {...register("password")}
            />

            {passwordValue && (
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            )}
          </div>

          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        {loginError && (
          <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">
            {loginError}
          </div>
        )}

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Logging in...." : "Login"}
        </Button>
      </form>
    </div>
  );
}
