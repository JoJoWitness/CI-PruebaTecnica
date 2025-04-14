import { t } from "i18next";
import type { TaskValues } from "~/schemas/types";

// export const createTask = async (data: TaskValues): Promise<void> => {
// try {
//   console.log("Creating task with data:", data);
//   await fetch("http://localhost:3000/tasks", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   });
// } catch (error) {
//   console.error("Error creating task:", error);
// }
// }

export const fetchTasks = async () => {
  try {
    const response = await fetch("http://localhost:3000/tasks");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching project:", error);
  }
};

export const deleteTask = async (id: number) => {
  try {
    const response = await fetch(`http://localhost:3000/tasks/${id}`, {
      method: "DELETE",
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