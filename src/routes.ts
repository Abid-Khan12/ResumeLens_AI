import { createBrowserRouter } from "react-router";

import { DashboardPage, LandingPage, LoginPage, NotFoundPage, RegisterPage } from "@/pages";

const router = createBrowserRouter([
   { path: "/", Component: LandingPage },
   { path: "/login", Component: LoginPage },
   { path: "/register", Component: RegisterPage },
   {
      path: "/dashboard",
      Component: DashboardPage,
   },
   { path: "/*", Component: NotFoundPage },
]);

export default router;
