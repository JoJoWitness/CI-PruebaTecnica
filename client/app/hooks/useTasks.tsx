import { createContext, useContext, useEffect, useState } from "react";
import { fetchTasks } from "~/api/tasks";
import { type TaskType } from "~/schemas/types";
import { useAuth } from "./useAuth";

const TaskContext = createContext<TaskType | null>(null);

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<TaskType | null>(null);
  const { token } = useAuth();
  console.log(token)
  useEffect(() => {
    const fetchData = async () => {
      //@ts-ignore
      const data = await fetchTasks(token);
      if (data) {
        console.log("Fetched projects:", data);
        setTasks(data);
      }
     
    };

    fetchData();
  }, []);

  return (
    <TaskContext.Provider value={tasks}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  return context;
};