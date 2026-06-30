import type { ResumeSummary } from "@/types/type";
import { daysAgo, hoursAgo } from "./helper";

export function makeVersion({
   id,
   label,
   score,
   sourceType,
   createdAt,
}: {
   id: string;
   label: string;
   score: number;
   sourceType: string;
   createdAt: Date;
}) {
   return {
      _id: id,
      label,
      sourceType,
      createdAt,
      score,
      rawText: "—",
      parsedSections: {
         basics: {
            name: "Alex Carter",
            title: "Senior Frontend Engineer",
            email: "alex@timetoprogram.com",
            phone: "+1 (415) 555-0123",
            location: "San Francisco, CA",
            links: [
               { label: "github.com/alex", url: "#" },
               { label: "linkedin.com/in/alex", url: "#" },
            ],
         },
         summary:
            "Frontend engineer with 6+ years building production React apps at consumer-scale. Shipped 4 analytics dashboards adopted by 12k+ daily users.",
         experience: [
            {
               role: "Senior Frontend Engineer",
               company: "Acme Analytics",
               period: "2023 — Present",
               bullets: [
                  "Shipped 4 React dashboards adopted by 12k+ daily users; cut TTI 38%.",
                  "Led migration from Webpack to Vite — build times down from 92s to 11s.",
                  "Owned the design-system rewrite (40+ components, full a11y pass).",
               ],
            },
            {
               role: "Frontend Engineer",
               company: "Northwind",
               period: "2020 — 2023",
               bullets: [
                  "Built the customer-facing billing portal handling $4.2M/mo in transactions.",
                  "Reduced p95 page load from 3.1s to 0.9s via code-split + image pipeline.",
               ],
            },
         ],
         education: [
            {
               degree: "B.S. Computer Science",
               school: "UC Berkeley",
               period: "2016 — 2020",
            },
         ],
         skills: [
            "React",
            "TypeScript",
            "Node.js",
            "GraphQL",
            "Tailwind",
            "Vite",
            "Jest",
            "Playwright",
            "AWS",
            "PostgreSQL",
         ],
         projects: [
            {
               name: "OSS Recharts plugin",
               tech: ["TypeScript", "Recharts"],
               summary: "Open-source plugin for animated stacked area charts. 1.2k★.",
            },
         ],
         certifications: [{ name: "AWS Solutions Architect — Associate", year: 2024 }],
         languages: ["English", "Spanish"],
         interests: ["Trail running", "Open source", "Photography"],
      },
   };
}

export const mockResumes = [
   {
      _id: "resume_1",
      title: "Senior Frontend Engineer — Stripe",
      createdAt: daysAgo(20),
      updatedAt: hoursAgo(2),
      currentVersionId: "v_1_3",
      bestScore: 86,
      versionCount: 3,
      versions: [
         makeVersion({
            id: "v_1_1",
            label: "V1",
            score: 62,
            sourceType: "upload",
            createdAt: daysAgo(20),
         }),
         makeVersion({
            id: "v_1_2",
            label: "V2",
            score: 78,
            sourceType: "rewrite",
            createdAt: daysAgo(8),
         }),
         makeVersion({
            id: "v_1_3",
            label: "V3",
            score: 86,
            sourceType: "rewrite",
            createdAt: hoursAgo(2),
         }),
      ],
   },
   {
      _id: "resume_2",
      title: "Full-Stack Engineer — Vercel",
      createdAt: daysAgo(34),
      updatedAt: daysAgo(3),
      currentVersionId: "v_2_2",
      bestScore: 74,
      versionCount: 2,
      versions: [
         makeVersion({
            id: "v_2_1",
            label: "V1",
            score: 58,
            sourceType: "upload",
            createdAt: daysAgo(34),
         }),
         makeVersion({
            id: "v_2_2",
            label: "V2",
            score: 74,
            sourceType: "rewrite",
            createdAt: daysAgo(3),
         }),
      ],
   },
   {
      _id: "resume_3",
      title: "React Engineer — Notion",
      createdAt: daysAgo(60),
      updatedAt: daysAgo(40),
      currentVersionId: "v_3_1",
      bestScore: 71,
      versionCount: 1,
      versions: [
         makeVersion({
            id: "v_3_1",
            label: "V1",
            score: 71,
            sourceType: "upload",
            createdAt: daysAgo(60),
         }),
      ],
   },
];

export function listMockResumesShallow(): ResumeSummary[] {
   return mockResumes.map((r) => ({
      _id: r._id,
      title: r.title,
      createdAt: r.createdAt,
      updatedAt: r.updatedAt,
      versionCount: r.versionCount,
      bestScore: r.bestScore,
   }));
}
