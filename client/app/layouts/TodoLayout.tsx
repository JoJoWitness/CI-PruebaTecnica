import React from "react";
import { Outlet } from "react-router";
import { Navbar } from "~/components/navbar";

const TodoLayout: React.FC = () => {
  return (
        <>
        <Navbar/>
        <Outlet />
        </> 
  );
};

export default TodoLayout;