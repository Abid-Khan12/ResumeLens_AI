import ActivityFeed from "@/components/dashboard/activityfeed-card";
import AtsGauge from "@/components/dashboard/ats-gauge-card";
import ProfileCard from "@/components/dashboard/profile-card";
import ScoreEvolutionChart from "@/components/dashboard/score-evolution-chart";
import StatCard from "@/components/dashboard/stat-card";
import VersionStack from "@/components/dashboard/version-stack-card";
import { GaugeIcon, KeyRoundIcon, LayersIcon, LightbulbIcon } from "lucide-react";

function daysAgo(days: number): Date {
   const date = new Date();
   date.setDate(date.getDate() - days);
   return date;
}

function minutesAgo(minutes: number): Date {
   const date = new Date();
   date.setMinutes(date.getMinutes() - minutes);
   return date;
}

const statCardData = {
   atsScore: {
      value: 86,
      delta: 18,
      spark: [{ v: 62 }, { v: 65 }, { v: 70 }, { v: 78 }, { v: 82 }, { v: 84 }, { v: 86 }],
      icon: GaugeIcon,
   },
   versions: {
      value: 6,
      spark: [{ v: 1 }, { v: 2 }, { v: 3 }, { v: 4 }, { v: 5 }, { v: 5 }, { v: 6 }],
      icon: LayersIcon,
   },
   issuesIdentified: {
      value: 14,
      delta: -32,
      spark: [{ v: 20 }, { v: 18 }, { v: 16 }, { v: 14 }, { v: 12 }, { v: 14 }, { v: 14 }],
      icon: LightbulbIcon,
   },
   keywordsMatched: {
      value: 24,
      total: 26,
      delta: 12,
      spark: [{ v: 12 }, { v: 14 }, { v: 17 }, { v: 19 }, { v: 21 }, { v: 23 }, { v: 24 }],
      icon: KeyRoundIcon,
   },
};

const scoreSeries = [
   { label: "V1", score: 62 },
   { label: "V2", score: 78 },
   { label: "V3", score: 86 },
];

const totals = { resumes: 3, rewrites: 9, analyses: 12 };

const profileStats = [
   { label: "Resumes", value: totals.resumes },
   { label: "Rewrites", value: totals.rewrites },
   { label: "Analyses", value: totals.analyses },
];

const versionStack = [
   { id: "v_1_1", label: "V1", title: "Upload", score: 62 },
   { id: "v_1_2", label: "V2", title: "Rewrite pass", score: 78 },
   { id: "v_1_3", label: "V3", title: "Rewrite pass", score: 86 },
];

const activity = [
   {
      id: "a1",
      type: "analyze",
      title: "Analysis complete on V3",
      subtitle: "ATS score 86 / 100",
      label: "+8 pts",
      at: minutesAgo(4),
      resumeId: "resume_1",
   },
   {
      id: "a2",
      type: "rewrite",
      title: "4 bullets rewritten",
      subtitle: "Applied to Experience section",
      label: "V3 created",
      at: minutesAgo(28),
      resumeId: "resume_1",
   },
   {
      id: "a3",
      type: "analyze",
      title: "Analysis complete on V2",
      subtitle: "ATS score 78 / 100",
      label: "+16 pts",
      at: daysAgo(8),
      resumeId: "resume_1",
   },
   {
      id: "a4",
      type: "upload",
      title: "Senior_Frontend_Stripe.pdf uploaded",
      subtitle: "Parsed 6 sections, 18 bullets",
      label: "V1",
      at: daysAgo(20),
      resumeId: "resume_1",
   },
   {
      id: "a5",
      type: "rewrite",
      title: "3 bullets rewritten",
      subtitle: "Vercel resume",
      label: "V2 created",
      at: daysAgo(3),
      resumeId: "resume_2",
   },
];

export const user = {
   _id: "user_1",
   name: "Abid Khan",
   email: "Abid_Khan@gmail.com",
   createdAt: daysAgo(45),
};

const latestResume = { _id: "resume_1", title: "Senior Frontend Engineer — Stripe" };

export type User = typeof user;
export type ProfileStats = typeof profileStats;
export type VersionStack = typeof versionStack;
export type LatestResume = typeof latestResume;
export type Activity = typeof activity;

function DashboardPage() {
   const { atsScore, issuesIdentified, keywordsMatched, versions } = statCardData;

   const current = atsScore.value;
   const first = scoreSeries[0].score;
   const evolutionDelta = current != null && first != null ? current - first : 0;

   return (
      <section className="flex flex-1 flex-col gap-5">
         <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
               label="ATS Score"
               icon={atsScore.icon}
               delta={atsScore.delta}
               value={atsScore.value}
               data={atsScore.spark}
               chart="bars"
               suffix={atsScore.value ? "/100" : ""}
            />
            <StatCard
               label="Versions"
               data={versions.spark}
               value={versions.value}
               chart="line"
               icon={versions.icon}
            />
            <StatCard
               data={issuesIdentified.spark}
               value={issuesIdentified.value}
               delta={issuesIdentified.delta}
               label="Issues Identified"
               chart="line"
               icon={issuesIdentified.icon}
            />
            <StatCard
               data={keywordsMatched.spark}
               value={keywordsMatched.value}
               delta={keywordsMatched.delta}
               label="keywords Matched"
               chart="line"
               suffix={keywordsMatched.total ? `/ ${keywordsMatched.total}` : null}
               icon={keywordsMatched.icon}
               accent
            />
         </div>
         <div className="grid grid-cols-12 gap-5 lg:grid-cols-8">
            <div className="col-span-12 lg:col-span-4">
               {scoreSeries?.length && (
                  <ScoreEvolutionChart
                     data={scoreSeries}
                     currentScore={current}
                     delta={evolutionDelta}
                  />
               )}
            </div>
            <div className="col-span-12 sm:col-span-6 lg:col-span-2">
               {current !== null && (
                  <AtsGauge
                     score={current}
                     delta={atsScore.delta ?? 0}
                  />
               )}
            </div>
            <div className="col-span-12 sm:col-span-6 lg:col-span-2">
               <ProfileCard
                  user={user}
                  stats={profileStats}
               />
            </div>
         </div>
         <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
            <div className="lg:col-span-8">
               {versionStack?.length && (
                  <VersionStack
                     versions={versionStack}
                     latestResume={latestResume}
                  />
               )}
            </div>
            <div className="lg:col-span-4">
               {activity?.length && <ActivityFeed items={activity} />}
            </div>
         </div>
      </section>
   );
}

export default DashboardPage;
