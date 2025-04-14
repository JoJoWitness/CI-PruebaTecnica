import { useTranslation } from "react-i18next";
import { Project } from "../components/project";
import { useEffect, useState } from "react";
import {ProjectInput} from "../components/form";
import type { ProjectType } from "~/schemas/types";
import { fetchProject } from "~/api/projects";



export default function Projects() {
  const { t} = useTranslation();
  const [projects, setProjects] = useState<ProjectType | undefined>(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);
 
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchProject();
      setProjects(data);
    };
    fetchData();
  }, []);

  if (!projects || projects === null) {
    return(
    <section className="container position-relative p-16 h-screen flex flex-col">
      <h1 className="text-4xl text-primary font-bold mb-6">{t("projects")}</h1>
      <p className="text-2xl font-medium text-text-primary dark:text-dark-text-primary">{t("loading")}...</p>
    </section>
    )
  }
  return (
      <section className="container position-relative p-16 h-screen flex flex-col">
        <h1 className="text-4xl text-primary font-bold mb-6">{t("projects")}</h1>
        <div className="container flex flex-col gap-6 overflow-y-scroll scrollbar-custom ">
          {/* @ts-ignore*/}
          {projects && projects.map((project) => ( <Project key={project.id} project={project} />))}
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="text-xl font-bold bg-primary fixed bottom-12 right-6 text-background dark:text-dark-background w-60 rounded-lg px-4 py-2 mt-6 
          border-3 border-primary hover:bg-background-100 dark:hover:bg-dark-background-100 hover:text-primary"
        >
          {t("project.create")}
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

