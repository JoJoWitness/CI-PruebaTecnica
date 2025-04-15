import { createContext, useContext, useEffect, useState } from "react";
import { fetchProject } from "~/api/projects";
import type { ProjectType } from "~/schemas/types";

const ProjectsContext = createContext<ProjectType | null>(null);

export const ProjectsProvider = ({ children }: { children: React.ReactNode }) => {
  const [projects, setProjects] = useState<ProjectType | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchProject();
      if (data) {
        console.log("Fetched projects:", data);
        setProjects(data);
      }
     
    };

    fetchData();
  }, []);

  return (
    <ProjectsContext.Provider value={projects}>
      {children}
    </ProjectsContext.Provider>
  );
};

export const useProjects = () => {
  const context = useContext(ProjectsContext);
  return context;
};