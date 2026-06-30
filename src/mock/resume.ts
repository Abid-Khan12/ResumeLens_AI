import type { ResumeSummary } from "@/types/type";
import { daysAgo, hoursAgo } from "./helper";

export function makeVersion({
   id,
   label,
   score,
   sourceType,
   createdAt,
   basics,
   summary,
   experience,
   skills,
}: {
   id: string;
   label: string;
   score: number;
   sourceType: string;
   createdAt: Date;
   basics: {
      name: string;
      title: string;
      email: string;
      phone: string;
      location: string;
   };
   summary: string;
   experience: any[];
   skills: string[];
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
            ...basics,
            links: [
               { label: "GitHub", url: "#" },
               { label: "LinkedIn", url: "#" },
            ],
         },
         summary,
         experience,
         education: [
            {
               degree: "Bachelor of Computer Science",
               school: "National University",
               period: "2018 - 2022",
            },
         ],
         skills,
         projects: [
            {
               name: "AI Resume Analyzer",
               tech: ["React", "TypeScript", "Express", "MongoDB"],
               summary: "AI-powered resume analysis platform with ATS scoring.",
            },
         ],
         certifications: [
            {
               name: "AWS Certified Cloud Practitioner",
               year: 2025,
            },
         ],
         languages: ["English"],
         interests: ["Open Source", "UI Design", "Reading"],
      },
   };
}

