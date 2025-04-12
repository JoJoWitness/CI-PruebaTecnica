import { useTranslation } from "react-i18next";

type ProjectProps = {
  project: {
    id: number;
    name: string;
    description?: string;
    owner: {
      id: number;
      name: string;
    };
    assignedUsers: {
      id: number;
      name: string;
    }[];
    tasks: {
      id: number;
      title: string;
      status: "PENDING" | "IN_PROGRESS" | "COMPLETED";
    }[];
    status: "PENDING" | "IN_PROGRESS" | "COMPLETED";
    createdAt: string; 
  };
};

export const Project = ({ project }: ProjectProps) => {
  const { name, description, owner, assignedUsers, tasks, status, createdAt } = project;
  const {t} = useTranslation();

  const statusText =
    status === "PENDING"
      ? t("project.status.pending")
      : status === "IN_PROGRESS"
      ? t("project.status.inProgress")
      : t("project.status.completed")

  return (
    <div className="border-4 border-primary rounded-lg p-6 shadow-lg bg-background-100 dark:bg-dark-background-100">
      <h2 className="text-2xl font-bold text-primary mb-4">{name}</h2>
      <p className="text-md text-text-secondary dark:text-dark-text-secondary mb-4">
        <span className="text-lg font-medium">{t("project.description")}:</span> {description || t("project.noDescription")}
      </p>
      <p className="text-md text-text-secondary dark:text-dark-text-secondary mb-4">
        <span className="text-lg font-medium">{t("project.owner")}:</span> {owner.name} (ID: {owner.id})
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
          {assignedUsers.map((user) => (
            <li key={user.id}>
              {user.name} (ID: {user.id})
            </li>
          ))}
        </ul>
      </div>
      <div>
        <span className="text-lg font-medium text-text-secondary dark:text-dark-text-secondary">{t("project.tasks")}</span>
        <ul className="list-disc list-inside text text-text-secondary dark:text-dark-text-secondary">
          {tasks.map((task) => (
            <li key={task.id}>
              {task.title} -{" "}
              <span
                className={`${
                  task.status === "PENDING"
                    ? "text-pending dark:text-dark-pending"
                    : task.status === "IN_PROGRESS"
                    ? "text-progress darK:text-dark-progress"
                    : "text-completed dark:text-dark-completed"
                } font-bold`}
              >
                {task.status}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};