import { t } from "i18next";
import type { ProjectType, ProjectValues } from "~/schemas/types";

export const createProject = async (data: ProjectValues): Promise<void> => {
  try {
        const response = await fetch("http://localhost:3000/projects", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        alert(t("project.created"));
      } catch (error) {
        alert(t("project.error") + error);
      }
}


export const fetchProject = async (): Promise<ProjectType | undefined>  => {
  try {
    const response = await fetch("http://localhost:3000/projects");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("proyextos: ",data)
    return(data);
  } catch (error) {
    alert(t("project.error") + error);
  }
};

export const updateProject = async (id: number, data: ProjectValues): Promise<void> => {
  try {
  await fetch(`http://localhost:3000/projects/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          
          });
    } catch (error) {
      console.error("Error Updating project:", error);
      alert(t("project.error") + error);
    }
}

export const deleteProject = async (id: number) => {
  try {
    const response = await fetch(`http://localhost:3000/projects/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    console.log(`Project with ID ${id} deleted successfully`);
    alert(t("project.deleted"));
  } catch (error) {
    console.error("Error deleting project:", error);
    alert(t("project.error") + error);
  }
};