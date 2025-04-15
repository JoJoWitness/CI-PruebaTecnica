import { createContext, useContext, useEffect, useState } from "react";
import { fetchProject } from "~/api/projects";
import type { ProjectType } from "~/schemas/types";
import { useAuth } from "./useAuth";

const ProjectsContext = createContext<ProjectType | null>(null);

export const ProjectsProvider = ({ children }: { children: React.ReactNode }) => {
  const [projects, setProjects] = useState<ProjectType | null>(null);
  const { token } = useAuth();
  console.log(token)
  useEffect(() => {
    const fetchData = async () => {
                            //@ts-ignore
      const data = await fetchProject(token);
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