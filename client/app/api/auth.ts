import type { UserLogType } from "~/schemas/types";

export const login = async (data: UserLogType) => {
  console.log("Gato: ", data)
  try {
    const response = await fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      credentials: 'include', 
    });

    if (!response.ok) {
      throw new Error(`Login failed with status: ${response.status}`);
    }

    const accessToken = await response.text(); 
    console.log('Access Token:', accessToken);

    
    localStorage.setItem('accessToken', accessToken);
  } catch (error) {
    console.error('Error during login:', error);
  }
};