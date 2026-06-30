import type { InsightsData } from "@/types/type";
import { daysAgo, hoursAgo } from "./helper";

export const mockInsights: InsightsData = {
   averageScore: 73,
   bestScore: { value: 86, resumeId: "resume_1", resumeTitle: "Senior Frontend Engineer — Stripe" },
   totalAnalyses: 12,
   scoreTrend: [
      { score: 58, at: daysAgo(34), resumeTitle: "Vercel" },
      { score: 62, at: daysAgo(20), resumeTitle: "Stripe" },
      { score: 71, at: daysAgo(60), resumeTitle: "Notion" },
      { score: 74, at: daysAgo(3), resumeTitle: "Vercel" },
      { score: 78, at: daysAgo(8), resumeTitle: "Stripe" },
      { score: 82, at: daysAgo(2), resumeTitle: "Stripe" },
      { score: 86, at: hoursAgo(2), resumeTitle: "Stripe" },
   ],
   topIssues: [
      { title: "Weak action verbs", severity: "high", count: 8 },
      { title: "Missing keywords for target role", severity: "high", count: 6 },
      { title: "Inconsistent date formatting", severity: "medium", count: 5 },
      { title: "Bullets too long", severity: "low", count: 4 },
      { title: "No quantified outcomes", severity: "high", count: 3 },
   ],
   topMissingKeywords: [
      { keyword: "GraphQL", count: 7 },
      { keyword: "Docker", count: 6 },
      { keyword: "Kubernetes", count: 4 },
      { keyword: "Redis", count: 3 },
      { keyword: "PostgreSQL", count: 2 },
   ],
   topPresentKeywords: [
      { keyword: "React", count: 12 },
      { keyword: "TypeScript", count: 11 },
      { keyword: "Node.js", count: 9 },
      { keyword: "AWS", count: 7 },
      { keyword: "Vite", count: 5 },
   ],
   resumePerformance: [
      {
         resumeId: "resume_1",
         title: "Senior Frontend — Stripe",
         latestScore: 86,
         bestScore: 86,
         improvement: 24,
         analysesCount: 5,
      },
      {
         resumeId: "resume_2",
         title: "Full-Stack — Vercel",
         latestScore: 74,
         bestScore: 74,
         improvement: 16,
         analysesCount: 4,
      },
      {
         resumeId: "resume_3",
         title: "React — Notion",
         latestScore: 71,
         bestScore: 71,
         improvement: 0,
         analysesCount: 3,
      },
   ],
};
