import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  layout("layouts/TodoLayout.tsx", [
    index("routes/dashboard.tsx", ),
    route("projects", "routes/projects.tsx"),
    route("tasks", "routes/tasks.tsx"),
    route("settings", "routes/settings.tsx"),
    route("users", "routes/users.tsx")
  ]),
   route("login", "routes/login.tsx"),

  ] satisfies RouteConfig;
