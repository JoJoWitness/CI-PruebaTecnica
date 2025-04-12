import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  layout("layouts/TodoLayout.tsx", [
    index("routes/tasks.tsx"),
    route("projects", "routes/projects.tsx"),
    // route("tasks", "routes/tasks.tsx"),
    // route("settings", "routes/settings.tsx"),
  ]),
    // route("login", "routes/login.tsx"),

  ] satisfies RouteConfig;
