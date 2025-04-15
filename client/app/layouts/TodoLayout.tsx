import React from "react";
import { Outlet } from "react-router";
import { Navbar } from "~/components/navbar";
import { ProjectsProvider } from "~/hooks/useProjetcs";
import { TaskProvider } from "~/hooks/useTasks";
import { UsersProvider } from "~/hooks/useUsers";
import { ProtectedRoute } from "~/root";

const TodoLayout: React.FC = () => {
  return (
      <ProjectsProvider>
        <TaskProvider>
          <UsersProvider>
            <div className=" flex flex-col sm:flex-row sm:h-auto h-full ">
              <Navbar/>
              <Outlet/>
            </div> 
          </UsersProvider>
        </TaskProvider>
      </ProjectsProvider>
  );
};

export default TodoLayout;