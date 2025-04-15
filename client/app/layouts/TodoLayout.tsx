import React from "react";
import { Outlet } from "react-router";
import { Navbar } from "~/components/navbar";
import { ProjectsProvider } from "~/hooks/useProjetcs";
import { UsersProvider } from "~/hooks/useUsers";

const TodoLayout: React.FC = () => {
  return (
    <ProjectsProvider>
      <UsersProvider>
        <div className="flex h-full ">
          <Navbar/>
          <Outlet/>
        </div> 
      </UsersProvider>
    </ProjectsProvider>
  );
};

export default TodoLayout;