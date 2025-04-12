import React from "react";
import { Outlet } from "react-router";
import { Navbar } from "~/components/navbar";

const TodoLayout: React.FC = () => {
  return (
        <div className="flex h-full ">
          <Navbar/>
          <Outlet/>
        </div> 
  );
};

export default TodoLayout;