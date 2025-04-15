import { t } from "i18next";
import type { UserValues } from "~/schemas/types";

export const createUsers = async (data: UserValues): Promise<void> => {
try {
  const response = await fetch("http://localhost:3000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  alert(t("user.created"))
} catch (error) {
  console.error("Error creating task:", error);
  alert(t("user.error") + error);
}
}

export const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3000/users");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return(data); 
      } catch (error) {
        console.error("Error fetching users:", error);
        alert(t("user.error") + error);
      }
    };

export const updateUsers = async (id: number, data: UserValues): Promise<void> => {
  try {
    const response = await fetch(`http://localhost:3000/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    
    });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      alert(t("user.updated"));
    } catch (error) {
      console.error("Error Updating project:", error);
      alert(t("user.error") + error);
    }
}

export const deleteUsers = async (id: number) => {
  try {
    const response = await fetch(`http://localhost:3000/users/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    console.log(`Project with ID ${id} deleted successfully`);
    alert(t("user.deleted"));
  } catch (error) {
    console.error("Error deleting project:", error);
    alert(t("user.error") + error);
  }
};