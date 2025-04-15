import { createContext, useContext, useEffect, useState } from "react";
import { fetchUsers } from "~/api/users";
import type { UserType } from "~/schemas/types";

const UsersContext = createContext<UserType | null>(null);

export const UsersProvider = ({ children }: { children: React.ReactNode }) => {
  const [users, setUsers] = useState<UserType | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchUsers();
      if (data) {
        console.log("Fetched projects:", data);
        setUsers(data)
      }
     
    };

    fetchData();
  }, []);

  return (
    <UsersContext.Provider value={users}>
      {children}
    </UsersContext.Provider>
  );
};

export const useUsers = () => {
  const context = useContext(UsersContext);
  return context;
};