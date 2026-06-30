import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router";

import { ArrowRightIcon, LockIcon, MailIcon } from "lucide-react";
import AILogo from "@/components/ui/ai-logo";

import { AuthField, AuthPasswordField } from "@/components/ui/auth-field";

import { loginSchema, type LoginDataTypes } from "@/schemas/auth/login-schema";

function LoginForm() {
   const navigate = useNavigate();
   const { handleSubmit, control } = useForm<LoginDataTypes>({
      resolver: zodResolver(loginSchema),
      defaultValues: {
         email: "",
         password: "",
      },
      mode: "all",
   });

   const onSubmit = (values: LoginDataTypes) => {
      console.log("Login Form Values", values);
      navigate("/dashboard", { replace: true });
   };

   return (
      <>
         <Link
            className="inline-flex items-center gap-2"
            to={"/"}
         >
            <AILogo />
         </Link>
         <div className="mt-12 space-y-2">
            <h1 className="font-display text-[34px] leading-[1.05] font-semibold tracking-tight">
               Welcome back
            </h1>
            <p className="text-forground-muted mt-2 text-[15px]">
               Sign in to keep sharpening your resume.
            </p>
         </div>
         <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-9 space-y-6"
         >
            <AuthField
               control={control}
               name="email"
               placeholder="jhondev@example.com"
               label="Email"
               icon={MailIcon}
            />
            <AuthPasswordField
               control={control}
               name="password"
               label="Password"
               placeholder="••••••••"
               icon={LockIcon}
            />
            <button
               className="group mt-3 inline-flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-2xl py-2.5 font-semibold text-white duration-300"
               type="submit"
               style={{
                  background: "linear-gradient(135deg, #0a9aa4 0%, #0f7278 50%, #0a484c 100%)",
               }}
            >
               Sign In{" "}
               <ArrowRightIcon
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
               />
            </button>
         </form>
         <p className="text-forground-muted mt-8 text-center text-sm">
            Don't have an account?{" "}
            <Link
               to="/register"
               className="text-accent-strong font-semibold hover:underline"
            >
               Create one
            </Link>
         </p>
      </>
   );
}

export default LoginForm;
