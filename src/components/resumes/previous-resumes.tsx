import { useNavigate } from "react-router";

import { ChevronRightIcon, FileTextIcon, LayersIcon, Trash2Icon } from "lucide-react";

import { relativeTime } from "@/lib/utils";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { mockResumes } from "@/mock/resume";

function PreviousResumes() {
   const [resumes, setResumes] = useState(mockResumes);
   const navigate = useNavigate();

   const handleDelete = (e: React.MouseEvent<HTMLButtonElement>, resumeId: string) => {
      e.stopPropagation();
      setResumes((r) => r.filter(({ _id }) => resumeId !== _id));
   };

   return (
      <div className="flex flex-col gap-4">
         {resumes.map((resume) => (
            <Card
               key={resume._id}
               onClick={() => navigate(`/resume/${resume._id}`)}
               className="flex cursor-pointer items-center gap-2 max-lg:p-4 lg:gap-4"
            >
               <div className="bg-accent-soft text-accent-strong dark:text-forground dark:bg-accent-strong flex size-10 shrink-0 items-center justify-center rounded-2xl sm:size-12">
                  <FileTextIcon className="size-4" />
               </div>

               <div className="min-w-0 flex-1">
                  <h4 className="font-display truncate text-sm font-semibold lg:text-base">
                     {resume.title}
                  </h4>
                  <p className="text-forground-muted mt-0.5 text-[11px]">
                     Updated {relativeTime(resume.updatedAt)}
                  </p>
               </div>

               <Badge
                  tone="neutral"
                  className="gap-1"
               >
                  <LayersIcon size={11} />
                  {resume.versionCount || 1} version
                  {(resume.versionCount || 1) > 1 ? "s" : ""}
               </Badge>

               <button
                  className="text-forground-muted hover:bg-surface-2 hover:text-danger flex size-8 cursor-pointer items-center justify-center rounded-full transition-colors md:size-9"
                  title="Delete"
                  onClick={(e) => handleDelete(e, resume._id)}
               >
                  <Trash2Icon size={15} />
               </button>

               <ChevronRightIcon
                  size={16}
                  className="text-forground-muted hidden xl:inline"
               />
            </Card>
         ))}
      </div>
   );
}

export default PreviousResumes;
