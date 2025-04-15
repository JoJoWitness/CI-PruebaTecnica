import {useTranslation} from "react-i18next";
import type { ProjectType, TaskType, User } from "../schemas/types";
import { deleteProject } from "~/api/projects";
import { useState } from "react";
import deleteIcon from "../assets/icons/delete.svg";
import edit from "../assets/icons/edit.svg";
import { ProjectInput } from "./form";
import { useAuth } from "~/hooks/useAuth";



export const Project = ( project : ProjectType) => {

  // @ts-ignore
  const {id, name, description, owner, assignedUsers, tasks, status, createdAt } = project.project;
  const { t } = useTranslation();
  const ownerId = owner.id;
  const [isEditing, setIsEditing] = useState(false);
  const token = useAuth();
  const statusText =
    status === "CANCELLED"
      ? t("project.status.cancelled")
      : status === "IN_PROGRESS"
      ? t("project.status.in_progress")
      : t("project.status.completed")

   
    

  return (
    <div className="border-4 border-primary rounded-lg p-6 shadow-lg bg-background-100 dark:bg-dark-background-100 relative">
       {isEditing ? (
        <>
        <ProjectInput
        initialValues={{
          id,
          name,
          description,
          //@ts-ignore
          ownerId, assignedUsersID: assignedUsers.map((user) => user.id),
          status,
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
          </>
      ) : (
        <>
        <h2 className="text-2xl font-bold text-primary mb-4">{name}</h2>
        <p className="text-md text-text-secondary dark:text-dark-text-secondary mb-4">
          <span className="text-lg font-medium">{t("project.description")}:</span> {description || t("project.noDescription")}
        </p>
        <p className="text-md text-text-secondary dark:text-dark-text-secondary mb-4">
          <span className="text-lg font-medium">{t("project.owner")}:</span> {owner.name} 
        </p>
        <p className="text-md text-text-secondary dark:text-dark-text-secondary mb-4">
          <span className="text-lg font-medium">{t("project.statusValue")}:</span> {statusText}
        </p>
        <p className="text-md text-text-secondary dark:text-dark-text-secondary mb-4">
          <span className="text-lg font-medium">{t("project.createdAt")}:</span> {new Date(createdAt).toLocaleDateString()}
        </p>
        <div className="mb-4">
          <span className="text-lg font-medium text-text-secondary dark:text-dark-text-secondary">{t("project.assignedUsers")}:</span>
          <ul className="list-disc list-inside text text-text-secondary dark:text-dark-text-secondary">
            {assignedUsers.map((user: User) => (
              <li key={user.id}>
                {user.name} 
              </li>
            ))}
          </ul>
        </div>
        <div>
          <span className="text-lg font-medium text-text-secondary dark:text-dark-text-secondary">{t("project.tasks")}</span>
          <ul className="list-disc list-inside text text-text-secondary dark:text-dark-text-secondary">
            {tasks.map((task: TaskType) => (
              <li key={task.id}>
                {task.title} -{" "}
                <span
                  className={`${
                    task.status === "PENDING"
                      ? "text-yellow-200 dark:text-dark-yellow-100"
                      : task.status === "IN_PROGRESS"
                      ? "text-blue-200 darK:text-blue-100"
                      : "text-green-200 dark:text-green-100"
                  } font-bold`}
                >
                  {task.status}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <button
        // @ts-ignore
          onClick={() => deleteProject(id, token)}
          className="hidden sm:block text-sm border-3 absolute top-6 right-6 border-red-500 font-bold bg-red-500 text-background dark:text-dark-background w-40 rounded-lg px-4 py-2
          hover:bg-transparent hover:text-red-500"
        >
          {t("project.delete")}
        </button>

        <button
        // @ts-ignore
          onClick={() => deleteProject(id, token)}
          className="block sm:hidden absolute top-3 right-3"
          aria-label="Delete Project"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="32px"
            viewBox="0 -960 960 960"
            width="32px"
            fill="currentColor"
            className="text-red-500 hover:text-red-700 transition-all duration-200"
          >
            <path d="m376-300 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 104-104 104 56 56Zm-96 180q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520Zm-400 0v520-520Z" />
          </svg>
        </button>
        <button
            onClick={() => setIsEditing(true)}
            className="text-sm border-3 border-primary font-bold bg-primary text-background dark:text-dark-background w-40 rounded-lg px-4 mt-4 py-2
            hover:bg-transparent hover:text-primary"
          >
            {t("project.edit")}
          </button>
          </>
      )}
    </div>
  );
};