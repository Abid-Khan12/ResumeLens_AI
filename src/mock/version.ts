import type { AllVersionsData } from "@/types/type";
import { daysAgo, hoursAgo } from "./helper";

export const mockAllVersions: AllVersionsData = {
   totals: { all: 6, uploads: 3, rewrites: 3 },
   versions: [
      {
         id: "v_1_3",
         label: "V3",
         resumeId: "resume_1",
         resumeTitle: "Stripe",
         sourceType: "rewrite",
         score: 86,
         createdAt: hoursAgo(2),
      },
      {
         id: "v_2_2",
         label: "V2",
         resumeId: "resume_2",
         resumeTitle: "Vercel",
         sourceType: "rewrite",
         score: 74,
         createdAt: daysAgo(3),
      },
      {
         id: "v_1_2",
         label: "V2",
         resumeId: "resume_1",
         resumeTitle: "Stripe",
         sourceType: "rewrite",
         score: 78,
         createdAt: daysAgo(8),
      },
      {
         id: "v_1_1",
         label: "V1",
         resumeId: "resume_1",
         resumeTitle: "Stripe",
         sourceType: "upload",
         score: 62,
         createdAt: daysAgo(20),
      },
      {
         id: "v_2_1",
         label: "V1",
         resumeId: "resume_2",
         resumeTitle: "Vercel",
         sourceType: "upload",
         score: 58,
         createdAt: daysAgo(34),
      },
      {
         id: "v_3_1",
         label: "V1",
         resumeId: "resume_3",
         resumeTitle: "Notion",
         sourceType: "upload",
         score: 71,
         createdAt: daysAgo(60),
      },
   ],
};
