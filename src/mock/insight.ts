import type { InsightsData } from "@/types/type";
import { daysAgo, hoursAgo } from "./helper";

export const mockInsights: InsightsData = {
   averageScore: 84,
   bestScore: {
      value: 91,
      resumeId: "resume_1",
      resumeTitle: "Frontend Developer Resume",
   },
   totalAnalyses: 47,

   scoreTrend: [
      { score: 68, at: daysAgo(12), resumeTitle: "Frontend Developer Resume" },
      { score: 73, at: daysAgo(24), resumeTitle: "Backend Engineer Resume" },
      { score: 70, at: daysAgo(38), resumeTitle: "Full Stack Developer Resume" },
      { score: 82, at: daysAgo(4), resumeTitle: "Frontend Developer Resume" },
      { score: 84, at: daysAgo(15), resumeTitle: "Full Stack Developer Resume" },
      { score: 88, at: daysAgo(6), resumeTitle: "Backend Engineer Resume" },
      { score: 91, at: hoursAgo(2), resumeTitle: "Frontend Developer Resume" },
   ],

   topIssues: [
      { title: "Missing measurable achievements", severity: "high", count: 15 },
      { title: "Missing ATS keywords", severity: "high", count: 12 },
      { title: "Weak professional summary", severity: "medium", count: 9 },
      { title: "Bullets too generic", severity: "medium", count: 7 },
      { title: "Inconsistent formatting", severity: "low", count: 5 },
   ],

   topMissingKeywords: [
      { keyword: "Docker", count: 11 },
      { keyword: "Redis", count: 9 },
      { keyword: "GraphQL", count: 8 },
      { keyword: "Kubernetes", count: 7 },
      { keyword: "CI/CD", count: 6 },
   ],

   topPresentKeywords: [
      { keyword: "React", count: 24 },
      { keyword: "TypeScript", count: 22 },
      { keyword: "Node.js", count: 19 },
      { keyword: "MongoDB", count: 16 },
      { keyword: "Tailwind CSS", count: 14 },
   ],

   resumePerformance: [
      {
         resumeId: "resume_1",
         title: "Frontend Developer Resume",
         latestScore: 91,
         bestScore: 91,
         improvement: 23,
         analysesCount: 18,
      },
      {
         resumeId: "resume_2",
         title: "Backend Engineer Resume",
         latestScore: 88,
         bestScore: 88,
         improvement: 15,
         analysesCount: 15,
      },
      {
         resumeId: "resume_3",
         title: "Full Stack Developer Resume",
         latestScore: 84,
         bestScore: 84,
         improvement: 14,
         analysesCount: 14,
      },
   ],
};
