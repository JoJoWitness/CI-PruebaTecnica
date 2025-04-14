import { useTranslation } from "react-i18next";
import type { TaskType } from "../schemas/types";



export const Task = ({ task }: TaskType) => {
  const {id, title, description, project, assignedTo, status, priority, createdAt } = task;
  const {t} = useTranslation();
  
  const priority_bg =
  priority === "LOW"
    ? "bg-green border-green dark:border-green-300"
    : priority === "MEDIUM"
    ? "bg-yellow border-yellow dark:border-yellow-300"
    : "bg-red border-red dark:border-red-100";

  const status_text =
    status === "PENDING"
      ? t("task.status.pending")
      : status === "IN_PROGRESS"
      ? t("task.status.in_progress")
      : t("task.status.completed")


  return (
    <div className={`grid grid-cols-3 gap-4 border-3 ${priority_bg} bg-background-100 dark:bg-dark-background-100  rounded-lg p-4 shadow-sm text-text-secondary dark:text-dark-text-secondary  px-12`}>
      <div className="flex flex-col gap-2 justify-center">
        <h2 className="text-2xl font-bold ">{title}</h2>
        <p className="text-lg ">
          {description || t("task.noDescription")}
        </p>
      </div>
      <p className="text-text-secondary dark:text-dark-text-secondary text-xl self-center ">
         {status_text}
      </p>
      <div className="flex flex-col gap-2 ">
        <p className="text-text-secondary dark:text-dark-text-secondary">
          <span className="font-bold">{t("task.project")}:</span> {project}
        </p>
        <p className="text-text-secondary dark:text-dark-text-secondary">
          <span className="font-bold">{t("task.assignedTo")}:</span> {assignedTo}
        </p>
        
        <p className="text-text-secondary dark:text-dark-text-secondary">
          <span className="font-bold">{t("task.createdAt")}:</span> {new Date(createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};