type TaskProps = {
  task:{
    id: number;
    title: string;
    description?: string;
    project: string;
    assignedTo: string;
    status: "PENDING" | "IN_PROGRESS" | "COMPLETED";
    priority: "LOW" | "MEDIUM" | "HIGH";
    createdAt: string
  };
};

export const Task = ({ task }: TaskProps) => {
  const {id, title, description, project, assignedTo, status, priority, createdAt } = task;
  
  const priority_bg =
  priority === "LOW"
    ? "bg-low border-low dark:border-dark-low"
    : priority === "MEDIUM"
    ? "bg-medium border-medium dark:border-dark-medium"
    : "bg-high border-high dark:border-dark-high";

  const status_text =
    status === "PENDING"
      ? "Pending"
      : status === "IN_PROGRESS"
      ? "In Progress"
      : "Completed";


  return (
    <div className={`grid grid-cols-3 gap-4 border-3 ${priority_bg} bg-background-100 dark:bg-dark-background-100  rounded-lg p-4 shadow-sm text-text-secondary dark:text-dark-text-secondary  px-12`}>
      <div className="flex flex-col gap-2 ">
        <h2 className="text-2xl font-bold ">{title}</h2>
        <p className="text-sm ">
          {description || "No description provided"}
        </p>
      </div>
      <p className="text-sm text-text-secondary dark:text-dark-text-secondary text-xl self-center ">
         {status_text}
      </p>
      <div className="flex flex-col gap-2 ">
        <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
          <strong>Project:</strong> {project}
        </p>
        <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
          <strong>Assigned To:</strong> {assignedTo}
        </p>
        
        <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
          <strong>Created At:</strong> {new Date(createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};