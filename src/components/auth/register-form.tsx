import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router";

import { ArrowRightIcon, LockIcon, MailIcon, User } from "lucide-react";
import AILogo from "@/components/ui/ai-logo";

import { AuthField, AuthPasswordField } from "@/components/ui/auth-field";

import { registerSchema, type RegisterDataTypes } from "@/schemas/auth/register-schema";

function RegisterFrom() {
   const { handleSubmit, control } = useForm<RegisterDataTypes>({
      resolver: zodResolver(registerSchema),
      defaultValues: {
         fullName: "",
         email: "",
         password: "",
      },
      mode: "all",
   });

   const onSubmit = (values: RegisterDataTypes) => {
      console.log("Login Form Values", values);
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
               Get started
            </h1>
            <p className="text-forground-muted mt-2 text-[15px]">
               Free to start. No credit card required.
            </p>
         </div>
         <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-6 space-y-6"
         >
            <AuthField
               control={control}
               name="fullName"
               placeholder="jhon Dev"
               label="Full name"
               icon={User}
            />
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
               className="group mt-3 inline-flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-2xl bg-teal-700 py-2.5 font-semibold text-white duration-300"
               type="submit"
            >
               Create Account{" "}
               <ArrowRightIcon
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
               />
            </button>
         </form>
         <p className="text-forground-muted mt-4 text-center text-sm">
            Don't have an account?{" "}
            <Link
               to="/login"
               className="text-accent-strong font-semibold hover:underline"
            >
               Sign in
            </Link>
         </p>
         <p className="text-forground-muted/80 mt-4 text-center text-[11px] leading-relaxed">
            By creating an account you agree to our terms.
            <br />
            We never share your resume data with third parties.
         </p>
      </>
   );
}

export default RegisterFrom;
