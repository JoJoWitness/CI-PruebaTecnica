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
    createdAt: string; // ISO string for DateTime
  };
};

export const Project = ({ project }: ProjectProps) => {
  const { name, description, owner, assignedUsers, tasks, status, createdAt } = project;

  const statusText =
    status === "PENDING"
      ? "Pending"
      : status === "IN_PROGRESS"
      ? "In Progress"
      : "Completed";

  return (
    <div className="border-4 border-gray-300 rounded-lg p-6 shadow-lg bg-background-100 dark:bg-dark-background-100">
      <h2 className="text-2xl font-bold text-primary mb-4">{name}</h2>
      <p className="text-md text-text-secondary dark:text-dark-text-secondary mb-4">
        <span className="text-lg font-medium">Descripcion:</span> {description || "No description provided"}
      </p>
      <p className="text-md text-text-secondary dark:text-dark-text-secondary mb-4">
        <span className="text-lg font-medium">Dueño:</span> {owner.name} (ID: {owner.id})
      </p>
      <p className="text-md text-text-secondary dark:text-dark-text-secondary mb-4">
        <span className="text-lg font-medium">Estatus:</span> {statusText}
      </p>
      <p className="text-md text-text-secondary dark:text-dark-text-secondary mb-4">
        <span className="text-lg font-medium">Creado en:</span> {new Date(createdAt).toLocaleDateString()}
      </p>
      <div className="mb-4">
        <span className="text-lg font-medium text-text-secondary dark:text-dark-text-secondary">Trabajadore asignados:</span>
        <ul className="list-disc list-inside text text-text-secondary dark:text-dark-text-secondary">
          {assignedUsers.map((user) => (
            <li key={user.id}>
              {user.name} (ID: {user.id})
            </li>
          ))}
        </ul>
      </div>
      <div>
        <span className="text-lg font-medium text-text-secondary dark:text-dark-text-secondary">Tareas:</span>
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