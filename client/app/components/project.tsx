import { useTranslation } from "react-i18next";
import type { ProjectType, TaskType, User } from "../schemas/types";
import { useState } from "react";



export const Project = ( project : ProjectType) => {

  // @ts-ignore
  const {id, name, description, owner, assignedUsers, tasks, status, createdAt } = project.project;
  const {t} = useTranslation();
  const [currentProjectId, setCurrentProjectId] = useState<number | null>(null);
  const statusText =
    status === "PENDING"
      ? t("project.status.pending")
      : status === "IN_PROGRESS"
      ? t("project.status.in_progress")
      : t("project.status.completed")

      const deleteProject = async () => {
        try {
          const response = await fetch(`http://localhost:3000/projects/${id}`, {
            method: "DELETE",
          });
    
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
    
          console.log(`Project with ID ${id} deleted successfully`);
          alert(t("project.deleted", "Project deleted successfully!")); 
        } catch (error) {
          console.error("Error deleting project:", error);
          alert(t("project.deleteError", "Error deleting project!"));
        }
      };

  return (
    <div className="border-4 border-primary rounded-lg p-6 shadow-lg bg-background-100 dark:bg-dark-background-100 relative">
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
                onClick={deleteProject}
                className="text border-3 absolute top-6 right-6 border-red-500 font-bold bg-red-500 text-background dark:text-dark-background w-50 rounded-lg px-4 py-2
                hover:bg-transparent hover:text-red-500"
              >
                {t("delete", "Delete Project")}
              </button>
    </div>
  );
};