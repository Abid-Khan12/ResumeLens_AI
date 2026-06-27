import { lazy } from "react";

const LandingPage = lazy(() => import("@/pages/landing-page"));
const LoginPage = lazy(() => import("@/pages/login-page"));
const RegisterPage = lazy(() => import("@/pages/register-page"));

const DashboardPage = lazy(() => import("@/pages/dashboard-page"));
const ResumePage = lazy(() => import("@/pages/resume-page"));
const ResumeDetailPage = lazy(() => import("@/pages/resume-detail-page"));
const InsightPage = lazy(() => import("@/pages/insight-page"));
const VersionPage = lazy(() => import("@/pages/version-page"));
const HistoryPage = lazy(() => import("@/pages/history-page"));
const SettingPage = lazy(() => import("@/pages/setting-page"));

const NotFoundPage = lazy(() => import("@/pages/not-found-page"));

export {
   LandingPage,
   LoginPage,
   RegisterPage,
   DashboardPage,
   NotFoundPage,
   ResumePage,
   ResumeDetailPage,
   InsightPage,
   VersionPage,
   HistoryPage,
   SettingPage,
};
