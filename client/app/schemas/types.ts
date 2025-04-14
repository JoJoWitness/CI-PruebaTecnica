import type { P } from "node_modules/react-router/dist/development/route-data-5OzAzQtT.mjs";
import type { Path, UseFormRegister } from "react-hook-form";

export enum StatusEnum {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
}

export enum PriorityEnum {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
}

export enum RoleEnum{
  ADMIN = "ADMIN",
  USER = "USER",
  SUPERVISOR = "SUPERVISOR"
}

export type EnumValues = StatusEnum | PriorityEnum | RoleEnum;

export type UserPropsType = {
  id: number;
  name: string;
  email: string;
  password: string;
  role: RoleEnum;
  projects: ProjectType[]; 
  assignedTasks: TaskType[]; 
};

export type ProjectType = {
    title: number;
    name: string;
    description?: string;
    owner: {
      id: number;
      name: string;
    };
    assignedUsers: {
      id: number;
      name: string;
    }[];
    tasks: {
      id: number;
      title: string;
      status: StatusEnum;
    }[];
    status:  StatusEnum;
    createdAt: string; 
};



export interface ProjectValues{
  name: string;
  description?: string;
  ownerId: number;
  assignedUsersID: number[];
  status: StatusEnum;
}

export type TaskType = {
    id: number;
    title: string;
    description?: string;
    project: string;
    assignedTo: string;
    status: StatusEnum;
    priority: PriorityEnum;
    createdAt: string
};

export interface TaskValues{
  title: string;
  description?: string;
  assignedToId: number;
  status: StatusEnum;
  priority: PriorityEnum;
}

export type InputTextProjectType = {
  value: Path<ProjectValues>;
  label: string;
  register: UseFormRegister<ProjectValues>
}

export type InputTextTaskType = {
  value: Path<TaskValues>;
  label: string;
  register: UseFormRegister<TaskValues>
}

export type User = {
  id: number;
  name: string;
  role: RoleEnum;
};

export type DropdownProps = {
  label: string;
  users: User[];
  userType: RoleEnum; 
  register: UseFormRegister<ProjectValues>;
  value: Path<ProjectValues>; 
};

export type DropdownMultipleProps = {
  label: string;
  users: User[];
  register: UseFormRegister<ProjectValues>;
  value: Path<ProjectValues>;
};

  
export type DropdownMultipleGeneralProps = {
    label: string;
    users: User[];
    register: UseFormRegister<TaskValues>;
    value: Path<TaskValues>;
};

 export type EnumDropdownProps = {
  label: string;
  enumType: EnumValues; 
  register: UseFormRegister<TaskValues>;
  value: Path<TaskValues>;
};

export type EnumDropdownProjectProps = {
    label: string;
    enumType: EnumValues; 
    register: UseFormRegister<ProjectValues>;
    value: Path<ProjectValues>;
  };

export interface UserLogType {
  email: string;
  password: string;
};

export type UserLogProp = {
  label: string;
  register: UseFormRegister<UserLogType>;
  value: Path<UserLogType>;
};
