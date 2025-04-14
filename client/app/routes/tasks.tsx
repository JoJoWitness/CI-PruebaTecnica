import { Task } from "~/components/task";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { TaskInput } from "~/components/form";

let props = {
  id: 1,
  title: "Fix Login Bug",
  description: "Resolve the issue with user login.",
  project: "Website Redesign",
  assignedTo: "John Doe",
  status: "IN_PROGRESS" as "PENDING" | "IN_PROGRESS" | "COMPLETED",
  priority: "HIGH" as "LOW" | "MEDIUM" | "HIGH",
  createdAt:"4/11/2025"
}

let props2 = {
  id: 1,
  title: "Fix Login Bug",
  description: "Resolve the issue with user login.",
  project: "Website Redesign",
  assignedTo: "John Doe",
  status: "IN_PROGRESS" as "PENDING" | "IN_PROGRESS" | "COMPLETED",
  priority: "LOW" as "LOW" | "MEDIUM" | "HIGH",
  createdAt: "4/11/2025"
  
}

let props3 = {
  id: 1,
  title: "Fix Login Bug",
  project: "Website Redesign",
  assignedTo: "John Doe",
  status: "IN_PROGRESS" as "PENDING" | "IN_PROGRESS" | "COMPLETED",
  priority: "MEDIUM" as "LOW" | "MEDIUM" | "HIGH",
  createdAt: "4/11/2025"
}

export default function Tasks() {
  const {t} = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
      <section className="container p-16">
            <h1 className="text-4xl text-primary font-bold mb-6">{t("tasks")}</h1>
            <div className="grid grid-cols-3 gap-4 bg-background-100 dark:bg-dark-background-100 py-4 px-12 rounded-lg  shadow-md mb-6 ">
              <p className="text-2xl font-bold text-text-primary dark:text-dark-text-primary ">
                {t("task.title")}
              </p>
              <p className="text-2xl font-bold text-text-primary dark:text-dark-text-secondary">
              {t("task.stat")}
              </p>
              <p className="text-2xl font-bold text-text-primary dark:text-dark-text-primary">
              {t("task.info")}
              </p>
            </div>
            <div className="container flex flex-col gap-4">
              <Task task={props}/>
              <Task task={props2}/>
              <Task task={props3}/>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="text-xl font-bold bg-primary fixed bottom-12 right-6 text-background dark:text-dark-background w-60 rounded-lg px-4 py-2 mt-6 
              border-3 border-primary hover:bg-background-100 dark:hover:bg-dark-background-100 hover:text-primary"
            >
              {t("createProject", "Create New Project")}
            </button>
            {isModalOpen && (
            <div className="fixed inset-0 bg-background dark:bg-dark-background flex justify-center items-center z-50 w-screen h-screen">
              <div className="border-4 border-primary bg-background-100 dark:bg-dark-background-100 p-6 rounded-xl min-w-[350px] ">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-primary float-right font-bold text-4xl"
                >
                  X
                </button>
                <TaskInput/>
              </div>
            </div>
          )}
           
          </section>

  );
}
