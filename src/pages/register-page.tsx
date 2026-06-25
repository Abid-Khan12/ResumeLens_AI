import AuthShell from "@/components/auth/auth-shell";
import RegisterFrom from "@/components/auth/register-form";

function RegisterPage() {
   return (
      <AuthShell
         headline={
            <>
               Your resume,
               <br />
               <em className="italic">intelligently sharpened.</em>
            </>
         }
         subhead="Drop your PDF, get an ATS score, fix what's weak, and land interviews — powered by AI."
      >
         <RegisterFrom />
      </AuthShell>
   );
}

export default RegisterPage;
