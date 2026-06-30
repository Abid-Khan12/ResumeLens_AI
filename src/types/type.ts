import type { activity, latestResume, profileStats, user, versionStack } from "@/mock/dashboard";

export type User = typeof user;
export type ProfileStats = typeof profileStats;
export type VersionStack = typeof versionStack;
export type LatestResume = typeof latestResume;
export type Activity = typeof activity;

export type VersionType = {
   _id: string;
   label: string;
   sourceType: string;
   createdAt: Date;
   score: number;
   rawText: string;
   parsedSections: {
      basics: {
         name: string;
         title: string;
         email: string;
         phone: string;
         location: string;
         links: {
            label: string;
            url: string;
         }[];
      };
      summary: string;
      experience: {
         role: string;
         company: string;
         period: string;
         bullets: string[];
      }[];
      education: {
         degree: string;
         school: string;
         period: string;
      }[];
      skills: string[];
      projects: {
         name: string;
         tech: string[];
         summary: string;
      }[];
      certifications: {
         name: string;
         year: number;
      }[];
      languages: string[];
      interests: string[];
   };
};

export type Severity = "low" | "medium" | "high";

interface TrendPoint {
   score: number;
   at: Date;
   resumeTitle: string;
}

interface TopIssue {
   title: string;
   severity: Severity;
   count: number;
}

interface KeywordCount {
   keyword: string;
   count: number;
}

interface ResumePerformance {
   resumeId: string;
   title: string;
   latestScore: number;
   bestScore: number;
   improvement: number;
   analysesCount: number;
}

export interface InsightsData {
   averageScore: number;
   bestScore: { value: number; resumeId: string; resumeTitle: string };
   totalAnalyses: number;
   scoreTrend: TrendPoint[];
   topIssues: TopIssue[];
   topMissingKeywords: KeywordCount[];
   topPresentKeywords: KeywordCount[];
   resumePerformance: ResumePerformance[];
}

export interface ResumeSummary {
   _id: string;
   title: string;
   createdAt: Date;
   updatedAt: Date;
   versionCount: number;
   bestScore: number | null;
}

export type EventType = "upload" | "analyze" | "rewrite";
export type FilterKey = "all" | EventType;

export interface HistoryEvent {
   id: string;
   type: EventType;
   title: string;
   subtitle: string;
   label: string;
   at: Date;
   resumeId: string;
}

export interface HistoryData {
   totals: Record<FilterKey, number>;
   events: HistoryEvent[];
}

export type SourceType = "upload" | "rewrite";

export interface Version {
   id: string;
   label: string;
   resumeId: string;
   resumeTitle: string;
   sourceType: SourceType;
   score: number | null;
   createdAt: Date;
}

export interface AllVersionsData {
   totals: { all: number; uploads: number; rewrites: number };
   versions: Version[];
}
