import { createBrowserRouter } from "react-router";

import {
   DashboardPage,
   HistoryPage,
   InsightPage,
   LandingPage,
   LoginPage,
   NotFoundPage,
   RegisterPage,
   ResumeDetailPage,
   ResumePage,
   SettingPage,
   VersionPage,
} from "@/pages";

import LoaderLayer from "@/components/layout/loader-layer";
import DashboardLayout from "@/components/layout/dashboard-layout";

const router = createBrowserRouter([
   {
      Component: LoaderLayer,
      children: [
         { path: "/", Component: LandingPage },
         { path: "/login", Component: LoginPage },
         { path: "/register", Component: RegisterPage },
         { path: "/*", Component: NotFoundPage },
      ],
   },
   {
      path: "/",
      Component: DashboardLayout,
      children: [
         { path: "dashboard", Component: DashboardPage },
         { path: "resumes", Component: ResumePage },
         { path: "resume/:id", Component: ResumeDetailPage },
         { path: "insights", Component: InsightPage },
         { path: "versions", Component: VersionPage },
         { path: "history", Component: HistoryPage },
         { path: "settings", Component: SettingPage },
      ],
   },
]);

export default router;
