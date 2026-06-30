import { GaugeIcon, KeyRoundIcon, LayersIcon, LightbulbIcon } from "lucide-react";
import { daysAgo, hoursAgo, minutesAgo } from "./helper";

export const statCardData = {
   atsScore: {
      value: 91,
      delta: 9,
      spark: [{ v: 68 }, { v: 72 }, { v: 76 }, { v: 82 }, { v: 86 }, { v: 89 }, { v: 91 }],
      icon: GaugeIcon,
   },

   versions: {
      value: 3,
      spark: [{ v: 1 }, { v: 1 }, { v: 2 }, { v: 2 }, { v: 3 }, { v: 3 }, { v: 3 }],
      icon: LayersIcon,
   },

   issuesIdentified: {
      value: 5,
      delta: -15,
      spark: [{ v: 20 }, { v: 17 }, { v: 13 }, { v: 10 }, { v: 8 }, { v: 6 }, { v: 5 }],
      icon: LightbulbIcon,
   },

   keywordsMatched: {
      value: 29,
      total: 30,
      delta: 11,
      spark: [{ v: 14 }, { v: 17 }, { v: 20 }, { v: 23 }, { v: 26 }, { v: 28 }, { v: 29 }],
      icon: KeyRoundIcon,
   },
};

export const scoreSeries = [
   { label: "V1", score: 68 },
   { label: "V2", score: 82 },
   { label: "V3", score: 91 },
];

export const totals = {
   resumes: 8,
   rewrites: 31,
   analyses: 47,
};

export const profileStats = [
   { label: "Resumes", value: totals.resumes },
   { label: "Rewrites", value: totals.rewrites },
   { label: "Analyses", value: totals.analyses },
];

export const versionStack = [
   {
      id: "v_1_1",
      label: "V1",
      title: "Original Upload",
      score: 68,
   },
   {
      id: "v_1_2",
      label: "V2",
      title: "AI Rewrite",
      score: 82,
   },
   {
      id: "v_1_3",
      label: "V3",
      title: "Final Optimized",
      score: 91,
   },
];

export const activity = [
   {
      id: "a1",
      type: "analyze",
      title: "Analysis completed",
      subtitle: "ATS score improved to 91 / 100",
      label: "+9 pts",
      at: minutesAgo(6),
      resumeId: "resume_1",
   },
   {
      id: "a2",
      type: "rewrite",
      title: "6 experience bullets optimized",
      subtitle: "Action verbs and keywords improved",
      label: "V3 created",
      at: minutesAgo(22),
      resumeId: "resume_1",
   },
   {
      id: "a3",
      type: "analyze",
      title: "Analysis completed",
      subtitle: "ATS score 82 / 100",
      label: "+14 pts",
      at: hoursAgo(3),
      resumeId: "resume_1",
   },
   {
      id: "a4",
      type: "upload",
      title: "Frontend_Developer_Resume.pdf uploaded",
      subtitle: "Parsed 7 sections and 24 bullet points",
      label: "V1",
      at: daysAgo(2),
      resumeId: "resume_1",
   },
   {
      id: "a5",
      type: "rewrite",
      title: "Skills section optimized",
      subtitle: "Added ATS keywords for React and TypeScript",
      label: "V2 created",
      at: daysAgo(5),
      resumeId: "resume_2",
   },
   {
      id: "a6",
      type: "analyze",
      title: "Analysis completed",
      subtitle: "ATS score 88 / 100",
      label: "+11 pts",
      at: daysAgo(6),
      resumeId: "resume_2",
   },
   {
      id: "a7",
      type: "upload",
      title: "Backend_Engineer_Resume.pdf uploaded",
      subtitle: "Parsed 6 sections and 19 bullet points",
      label: "V1",
      at: daysAgo(9),
      resumeId: "resume_2",
   },
];

export const user = {
   _id: "user_1",
   name: "User",
   email: "User@gmail.com",
   createdAt: daysAgo(45),
};

export const latestResume = {
   _id: "resume_1",
   title: "Frontend Developer Resume",
};