export const mockResumes = [
   {
      _id: "resume_1",
      title: "Frontend Developer Resume",
      createdAt: daysAgo(12),
      updatedAt: hoursAgo(2),
      currentVersionId: "v_1_3",
      bestScore: 91,
      versionCount: 3,
      versions: [
         makeVersion({
            id: "v_1_1",
            label: "V1",
            score: 68,
            sourceType: "upload",
            createdAt: daysAgo(12),
            basics: {
               name: "John Smith",
               title: "Frontend Developer",
               email: "john@example.com",
               phone: "+1 555 123 4567",
               location: "New York, USA",
            },
            summary:
               "Frontend developer with experience building React applications and modern user interfaces.",
            experience: [
               {
                  role: "Frontend Developer",
                  company: "Pixel Labs",
                  period: "2023 - Present",
                  bullets: [
                     "Built reusable React components.",
                     "Improved Lighthouse score from 72 to 95.",
                  ],
               },
            ],
            skills: ["React", "TypeScript", "Tailwind CSS", "Next.js", "Redux"],
         }),
         makeVersion({
            id: "v_1_2",
            label: "V2",
            score: 82,
            sourceType: "rewrite",
            createdAt: daysAgo(4),
            basics: {
               name: "John Smith",
               title: "Frontend Developer",
               email: "john@example.com",
               phone: "+1 555 123 4567",
               location: "New York, USA",
            },
            summary:
               "Frontend developer specializing in scalable React applications with strong performance optimization skills.",
            experience: [
               {
                  role: "Frontend Developer",
                  company: "Pixel Labs",
                  period: "2023 - Present",
                  bullets: [
                     "Reduced bundle size by 35%.",
                     "Built responsive dashboards using React and Tailwind CSS.",
                  ],
               },
            ],
            skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Redux", "Jest"],
         }),
         makeVersion({
            id: "v_1_3",
            label: "V3",
            score: 91,
            sourceType: "rewrite",
            createdAt: hoursAgo(2),
            basics: {
               name: "John Smith",
               title: "Senior Frontend Developer",
               email: "john@example.com",
               phone: "+1 555 123 4567",
               location: "New York, USA",
            },
            summary:
               "Senior Frontend Developer with expertise in React, Next.js, accessibility, and performance optimization.",
            experience: [
               {
                  role: "Senior Frontend Developer",
                  company: "Pixel Labs",
                  period: "2023 - Present",
                  bullets: [
                     "Improved Core Web Vitals by 42%.",
                     "Led migration to Next.js App Router.",
                     "Developed reusable component library.",
                  ],
               },
            ],
            skills: [
               "React",
               "Next.js",
               "TypeScript",
               "Tailwind CSS",
               "React Query",
               "Redux Toolkit",
               "Jest",
               "Cypress",
            ],
         }),
      ],
   },

   {
      _id: "resume_2",
      title: "Backend Engineer Resume",
      createdAt: daysAgo(24),
      updatedAt: daysAgo(6),
      currentVersionId: "v_2_2",
      bestScore: 88,
      versionCount: 2,
      versions: [
         makeVersion({
            id: "v_2_1",
            label: "V1",
            score: 73,
            sourceType: "upload",
            createdAt: daysAgo(24),
            basics: {
               name: "Sarah Wilson",
               title: "Backend Engineer",
               email: "sarah@example.com",
               phone: "+1 555 222 4444",
               location: "Austin, USA",
            },
            summary: "Backend engineer experienced with Node.js and REST APIs.",
            experience: [
               {
                  role: "Backend Engineer",
                  company: "CloudStack",
                  period: "2022 - Present",
                  bullets: [
                     "Developed REST APIs using Express.",
                     "Integrated MongoDB for data storage.",
                  ],
               },
            ],
            skills: ["Node.js", "Express", "MongoDB", "Redis"],
         }),
         makeVersion({
            id: "v_2_2",
            label: "V2",
            score: 88,
            sourceType: "rewrite",
            createdAt: daysAgo(6),
            basics: {
               name: "Sarah Wilson",
               title: "Backend Engineer",
               email: "sarah@example.com",
               phone: "+1 555 222 4444",
               location: "Austin, USA",
            },
            summary: "Backend engineer building scalable APIs with Node.js, Redis, and Docker.",
            experience: [
               {
                  role: "Backend Engineer",
                  company: "CloudStack",
                  period: "2022 - Present",
                  bullets: [
                     "Reduced API latency by 40% using Redis caching.",
                     "Designed scalable authentication services.",
                  ],
               },
            ],
            skills: ["Node.js", "Express", "TypeScript", "MongoDB", "Redis", "Docker"],
         }),
      ],
   },

   {
      _id: "resume_3",
      title: "Full Stack Developer Resume",
      createdAt: daysAgo(38),
      updatedAt: daysAgo(15),
      currentVersionId: "v_3_2",
      bestScore: 84,
      versionCount: 2,
      versions: [
         makeVersion({
            id: "v_3_1",
            label: "V1",
            score: 70,
            sourceType: "upload",
            createdAt: daysAgo(38),
            basics: {
               name: "Michael Brown",
               title: "Full Stack Developer",
               email: "michael@example.com",
               phone: "+1 555 777 8888",
               location: "Seattle, USA",
            },
            summary: "Full stack developer building MERN applications.",
            experience: [
               {
                  role: "Full Stack Developer",
                  company: "DevCore",
                  period: "2021 - Present",
                  bullets: ["Built internal dashboards.", "Created REST APIs with Express."],
               },
            ],
            skills: ["React", "Node.js", "MongoDB", "Express"],
         }),
         makeVersion({
            id: "v_3_2",
            label: "V2",
            score: 84,
            sourceType: "rewrite",
            createdAt: daysAgo(15),
            basics: {
               name: "Michael Brown",
               title: "Full Stack Developer",
               email: "michael@example.com",
               phone: "+1 555 777 8888",
               location: "Seattle, USA",
            },
            summary: "Full Stack Developer delivering scalable MERN applications with TypeScript.",
            experience: [
               {
                  role: "Full Stack Developer",
                  company: "DevCore",
                  period: "2021 - Present",
                  bullets: [
                     "Built full-stack SaaS products.",
                     "Implemented authentication and payment integration.",
                  ],
               },
            ],
            skills: ["React", "Next.js", "Node.js", "Express", "MongoDB", "TypeScript"],
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
