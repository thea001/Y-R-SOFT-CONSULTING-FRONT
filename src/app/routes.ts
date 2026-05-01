import { createBrowserRouter } from "react-router";
import Home from "./components/Home";
import Blog from "./components/Blog";
import Leads from "./components/Leads";
import Dashboard from "./components/Dashboard";
import Login from "./auth/Login";

export const router = createBrowserRouter([
  { path: "/", Component: Home },
  { path: "/blog", Component: Blog },
  { path: "/login", Component: Login },
  { path: "/dashboard", Component: Dashboard },
  { path: "/leads", Component: Leads },
]);
