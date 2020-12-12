import { lazy } from "react";

const Home = lazy(() => import("../components/home/Home"));
const Signup = lazy(() => import("../components/auth/signup/Signup"));
const Login = lazy(() => import("../components/auth/login/Login"));
const ResetPassword = lazy(() =>
  import("../components/auth/resetPassword/ResetPassword")
);
const Categories = lazy(() => import("../components/categories/Categories"));
const Account = lazy(() => import("../components/account/Account"));
const Search = lazy(() => import("../components/search/Search"));
const Trending = lazy(() => import("../components/trending/Trending"));
const Jobs = lazy(() => import("../components/jobs/Jobs"));
const Events = lazy(() => import("../components/events/Events"));
const Help = lazy(() => import("../components/help/Help"));
const Error404 = lazy(() => import("../components/layouts/errors/Error404"));
const Premium = lazy(() => import("../components/premium/Premium"));
const Contact = lazy(() => import("../components/contact/Contact"));

const routes = [
  // Home
  {
    path: "/",
    component: Home,
    title: "Workgent - Home",
    exact: true,
  },
  // Register or Signup
  {
    path: "/register",
    component: Signup,
    title: "Workgent - Register",
    exact: true,
    needsAuth: false,
  },
  // Login
  {
    path: "/login",
    component: Login,
    title: "Workgent - Login",
    exact: false,
    needsAuth: false,
  },
  // Reset password
  {
    path: "/auth/reset-password",
    component: ResetPassword,
    title: "Workgent - Reset password",
    needsAuth: false,
  },
  // Categories
  {
    path: "/categories",
    component: Categories,
    title: "Workgent - Categories",
    needsAuth: false,
  },
  // Account
  {
    path: "/account",
    component: Account,
    title: "Workgent - Account",
    needsAuth: true,
  },
  // Search/jobs
  {
    path: "/jobs",
    component: Search,
    title: `Workgent - ${"Search name"}`,
    needsAuth: false,
    exact: false,
  },
  // Trending
  {
    path: "/trending",
    component: Trending,
    title: "Workgent - Trending",
    needsAuth: false,
  },
  // Jobs
  {
    path: "/jobs",
    component: Jobs,
    title: "Workgent - Jobs",
    needsAuth: false,
  },
  // Events
  {
    path: "/events",
    component: Events,
    title: "Workgent - Events",
    needsAuth: false,
  },
  // Help
  {
    path: "/help",
    component: Help,
    title: "Workgent - Help",
    needsAuth: false,
  },
  // Premium
  {
    path: "/premium",
    component: Premium,
    title: "Workgent - Premium",
    needsAuth: false,
  },
  // Error404
  {
    path: "/error_404",
    component: Error404,
    title: "Error 404",
    exact: true,
    needsAuth: false,
  },
  {
    path: "/contact",
    component: Contact,
    title: "Contact us",
    needsAuth: false,
  },
];

export default routes;
