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
         { label: "Keywords", value: Math.min(100, atsScore + 4) },
         { label: "Format", value: Math.max(40, atsScore - 12) },
         { label: "Impact", value: Math.min(100, atsScore + 5) },
         { label: "Readability", value: Math.max(50, atsScore - 4) },
         { label: "Action verbs", value: Math.max(50, atsScore - 7) },
      ],
      issues: [
         {
            title: "Weak action verbs in Experience section",
            severity: "high",
            fix: "Swap 'helped', 'worked on', 'was responsible for' for strong verbs like 'shipped', 'led', 'cut'.",
         },
         {
            title: "Missing keywords for target role",
            severity: "high",
            fix: "Add 'GraphQL' and 'Docker' — both appear in the JD but are missing from the resume.",
         },
         {
            title: "Inconsistent date formatting",
            severity: "medium",
            fix: "Use one format throughout (e.g. 'Jan 2024 — Present').",
         },
         {
            title: "First bullet of latest role is too long",
            severity: "low",
            fix: "Cap each bullet at ~20 words. Break the first bullet into two.",
         },
         {
            title: "Education section missing graduation year",
            severity: "low",
            fix: "Add a graduation year to the B.S. entry.",
         },
      ],
      strengths: [
         {
            title: "Quantified outcomes in every senior-role bullet",
            note: "12k+ users, 38% TTI cut, 92s → 11s build.",
         },
         {
            title: "Clean single-column layout",
            note: "Parses perfectly across ATS systems.",
         },
         {
            title: "Strong action verbs in latest role",
            note: "shipped, led, owned — all impact verbs.",
         },
         {
            title: "Domain-relevant skill stack",
            note: "React, TypeScript, Vite — matches JD.",
         },
         {
            title: "Recent certification listed",
            note: "AWS SA-A signals up-to-date credentials.",
         },
      ],
      keywordsPresent: ["React", "TypeScript", "Node.js", "Vite", "Jest", "Playwright", "AWS"],
      keywordsMissing: ["GraphQL", "Docker", "Kubernetes", "Redis"],
      bulletRewrites: [
         {
            _id: "rw_1",
            section: "experience",
            original: "Worked on dashboards for the analytics team.",
            rewritten:
               "Shipped 4 React analytics dashboards adopted by 12k+ daily users — cut load time 38%.",
            rationale: "Quantified outcome + strong verb + named the user-base scale.",
         },
         {
            _id: "rw_2",
            section: "experience",
            original: "Helped migrate the build system.",
            rewritten:
               "Led migration from Webpack to Vite, reducing build times from 92s to 11s across 14 packages.",
            rationale: "Named the technologies + concrete metric + scope.",
         },
         {
            _id: "rw_3",
            section: "experience",
            original: "Was responsible for the design system rewrite.",
            rewritten:
               "Owned design-system rewrite (40+ components, full WCAG AA pass) — adopted by 6 product teams.",
            rationale: "Ownership signal + accessibility detail + adoption proof.",
         },
         {
            _id: "rw_4",
            section: "summary",
            original: "Frontend engineer with several years of experience.",
            rewritten:
               "Frontend engineer with 6+ years shipping production React at consumer scale.",
            rationale: "Specific tenure + 'production' + scale signal.",
         },
      ],
   };
}

export const mockAnalyses = {
   v_1_1: makeAnalysis({
      id: "an_1_1",
      versionId: "v_1_1",
      atsScore: 62,
      summary:
         "Solid foundation but weak verbs and missing keywords pull the score down. Applying the suggested rewrites should land V2 in the high-70s.",
   }),
   v_1_2: makeAnalysis({
      id: "an_1_2",
      versionId: "v_1_2",
      atsScore: 78,
      summary:
         "Big jump from V1 — verbs and metrics are landing. Only the keyword gap (GraphQL, Docker) is holding this back from Excellent tier.",
   }),
   v_1_3: makeAnalysis({
      id: "an_1_3",
      versionId: "v_1_3",
      atsScore: 86,
      summary:
         "Excellent tier. Layout parses cleanly, every senior-role bullet has a quantified outcome, and keyword coverage is now 90%+ of the JD.",
   }),
   v_2_1: makeAnalysis({
      id: "an_2_1",
      versionId: "v_2_1",
      atsScore: 58,
      summary: "Needs work — too many weak verbs, almost no metrics.",
   }),
   v_2_2: makeAnalysis({
      id: "an_2_2",
      versionId: "v_2_2",
      atsScore: 74,
      summary: "Strong rewrite pass — most bullets now quantified.",
   }),
   v_3_1: makeAnalysis({
      id: "an_3_1",
      versionId: "v_3_1",
      atsScore: 71,
      summary: "Decent first pass — biggest wins are in Format and Action Verbs.",
   }),
};
