function makeAnalysis({
   id,
   versionId,
   atsScore,
   summary,
}: {
   id: string;
   versionId: string;
   atsScore: number;
   summary: string;
}) {
   return {
      _id: id,
      versionId,
      atsScore,
      model: "gemini-2.5-flash",
      summary,
      scoreBreakdown: [
         { label: "Keywords", value: Math.min(100, atsScore + 3) },
         { label: "Format", value: Math.max(55, atsScore - 10) },
         { label: "Impact", value: Math.min(100, atsScore + 4) },
         { label: "Readability", value: Math.max(60, atsScore - 3) },
         { label: "Action verbs", value: Math.max(60, atsScore - 6) },
      ],
      issues: [
         {
            title: "Weak or generic action verbs",
            severity: "high",
            fix: "Replace weak verbs like 'worked', 'helped', 'handled' with 'built', 'shipped', 'led'.",
         },
         {
            title: "Missing ATS keywords",
            severity: "high",
            fix: "Add role-specific keywords like Docker, Redis, GraphQL based on job description.",
         },
         {
            title: "Inconsistent date formatting",
            severity: "medium",
            fix: "Use a consistent format like 'Jan 2024 — Present' across all roles.",
         },
         {
            title: "Overlong bullet points",
            severity: "medium",
            fix: "Split long bullets into two concise outcome-focused statements.",
         },
         {
            title: "Limited measurable impact",
            severity: "medium",
            fix: "Add metrics like %, time saved, or user scale to each bullet.",
         },
      ],
      strengths: [
         {
            title: "Clear technical stack alignment",
            note: "React, TypeScript, Node.js match target roles.",
         },
         {
            title: "Good use of quantification in senior roles",
            note: "Some bullets include scale and performance improvements.",
         },
         {
            title: "Readable structure",
            note: "Sections are clean and ATS friendly.",
         },
         {
            title: "Improving action verbs in recent version",
            note: "Later versions show stronger wording consistency.",
         },
         {
            title: "Relevant project work included",
            note: "Projects align with frontend and full-stack roles.",
         },
      ],
      keywordsPresent: [
         "React",
         "TypeScript",
         "Node.js",
         "Vite",
         "Jest",
         "Playwright",
         "AWS",
         "MongoDB",
      ],
      keywordsMissing: ["GraphQL", "Docker", "Kubernetes", "Redis", "CI/CD"],
      bulletRewrites: [
         {
            _id: "rw_1",
            section: "experience",
            original: "Worked on dashboards for the analytics team.",
            rewritten:
               "Shipped 4 analytics dashboards used by 12k+ daily users, improving TTI by 38%.",
            rationale: "Adds scale, outcome, and performance metric.",
         },
         {
            _id: "rw_2",
            section: "experience",
            original: "Helped migrate the build system.",
            rewritten:
               "Led migration from Webpack to Vite, reducing build time from 92s to 11s across 14 packages.",
            rationale: "Ownership + measurable improvement + scope clarity.",
         },
         {
            _id: "rw_3",
            section: "experience",
            original: "Was responsible for the design system rewrite.",
            rewritten:
               "Owned design system rewrite (40+ components) with full WCAG AA compliance, adopted by 6 teams.",
            rationale: "Ownership, accessibility, and adoption signal.",
         },
         {
            _id: "rw_4",
            section: "summary",
            original: "Frontend engineer with several years of experience.",
            rewritten:
               "Frontend engineer with 6+ years shipping production React applications at scale.",
            rationale: "Adds seniority and production context.",
         },
      ],
   };
}

export const mockAnalyses = {
   v_1_1: makeAnalysis({
      id: "an_1_1",
      versionId: "v_1_1",
      atsScore: 68,
      summary: "Early version with solid structure but weak impact and missing ATS keywords.",
   }),

   v_1_2: makeAnalysis({
      id: "an_1_2",
      versionId: "v_1_2",
      atsScore: 82,
      summary: "Strong improvement in clarity and impact. Keyword coverage still incomplete.",
   }),

   v_1_3: makeAnalysis({
      id: "an_1_3",
      versionId: "v_1_3",
      atsScore: 91,
      summary: "Top tier resume. Strong metrics, clean formatting, and high keyword coverage.",
   }),

   v_2_1: makeAnalysis({
      id: "an_2_1",
      versionId: "v_2_1",
      atsScore: 73,
      summary: "Needs stronger verbs and more quantified outcomes.",
   }),

   v_2_2: makeAnalysis({
      id: "an_2_2",
      versionId: "v_2_2",
      atsScore: 88,
      summary: "Well optimized backend profile with strong performance improvements.",
   }),

   v_3_1: makeAnalysis({
      id: "an_3_1",
      versionId: "v_3_1",
      atsScore: 70,
      summary: "Baseline full-stack resume with limited measurable impact.",
   }),
};
