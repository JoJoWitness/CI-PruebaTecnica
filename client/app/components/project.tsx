import {useTranslation} from "react-i18next";
import type { ProjectType, TaskType, User } from "../schemas/types";
import { deleteProject } from "~/api/projects";
import { useState } from "react";
import deleteIcon from "../assets/icons/delete.svg";
import edit from "../assets/icons/edit.svg";
import { ProjectInput } from "./form";



export const Project = ( project : ProjectType) => {

  // @ts-ignore
  const {id, name, description, owner, assignedUsers, tasks, status, createdAt } = project.project;
  const { t } = useTranslation();
  const ownerId = owner.id;
  const [isEditing, setIsEditing] = useState(false);

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
          onClick={() => deleteProject(id)}
          className="text-sm border-3 absolute top-6 right-6 border-red-500 font-bold bg-red-500 text-background dark:text-dark-background w-40 rounded-lg px-4 py-2
          hover:bg-transparent hover:text-red-500"
        >
          {t("project.delete")}
        
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