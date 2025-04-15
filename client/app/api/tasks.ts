import { t } from "i18next";
import type { TaskValues } from "~/schemas/types";

export const createTask = async (data: TaskValues, accessToken: string ): Promise<void> => {
try {

  const response = await fetch("http://localhost:3000/tasks", {
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
  alert(t("task.created"));
} catch (error) {
  alert(t("task.error") + error);
}
}

export const fetchTasks = async ( accessToken: string) => {
  try {
    const response = await fetch("http://localhost:3000/tasks",{
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
    return data;
  } catch (error) {
    console.error("Error fetching project:", error);
  }
};

export const updateTask = async (id: number, data: TaskValues,  accessToken: string): Promise<void> => {
  try {
    const response = await fetch(`http://localhost:3000/tasks/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${accessToken}`,
            },
            body: JSON.stringify(data),
          
          });
    
    if(!response.ok){
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    alert(t("task.updated"));

    } catch (error) {
      console.error("Error Updating project:", error);
      alert(t("project.error") + error);
    }
}

export const deleteTask = async (id: number, accessToken: string) => {
  try {
    const response = await fetch(`http://localhost:3000/tasks/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    console.log(`Project with ID ${id} deleted successfully`);
    alert(t("task.deleted"));
  } catch (error) {
    console.error("Error deleting project:", error);
    alert(t("task.error") + error);
  }
};