import { useTranslation } from "react-i18next";
import type { ProjectType, TaskType } from "../schemas/types";
import { deleteTask } from "~/api/tasks";
import { useState } from "react";
import { TaskInput } from "./form";



export const Task = (task : TaskType) => {
  //@ts-ignore
  const {id, title, description, project, assignedTo, status, priority, createdAt } = task.task;
  const {t} = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
 
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
    
    <div className={`flex flex-col sm:grid sm:grid-cols-3 relative gap-4 border-3 ${priority_bg} bg-background-100 dark:bg-dark-background-100  rounded-lg p-4 shadow-sm text-text-secondary dark:text-dark-text-secondary  px-12`}>
      {isEditing ? (
      <div className="flex flex-col gap-4 col-span-3">
        <TaskInput
        initialValues={{
          id,
          title,
          description,
          status,
          priority,
          projectId: project.id,
          assignedTo: assignedTo.id,
          project,
          createdAt
        }}
        onSubmitSuccess={() => setIsEditing(false)} 
      />
        <button
          onClick={() => setIsEditing(false)}
          className="text-sm border-3 border-primary font-bold bg-primary text-background dark:text-dark-background w-30 rounded-lg px-4 mt-4 py-2
          hover:bg-transparent hover:text-primary"
        >
          {t("project.cancel")}
        </button>
      </div>
      ) : (
      <>
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
          <span className="font-bold">{t("task.project")}:</span> {project.name}
        </p>
        <p className="text-text-secondary dark:text-dark-text-secondary">
          <span className="font-bold">{t("task.assignedTo")}:</span> {assignedTo.name}
        </p>
        
        <p className="text-text-secondary dark:text-dark-text-secondary">
          <span className="font-bold">{t("task.createdAt")}:</span> {new Date(createdAt).toLocaleDateString()}
        </p>
      </div>
     <div className="flex gap-3 mt-4 sm:absolute sm:top-3 sm:right-3 sm:mt-0">
        <button
          onClick={() => deleteTask(id)}
          className="p-2"
          aria-label="Delete Task"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="32px"
            viewBox="0 -960 960 960"
            width="32px"
            fill="currentColor"
            className="text-red-500  hover:text-red-700 transition-all duration-200"
          >
            <path d="m376-300 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 104-104 104 56 56Zm-96 180q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520Zm-400 0v520-520Z" />
          </svg>
        </button>
        <button
          onClick={() => setIsEditing(true)}
          className="p-2"
          aria-label="Edit Task"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="32px"
            viewBox="0 -960 960 960"
            width="32px"
            fill="currentColor"
            className="text-blue-500 hover:text-blue-700 transition-all duration-200"
          >
            <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
          </svg>
        </button>
      </div>
        </>
      )}
    </div>
  );
};