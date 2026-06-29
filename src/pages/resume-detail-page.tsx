import { mockResumes } from "@/components/resumes/previous-resumes";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn, relativeTime } from "@/lib/utils";
import { ArrowLeftIcon, DownloadIcon, Loader2Icon, SparklesIcon } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { useNavigate, useParams } from "react-router";
import { motion } from "motion/react";
import AtsGauge from "@/components/dashboard/ats-gauge-card";
import ScoreBreakdown from "@/components/analysis/score-breakdown";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BulletRewrites from "@/components/analysis/bullet-rewrites";
import { IssuesList } from "@/components/analysis/issue-list";
import { StrengthsList } from "@/components/analysis/strength-list";
import { KeywordChips } from "@/components/analysis/keyword-chips";

type VersionType = {
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

function ResumeDetailPage() {
   const { id } = useParams<{ id: string }>();
   const navigate = useNavigate();
   const [activeVersionId, setActiveVersionId] = useState("");
   const [tab, setTab] = useState("score");

   const resume = mockResumes.find(({ _id }) => id === _id);

   if (!resume) {
      return <div className="">Resume Not Found</div>;
   }
   const activeVersion = resume.versions.find(({ _id }) => activeVersionId === _id);

   const analysis = mockAnalyses[activeVersionId as keyof typeof mockAnalyses] ?? null;

   useEffect(() => {
      setActiveVersionId(resume.versions[0]._id);
   }, []);

   return (
      <section className="flex-1 space-y-5">
         <div className="flex items-center justify-between gap-2">
            <div>
               <h2 className="font-display text-lg font-semibold tracking-tight sm:text-2xl">
                  {resume.title}
               </h2>
               <p className="text-forground-muted text-xs leading-relaxed sm:text-sm">
                  Updated{" "}
                  {`${relativeTime(resume.updatedAt)} · ${resume.versions.length} version${
                     resume.versions.length > 1 ? "s" : ""
                  }`}
               </p>
            </div>
            <div className="flex flex-wrap items-end justify-end gap-2">
               <Button
                  variant="ghost"
                  size={"sm"}
                  onClick={() => navigate("/resumes")}
               >
                  <ArrowLeftIcon size={14} /> All resumes
               </Button>
               <Button
                  variant="outline"
                  size={"sm"}
                  // onClick={() => navigate(`/resumes/${resume._id}/export`)}
               >
                  <DownloadIcon size={14} /> Export PDF
               </Button>
            </div>
         </div>
         <Card
            padding={"sm"}
            variant={"flat"}
         >
            <CardHeader>
               <div>
                  <CardTitle>Run analysis</CardTitle>
                  <CardDescription className="mt-2">
                     Score this version with Gemini and get issues, strengths, and rewrites.
                  </CardDescription>
               </div>
            </CardHeader>

            <div className="flex w-full flex-wrap items-center justify-between gap-y-4 md:flex-nowrap">
               <VersionSwitcher
                  activeVerionId={activeVersionId}
                  versions={resume.versions}
                  onChange={setActiveVersionId}
               />
               <TargetRoleForm />
            </div>
         </Card>

         {analysis && (
            <>
               <div className="grid grid-cols-1 gap-5 md:grid-cols-12">
                  <div className="col-span-6 lg:col-span-4">
                     <AtsGauge
                        score={analysis.atsScore}
                        delta={0}
                     />
                  </div>
                  <div className="col-span-6 lg:col-span-5">
                     <ScoreBreakdown breakdown={analysis.scoreBreakdown} />
                  </div>
                  <div className="col-span-6 lg:col-span-3">
                     <Card className="flex h-full flex-col">
                        <CardHeader>
                           <div>
                              <CardTitle className="text-base">Verdict</CardTitle>
                              <CardDescription className="mt-1">AI overall summary</CardDescription>
                           </div>
                           <Badge
                              tone="accent"
                              className="shrink-0"
                           >
                              {analysis.model}
                           </Badge>
                        </CardHeader>
                        <p className="text-[13px] leading-relaxed">{analysis.summary}</p>
                     </Card>
                  </div>
               </div>
               <Tabs
                  value={tab}
                  onValueChange={setTab}
               >
                  <TabsList>
                     <TabsTrigger value="score">Issues</TabsTrigger>
                     <TabsTrigger value="strengths">Strengths</TabsTrigger>
                     <TabsTrigger value="keywords">Keywords</TabsTrigger>
                     <TabsTrigger value="rewrites">Rewrites</TabsTrigger>
                  </TabsList>

                  <div className="mt-5 w-full">
                     <TabsContent value="score">
                        <IssuesList issues={analysis.issues} />
                     </TabsContent>
                     <TabsContent value="strengths">
                        <StrengthsList strengths={analysis.strengths} />
                     </TabsContent>
                     <TabsContent value="keywords">
                        <KeywordChips
                           present={analysis.keywordsPresent}
                           missing={analysis.keywordsMissing}
                        />
                     </TabsContent>
                     <TabsContent value="rewrites">
                        <BulletRewrites rewrites={analysis.bulletRewrites} />
                     </TabsContent>
                  </div>
               </Tabs>
            </>
         )}

         {activeVersion && (
            <Card
               variant={"flat"}
               padding={"sm"}
            >
               <CardHeader>
                  <div>
                     <CardTitle className="text-base">
                        Parsed Sections ({activeVersion.label})
                     </CardTitle>
                     <CardDescription className="mt-1">
                        Quick preview of what we extracted from the PDF
                     </CardDescription>
                  </div>
               </CardHeader>
               <ParsedSectionsPreview version={activeVersion} />
            </Card>
         )}
      </section>
   );
}

export default ResumeDetailPage;

function VersionSwitcher({
   versions,
   onChange,
   activeVerionId,
}: {
   versions: VersionType[];
   onChange: (id: string) => void;
   activeVerionId: string;
}) {
   return (
      <div className="bg-surface-2 inline-flex items-center gap-1 rounded-full border p-1">
         {versions.map((v) => (
            <button
               key={v._id}
               onClick={() => onChange(v._id)}
               className={cn(
                  "tabular relative h-8 cursor-pointer rounded-full px-3 text-xs font-medium transition-colors",
                  activeVerionId === v._id
                     ? "text-background"
                     : "text-forground-muted hover:text-forground",
               )}
            >
               {activeVerionId === v._id && (
                  <motion.span
                     layoutId="active-version"
                     className="bg-forground absolute inset-0 rounded-full"
                     transition={{ type: "spring", duration: 0.3, bounce: 0.2 }}
                  />
               )}

               <span className="relative z-10">{v.label}</span>
            </button>
         ))}
      </div>
   );
}

function TargetRoleForm() {
   const [isPending, setIsPending] = useState(false);
   const [targetRole, seTargetRole] = useState("");

   const runAnalyze = async () => {
      try {
         setIsPending(true);
         if (!targetRole) return;

         await new Promise((resolve) => setTimeout(resolve, 2000));

         console.log("Target Role: ", targetRole);

         seTargetRole("");
      } catch (error) {
      } finally {
         setIsPending(false);
      }
   };

   return (
      <div className="flex max-w-130 flex-1 items-center gap-1.5 min-[375px]:min-w-70 sm:gap-3">
         <Input
            placeholder="Target role (optional, e.g. Senior Frontend Engineer)"
            value={targetRole}
            onChange={(e) => seTargetRole(e.target.value)}
         />
         <Button
            variant="accent"
            onClick={runAnalyze}
            disabled={isPending}
            className="shrink-0 max-md:px-4"
         >
            {isPending ? (
               <>
                  <Loader2Icon
                     size={14}
                     className="animate-spin"
                  />{" "}
                  Analyzing…
               </>
            ) : (
               <>
                  <SparklesIcon size={14} /> Analyze
               </>
            )}
         </Button>
      </div>
   );
}

function PreviewLabel({ children }: { children: ReactNode }) {
   return (
      <div className="text-forground-muted mb-2 text-[10px] font-semibold tracking-widest uppercase">
         {children}
      </div>
   );
}

function ParsedSectionsPreview({ version }: { version: VersionType }) {
   const s = version.parsedSections || {};
   const b = s.basics || {};

   const hasBasics = b.name || b.title || b.email;
   const hasLeft = (s.experience?.length ?? 0) > 0 || (s.education?.length ?? 0) > 0;
   const hasRight = (s.skills?.length ?? 0) > 0 || (s.projects?.length ?? 0) > 0;
   const hasFooter =
      (s.certifications?.length ?? 0) > 0 ||
      (s.languages?.length ?? 0) > 0 ||
      (s.interests?.length ?? 0) > 0;

   return (
      <div className="space-y-3 text-sm">
         {/* ── Header: identity ─────────────────────────────────────── */}
         {hasBasics && (
            <Card
               padding={"sm"}
               variant={"flat"}
            >
               <div className="flex flex-wrap items-start justify-between gap-4 min-[426px]:flex-nowrap">
                  <div className="min-w-0">
                     {b.name && (
                        <div className="font-display text-forground text-lg leading-tight font-semibold tracking-tight">
                           {b.name}
                        </div>
                     )}
                     {b.title && (
                        <div className="text-accent mt-0.5 text-sm font-medium">{b.title}</div>
                     )}
                  </div>

                  {/* contact pills */}
                  {(b.email || b.phone || b.location) && (
                     <div className="text-forground-muted grid shrink-0 grid-cols-1 flex-col items-end gap-2 text-xs min-[375px]:grid-cols-2 min-[426px]:flex min-[426px]:gap-1">
                        {b.email && <span>{b.email}</span>}
                        {b.phone && <span>{b.phone}</span>}
                        {b.location && <span>{b.location}</span>}
                     </div>
                  )}
               </div>

               {/* links row */}
               {(b.links || []).length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-x-3 gap-y-2">
                     {(b.links || []).map((l, i) => (
                        <span
                           key={i}
                           className="text-accent-strong text-xs font-medium"
                        >
                           {l.label}
                        </span>
                     ))}
                  </div>
               )}

               {/* summary inline under header */}
               {s.summary && (
                  <p className="text-forground-muted mt-3 border-t pt-3 text-xs leading-relaxed">
                     {s.summary}
                  </p>
               )}
            </Card>
         )}

         {/* ── Summary standalone (if no basics header) ──────────────── */}
         {!hasBasics && s.summary && (
            <Card
               padding={"sm"}
               variant={"flat"}
            >
               <PreviewLabel>Summary</PreviewLabel>
               <p className="text-forground leading-relaxed">{s.summary}</p>
            </Card>
         )}

         {/* ── Main two-column: experience + skills ──────────────────── */}
         {(hasLeft || hasRight) && (
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
               {/* left col: experience → education */}
               <div className="space-y-3">
                  {(s.experience?.length ?? 0) > 0 && (
                     <Card
                        padding={"sm"}
                        variant={"flat"}
                     >
                        <PreviewLabel>Experience ({s.experience.length})</PreviewLabel>
                        <ul className="space-y-3">
                           {s.experience.slice(0, 5).map((e, i) => (
                              <li
                                 key={i}
                                 className="flex items-start justify-between gap-2"
                              >
                                 <div className="min-w-0">
                                    <div className="text-forground truncate leading-snug font-medium">
                                       {e.role}
                                    </div>
                                    {e.company && (
                                       <div className="text-forground-muted text-xs">
                                          {e.company}
                                       </div>
                                    )}
                                 </div>
                                 {e.period && (
                                    <span className="text-forground-muted mt-0.5 shrink-0 text-[11px]">
                                       {e.period}
                                    </span>
                                 )}
                              </li>
                           ))}
                        </ul>
                     </Card>
                  )}

                  {(s.education?.length ?? 0) > 0 && (
                     <Card
                        padding={"sm"}
                        variant={"flat"}
                     >
                        <PreviewLabel>Education ({s.education.length})</PreviewLabel>
                        <ul className="space-y-2.5">
                           {s.education.map((e, i) => (
                              <li key={i}>
                                 <div className="text-forground leading-snug font-medium">
                                    {e.degree}
                                 </div>
                                 {e.school && (
                                    <div className="text-forground-muted text-xs">{e.school}</div>
                                 )}
                              </li>
                           ))}
                        </ul>
                     </Card>
                  )}
               </div>

               {/* right col: skills → projects */}
               <div className="space-y-3">
                  {(s.skills?.length ?? 0) > 0 && (
                     <Card
                        padding={"sm"}
                        variant={"flat"}
                     >
                        <PreviewLabel>Skills ({s.skills.length})</PreviewLabel>
                        <div className="flex flex-wrap gap-1.5">
                           {s.skills.slice(0, 24).map((sk, i) => (
                              <Badge
                                 key={i}
                                 tone="accent"
                              >
                                 {sk}
                              </Badge>
                           ))}
                           {s.skills.length > 24 && (
                              <span className="text-forground-muted self-center text-xs">
                                 +{s.skills.length - 24} more
                              </span>
                           )}
                        </div>
                     </Card>
                  )}

                  {(s.projects?.length ?? 0) > 0 && (
                     <Card
                        padding={"sm"}
                        variant={"flat"}
                     >
                        <PreviewLabel>Projects ({s.projects.length})</PreviewLabel>
                        <ul className="space-y-2.5">
                           {s.projects.slice(0, 5).map((p, i) => (
                              <li key={i}>
                                 <div className="text-forground leading-snug font-medium">
                                    {p.name}
                                 </div>
                                 {p.tech?.length > 0 && (
                                    <div className="text-forground-muted mt-0.5 text-[11px]">
                                       {p.tech.join(" · ")}
                                    </div>
                                 )}
                              </li>
                           ))}
                        </ul>
                     </Card>
                  )}
               </div>
            </div>
         )}

         {/* ── Footer row: certs · languages · interests ─────────────── */}
         {hasFooter && (
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
               {(s.certifications?.length ?? 0) > 0 && (
                  <Card
                     padding={"sm"}
                     variant={"flat"}
                  >
                     <PreviewLabel>Certifications</PreviewLabel>
                     <ul className="space-y-2">
                        {s.certifications.map((c, i) => (
                           <li key={i}>
                              <div className="text-forground text-xs leading-snug font-medium">
                                 {c.name}
                              </div>
                              {c.year && (
                                 <div className="text-forground-muted text-[11px]">{c.year}</div>
                              )}
                           </li>
                        ))}
                     </ul>
                  </Card>
               )}

               {(s.languages?.length ?? 0) > 0 && (
                  <Card
                     padding={"sm"}
                     variant={"flat"}
                  >
                     <PreviewLabel>Languages</PreviewLabel>
                     <div className="flex flex-wrap gap-1">
                        {s.languages.map((l, i) => (
                           <Badge
                              key={i}
                              tone="neutral"
                           >
                              {l}
                           </Badge>
                        ))}
                     </div>
                  </Card>
               )}

               {(s.interests?.length ?? 0) > 0 && (
                  <Card
                     padding={"sm"}
                     variant={"flat"}
                  >
                     <PreviewLabel>Interests</PreviewLabel>
                     <div className="flex flex-wrap gap-1">
                        {s.interests.map((l, i) => (
                           <Badge
                              key={i}
                              tone="neutral"
                           >
                              {l}
                           </Badge>
                        ))}
                     </div>
                  </Card>
               )}
            </div>
         )}
      </div>
   );
}
