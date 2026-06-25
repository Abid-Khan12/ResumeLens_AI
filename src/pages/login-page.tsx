import LoginForm from "@/components/auth/login-form";
import AuthShell from "@/components/auth/auth-shell";

function LoginPage() {
   return (
      <AuthShell
         headline={
            <>
               Sharpen your resume,
               <br />
               <em className="italic">with intelligence.</em>
            </>
         }
         subhead="Score against ATS, fix weak bullets, and ship a stronger version of yourself in minutes."
      >
         <LoginForm />
      </AuthShell>
   );
}

export default LoginPage;
