import type { AllVersionsData } from "@/types/type";
import { daysAgo, hoursAgo } from "./helper";

export const mockAllVersions: AllVersionsData = {
   totals: { all: 9, uploads: 3, rewrites: 6 },
   versions: [
      {
         id: "v_1_3",
         label: "V3",
         resumeId: "resume_1",
         resumeTitle: "Frontend Developer",
         sourceType: "rewrite",
         score: 91,
         createdAt: hoursAgo(2),
      },
      {
         id: "v_1_2",
         label: "V2",
         resumeId: "resume_1",
         resumeTitle: "Frontend Developer",
         sourceType: "rewrite",
         score: 82,
         createdAt: daysAgo(4),
      },
      {
         id: "v_1_1",
         label: "V1",
         resumeId: "resume_1",
         resumeTitle: "Frontend Developer",
         sourceType: "upload",
         score: 68,
         createdAt: daysAgo(12),
      },

      {
         id: "v_2_2",
         label: "V2",
         resumeId: "resume_2",
         resumeTitle: "Backend Engineer",
         sourceType: "rewrite",
         score: 88,
         createdAt: daysAgo(6),
      },
      {
         id: "v_2_1",
         label: "V1",
         resumeId: "resume_2",
         resumeTitle: "Backend Engineer",
         sourceType: "upload",
         score: 73,
         createdAt: daysAgo(24),
      },

      {
         id: "v_3_2",
         label: "V2",
         resumeId: "resume_3",
         resumeTitle: "Full Stack Developer",
         sourceType: "rewrite",
         score: 84,
         createdAt: daysAgo(15),
      },
      {
         id: "v_3_1",
         label: "V1",
         resumeId: "resume_3",
         resumeTitle: "Full Stack Developer",
         sourceType: "upload",
         score: 70,
         createdAt: daysAgo(38),
      },
   ],
};
