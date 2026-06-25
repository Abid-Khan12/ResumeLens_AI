import { lazy } from "react";

const LandingPage = lazy(() => import("@/pages/landing-page"));
const LoginPage = lazy(() => import("@/pages/login-page"));
const RegisterPage = lazy(() => import("@/pages/register-page"));
const DashboardPage = lazy(() => import("@/pages/dashboard-page"));
const NotFoundPage = lazy(() => import("@/pages/not-found-page"));

export { LandingPage, LoginPage, RegisterPage, DashboardPage, NotFoundPage };
