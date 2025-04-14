import { useTranslation } from "react-i18next";
import { Project } from "../components/project";
import { useState } from "react";
import {ProjectInput, TaskInput} from "../components/form";


const mockProjects = [
  {
    id: 1,
    title: "Website Redesign",
    description: "Redesign the company website to improve user experience.",
    owner: { id: 101, name: "Alice Johnson" },
    assignedUsers: [
      { id: 201, name: "John Doe" },
      { id: 202, name: "Jane Smith" },
    ],
    tasks: [
      { id: 301, title: "Create Wireframes", status: "COMPLETED" as "PENDING" | "IN_PROGRESS" | "COMPLETED"},
      { id: 302, title: "Develop Frontend", status: "IN_PROGRESS" as "PENDING" | "IN_PROGRESS" | "COMPLETED" },
      { id: 303, title: "Setup Backend", status: "PENDING" as "PENDING" | "IN_PROGRESS" | "COMPLETED"},
    ],
    status: "IN_PROGRESS" as "PENDING" | "IN_PROGRESS" | "COMPLETED",
    createdAt: "2025-04-11T10:00:00Z",
  },
  {
    id: 2,
    title: "API Development",
    description: "Develop the backend API for the application.",
    owner: { id: 102, name: "Bob Williams" },
    assignedUsers: [
      { id: 203, name: "Alice Johnson" },
      { id: 204, name: "Charlie Brown" },
    ],
    tasks: [
      { id: 304, title: "Setup Database", status: "PENDING" as "PENDING" | "IN_PROGRESS" | "COMPLETED" },
      { id: 305, title: "Implement Authentication", status: "IN_PROGRESS" as "PENDING" | "IN_PROGRESS" | "COMPLETED" },
    ],
    status: "PENDING" as "PENDING" | "IN_PROGRESS" | "COMPLETED",
    createdAt: "2025-04-10T12:00:00Z",
  },
];

export default function Projects() {
  const { t} = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
 

  return (
      <section className="container position-relative p-16 h-screen flex flex-col">
        <h1 className="text-4xl text-primary font-bold mb-6">{t("projects")}</h1>
        <div className="container flex flex-col gap-6 overflow-y-scroll scrollbar-custom ">
          {mockProjects.map((project) => (
                <Project key={project.id} project={project} />
              ))}
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
            <ProjectInput/>
          </div>
        </div>
      )}
      </section>

  );
}

