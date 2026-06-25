import { createBrowserRouter } from "react-router";
import { DashboardPage, LandingPage, LoginPage, NotFoundPage, RegisterPage } from "@/pages";

import LoaderLayer from "@/components/layout/loader-layer";

const router = createBrowserRouter([
   {
      Component: LoaderLayer,
      children: [
         { path: "/", Component: LandingPage },
         { path: "/login", Component: LoginPage },
         { path: "/register", Component: RegisterPage },
         { path: "/dashboard", Component: DashboardPage },
         { path: "/*", Component: NotFoundPage },
      ],
   },
]);

export default router;
