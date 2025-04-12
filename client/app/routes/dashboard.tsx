import { useTranslation } from "react-i18next";

const mockProjects = [
  {
    id: 1,
    name: "Website Redesign",
    description: "Redesign the company website to improve user experience.",
    owner: { id: 101, name: "Alice Johnson" },
    assignedUsers: [
      { id: 201, name: "John Doe" },
      { id: 202, name: "Jane Smith" },
    ],
    tasks: [
      { id: 301, title: "Create Wireframes", status: "COMPLETED", priority: "HIGH" },
      { id: 302, title: "Develop Frontend", status: "IN_PROGRESS", priority: "MEDIUM" },
      { id: 303, title: "Setup Backend", status: "PENDING", priority: "LOW" },
    ],
    status: "IN_PROGRESS",
    createdAt: "2025-04-11T10:00:00Z",
  },
  {
    id: 2,
    name: "API Development",
    description: "Develop the backend API for the application.",
    owner: { id: 102, name: "Bob Williams" },
    assignedUsers: [
      { id: 203, name: "Alice Johnson" },
      { id: 204, name: "Charlie Brown" },
    ],
    tasks: [
      { id: 304, title: "Setup Database", status: "PENDING", priority: "HIGH" },
      { id: 305, title: "Implement Authentication", status: "IN_PROGRESS", priority: "MEDIUM" },
    ],
    status: "PENDING",
    createdAt: "2025-04-10T12:00:00Z",
  },
  {
    id: 4,
    name: "API Development",
    description: "Develop the backend API for the application.",
    owner: { id: 102, name: "Bob Williams" },
    assignedUsers: [
      { id: 203, name: "Alice Johnson" },
      { id: 204, name: "Charlie Brown" },
    ],
    tasks: [
      { id: 304, title: "Setup Database", status: "PENDING", priority: "HIGH" },
      { id: 305, title: "Implement Authentication", status: "IN_PROGRESS", priority: "MEDIUM" },
    ],
    status: "PENDING",
    createdAt: "2025-04-10T12:00:00Z",
  },
  {
    id: 5,
    name: "API Development",
    description: "Develop the backend API for the application.",
    owner: { id: 102, name: "Bob Williams" },
    assignedUsers: [
      { id: 203, name: "Alice Johnson" },
      { id: 204, name: "Charlie Brown" },
    ],
    tasks: [
      { id: 304, title: "Setup Database", status: "PENDING", priority: "HIGH" },
      { id: 305, title: "Implement Authentication", status: "IN_PROGRESS", priority: "MEDIUM" },
    ],
    status: "PENDING",
    createdAt: "2025-04-10T12:00:00Z",
  },
  {
    id: 6,
    name: "API Development",
    description: "Develop the backend API for the application.",
    owner: { id: 102, name: "Bob Williams" },
    assignedUsers: [
      { id: 203, name: "Alice Johnson" },
      { id: 204, name: "Charlie Brown" },
    ],
    tasks: [
      { id: 304, title: "Setup Database", status: "PENDING", priority: "HIGH" },
      { id: 305, title: "Implement Authentication", status: "IN_PROGRESS", priority: "MEDIUM" },
    ],
    status: "PENDING",
    createdAt: "2025-04-10T12:00:00Z",
  },
  {
    id: 7,
    name: "API Development",
    description: "Develop the backend API for the application.",
    owner: { id: 102, name: "Bob Williams" },
    assignedUsers: [
      { id: 203, name: "Alice Johnson" },
      { id: 204, name: "Charlie Brown" },
    ],
    tasks: [
      { id: 304, title: "Setup Database", status: "PENDING", priority: "HIGH" },
      { id: 305, title: "Implement Authentication", status: "IN_PROGRESS", priority: "MEDIUM" },
    ],
    status: "PENDING",
    createdAt: "2025-04-10T12:00:00Z",
  },
  {
    id: 8,
    name: "API Development",
    description: "Develop the backend API for the application.",
    owner: { id: 102, name: "Bob Williams" },
    assignedUsers: [
      { id: 203, name: "Alice Johnson" },
      { id: 204, name: "Charlie Brown" },
    ],
    tasks: [
      { id: 304, title: "Setup Database", status: "PENDING", priority: "HIGH" },
      { id: 305, title: "Implement Authentication", status: "IN_PROGRESS", priority: "MEDIUM" },
    ],
    status: "COMPLETED",
    createdAt: "2025-04-10T12:00:00Z",
  },
];

