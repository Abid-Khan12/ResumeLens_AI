import PreviousResumes from "@/components/resumes/previous-resumes";
import UploadResume from "@/components/resumes/upload-resume";

function ResumePages() {
   return (
      <section className="flex-1 space-y-5">
         <div>
            <h2 className="font-display text-2xl font-semibold tracking-tight">Your Resumes</h2>
            <p className="text-forground-muted text-sm leading-relaxed">
               Upload a new one or pick up where you left off.
            </p>
         </div>
         <div className="grid grid-cols-1 gap-5 lg:grid-cols-6">
            <div className="lg:col-span-3">
               <UploadResume />
            </div>
            <div className="lg:col-span-3">
               <PreviousResumes />
            </div>
         </div>
      </section>
   );
}

export default ResumePages;
