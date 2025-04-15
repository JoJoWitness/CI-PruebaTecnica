import { t } from "i18next";
import type { ProjectType, ProjectValues } from "~/schemas/types";

export const createProject = async (data: ProjectValues,  accessToken: string): Promise<void> => {
  try {
        const response = await fetch("http://localhost:3000/projects", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`,
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


export const fetchProject = async ( accessToken: string): Promise<ProjectType | undefined>  => {
  try {
    const response = await fetch("http://localhost:3000/projects",{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return(data);
  } catch (error) {
    alert(t("project.error") + error);
  }
};

export const updateProject = async (id: number, data: ProjectValues,  accessToken: string): Promise<void> => {
  try {
    const response = await fetch(`http://localhost:3000/projects/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${accessToken}`,
            },
            body: JSON.stringify(data),
          
          });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    alert(t("project.updated"));
    
    } catch (error) {
     
      alert(t("project.error") + error);
    }
}

export const deleteProject = async (id: number,  accessToken: string) => {
  try {
    const response = await fetch(`http://localhost:3000/projects/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    alert(t("project.deleted"));
  } catch (error) {
    console.error("Error deleting project:", error);
    alert(t("project.error") + error);
  }
};