export default function Dashboard() {
  const { t } = useTranslation();
  console.log("In_PROGRESS".toLowerCase())
  const totalProjects = mockProjects.length;
  const totalTasks = mockProjects.reduce((sum, project) => sum + project.tasks.length, 0);
  const taskStatusCounts = mockProjects.reduce(
    (acc, project) => {
      project.tasks.forEach((task) => {
        acc[task.status as keyof typeof acc] = (acc[task.status as keyof typeof acc] || 0) + 1;
      });
      return acc;
    },
    { PENDING: 0, IN_PROGRESS: 0, COMPLETED: 0 }
  );
  const taskPriorityCounts = mockProjects.reduce(
    (acc, project) => {
      project.tasks.forEach((task) => {
        acc[task.priority as keyof typeof acc] = (acc[task.priority as keyof typeof acc] || 0) + 1;
      });
      return acc;
    },
    { LOW: 0, MEDIUM: 0, HIGH: 0 }
  );
  

  return (
    <section className="container p-16 h-screen flex flex-col gap-6">
      <h1 className="text-4xl text-primary font-bold">{t("dashboard.title", "Dashboard")}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-grow ">

        <div className="p-6 border-4 border-primary bg-white dark:bg-dark-background-100
                        rounded-2xl shadow-md dark:text-dark-text-primary ">
          <h2 className="text-3xl text-primary font-bold mb-4">{t("dashboard.projects", "Projects")}</h2>
          <p className="text-2xl mb-4">
            <span className="font-bold">{t("projects")}:</span> {totalProjects}
          </p>
          <ul className="list-none max-h-110 overflow-y-auto scrollbar-custom">
            {mockProjects.map((project) => {
              const completedTasks = project.tasks.filter((task) => task.status === "COMPLETED").length;
                return (
              <li  key={project.id} className="px-6">
                <div className="border-b-3 border-b-primary py-2">
                <h3 className="text-lg font-bold">{project.name}</h3>
                <p>{t("project.owner")}: {project.owner.name}</p>
                
                <p>{t("project.tasks")}: {project.tasks.length}</p>
                <p>
                  {t("project.completedTasks")}: {completedTasks}
                </p>
                <p className={`${
                  project.status === "PENDING"
                    ? "text-yellow-200 dark:text-yellow-100"
                    : project.status === "IN_PROGRESS"
                    ? "text-blue-200 dark:text-blue-100"
                    : "text-green-300 dark:text-green-100"
                } font-bold`}>{t("project.statusValue")}: {t(`project.status.${project.status.toLowerCase()}`)}</p>
                </div>
                
              </li>
            )})}
          </ul>
        </div>

       
        <div className="p-6 border-4 border-primary bg-white dark:bg-dark-background-100
                        rounded-2xl shadow-md dark:text-dark-text-primary ">
          <h2 className="text-3xl font-bold mb-4 text-primary">{t("tasks")}</h2>
          <p className="text-2xl mb-4">
            <span className="font-bold">{t("dashboard.task")}:</span> {totalTasks}
          </p>
          <div className="flex flex-col gap-8">

            <div className="flex flex-col gap-2 px-6">
              <h2 className="text-2xl font-bold mb-2">{t("dashboard.tasks.status")}</h2>
                <p className="text-lg flex gap-2">
                  <span className=" text-xl">{t("dashboard.tasks.pending")}: </span>
                  {taskStatusCounts.PENDING}
                </p>
                <p className="text-lg flex gap-2">
                  <span className=" text-xl">{t("dashboard.tasks.progress")}:</span>
                  {taskStatusCounts.IN_PROGRESS}
                </p>
                <p className="text-lg flex gap-2">
                  <span className=" text-xl">{t("dashboard.tasks.completed")}:</span>
                 {taskStatusCounts.COMPLETED}
                </p>
            </div>
            
            <div className="bg-primary w-80/100 h-[3px] self-center"/>

            <div className="flex flex-col gap-2 px-6">
            <h2 className="text-2xl font-bold mb-2">{t("dashboard.tasks.priority")}</h2>
              <p className="text-lg flex gap-2">
                <span className=" text-xl">{t("dashboard.tasks.low")}: </span>
                {taskPriorityCounts.LOW}
              </p>
              <p className="text-lg flex gap-2">
                <span className=" text-xl">{t("dashboard.tasks.medium")}: </span>
                {taskPriorityCounts.MEDIUM}
              </p>
              <p className="text-lg flex gap-2">
                <span className=" text-xl">{t("dashboard.tasks.high")}: </span>
                {taskPriorityCounts.HIGH}
              </p>
            
            </div>
          
          </div>
        </div>
      </div>
    </section>
  );
}