import { useTranslation } from "react-i18next";
import { useProjects } from "~/hooks/useProjetcs";
import { useTasks } from "~/hooks/useTasks";


export default function Dashboard() {
  const projects = useProjects()
const tasks = useTasks()
  const { t } = useTranslation();

  //@ts-ignore
  const totalProjects = projects ? projects.length : 0;
  //@ts-ignore
  const totalTasks = tasks ? tasks.length : 0;
    //@ts-ignore
  const taskStatusCounts = tasks ? tasks.reduce(
      //@ts-ignore
    (acc, task) => {
      acc[task.status as keyof typeof acc] = (acc[task.status as keyof typeof acc] || 0) + 1;
      return acc;
    },
    { PENDING: 0, IN_PROGRESS: 0, COMPLETED: 0 }
  ): { PENDING: 0, IN_PROGRESS: 0, COMPLETED: 0 };
  //@ts-ignore
  const taskPriorityCounts = tasks ? tasks.reduce(
      //@ts-ignore
    (acc, task) => {
      acc[task.priority as keyof typeof acc] = (acc[task.priority as keyof typeof acc] || 0) + 1;
      return acc;
    },
    { LOW: 0, MEDIUM: 0, HIGH: 0 }
  ): { PENDING: 0, IN_PROGRESS: 0, COMPLETED: 0 };
  
  if (!projects || !tasks) {
    <section className="container position-relative p-16 h-screen flex flex-col">
        <h1 className="text-4xl text-primary font-bold mb-6">Dashboard</h1>
        <p className="text-2xl font-medium text-text-primary dark:text-dark-text-primary">{t("loading")}...</p>
    </section>
  }
  else{
  return (
    <section className="container p-6 sm:p-16 h-screen flex flex-col gap-6">
      <h1 className="text-4xl text-primary font-bold">{t("dashboard.title", "Dashboard")}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-grow ">

        <div className="p-6 border-4 border-primary bg-white dark:bg-dark-background-100
                        rounded-2xl shadow-md dark:text-dark-text-primary ">
          <h2 className="text-3xl text-primary font-bold mb-4">{t("dashboard.projects", "Projects")}</h2>
          <p className="text-2xl mb-4">
            <span className="font-bold">{t("projects")}:</span> {totalProjects}
          </p>
          <ul className="list-none max-h-110 overflow-y-auto scrollbar-custom">
             {/*@ts-ignore*/}
            {projects.map((project) => {
                    {/*@ts-ignore*/} 
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
}