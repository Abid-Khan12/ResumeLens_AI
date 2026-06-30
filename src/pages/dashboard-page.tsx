import ActivityFeed from "@/components/dashboard/activityfeed-card";
import AtsGauge from "@/components/dashboard/ats-gauge-card";
import ProfileCard from "@/components/dashboard/profile-card";
import ScoreEvolutionChart from "@/components/dashboard/score-evolution-chart";
import StatCard from "@/components/dashboard/stat-card";
import VersionStack from "@/components/dashboard/version-stack-card";
import {
   activity,
   latestResume,
   profileStats,
   scoreSeries,
   statCardData,
   user,
   versionStack,
} from "@/mock/dashboard";
import { useMemo } from "react";

function DashboardPage() {
   const { atsScore, issuesIdentified, keywordsMatched, versions } = statCardData;

   const evolutionDelta = useMemo(
      () => (scoreSeries.length ? (atsScore.value ?? 0) : 0),
      [atsScore.value, scoreSeries],
   );

   return (
      <section className="flex-1 space-y-5">
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
                     currentScore={evolutionDelta}
                     delta={evolutionDelta}
                  />
               )}
            </div>
            <div className="col-span-12 sm:col-span-6 lg:col-span-2">
               {evolutionDelta !== null && (
                  <AtsGauge
                     score={evolutionDelta}
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
