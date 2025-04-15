import { zodResolver } from "@hookform/resolvers/zod";
import { t } from "i18next";
import { useForm} from "react-hook-form";
import {PriorityEnum, type TaskValues, StatusEnum, type User, type ProjectValues, RoleEnum, type UserLogType, StatusEnumProject, type ProjectType, type TaskType, type UserType, type UserValues} from "~/schemas/types";
import { ProjectSchema, TaskSchema, UserLogSchema, UserSchema} from "~/schemas/zod";
import { DropdownInputGeneralMultiple, DropdownInputMultiple, DropdownInputSingle, DropdownProject, EnumDropdown, EnumDropdownProject, EnumDropdownUser, InputTextProject, InputTextTask, InputTextUser, UserLogInput } from "./inputs";
import { useEffect, useState } from "react";
import { createProject, fetchProject, updateProject } from "~/api/projects";
import { createUsers, fetchUsers, updateUsers } from "~/api/users";
import { useProjects } from "~/hooks/useProjetcs";
import { createTask, updateTask } from "~/api/tasks";
import { useUsers } from "~/hooks/useUsers";
import { useAuth } from "~/hooks/useAuth";





export const TaskInput = ({
  initialValues,
  project,
  onSubmitSuccess,
}: {
  initialValues?: TaskType ;
  projects?: ProjectType[];
  project?: ProjectType; // Optional project
  onSubmitSuccess?: () => void;
}) => {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<TaskValues>({
    resolver: zodResolver(TaskSchema),
    defaultValues: initialValues 
      ? { ...initialValues, status: initialValues.status as StatusEnum, priority: initialValues.priority as PriorityEnum }
      : {}
  });
  const projects = useProjects()
  console.log("Projects in TaskInput:",  useProjects());
  const selectedProjectId = watch("projectId") || initialValues?.projectId;
  const assignedUsers = selectedProjectId
    // @ts-ignore
    ? projects?.find((proj) => proj.id === parseInt(selectedProjectId))?.assignedUsers || []
    : [];
 
  const { token } = useAuth();
  console.log(token)

  const onSubmit = async (data: TaskValues) => {
    try {
      if (initialValues?.id) {
        //@ts-ignore
        await updateTask(initialValues.id, data,token);
      } else {
        //@ts-ignore
        await createTask(data, token);
      }
      if (onSubmitSuccess) onSubmitSuccess();
    } catch (error) {
      console.error("Error submitting task:", error);
    }
  };
  
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="dark:text-dark-text-primary text-text-primary text-sm flex flex-col w-full items-center gap-3 px-4 sm:px-8"
    >
      {!initialValues?.id && (
        <DropdownProject
          label={t("task.project")}
          // @ts-ignore
          projects={projects}
          register={register}
          value="projectId"
        />
      )}

      <InputTextTask
        label={t("task.titleT")}
        register={register}
        value="title"
      />
      <InputTextTask
        label={t("task.descriptionT")}
        register={register}
        value="description"
      />

      <DropdownInputGeneralMultiple
        label={t("task.users")}
        users={assignedUsers}
        register={register}
        value="assignedToId"
      />
      {errors.assignedToId && (
        <p className="text-red-500">{errors.assignedToId.message}</p>
      )}
      <EnumDropdown
        label={t("task.stat")}
        // @ts-ignore
        enumType={Object.values(StatusEnum)}
        register={register}
        value="status"
      />
      <EnumDropdown
        label={t("task.priority")}
        // @ts-ignore
        enumType={Object.values(PriorityEnum)}
        register={register}
        value="priority"
      />
      <button
        type="submit"
        className="text-xl border-3 border-primary font-bold bg-primary text-background dark:text-dark-background w-full sm:w-60 rounded-lg px-4 py-2 hover:bg-transparent hover:text-primary"
      >
        {t("submit")}
      </button>
    </form>
  );
} 

export const ProjectInput = ({
  initialValues,
  onSubmitSuccess,
}: {
  initialValues?: {
    id?: number;
    name: string;
    description: string;
    assignedUsersID: number[];
    ownerId?: number;
    status: string;
  };
  onSubmitSuccess?: () => void;
}) =>{
  const users = useUsers()

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<ProjectValues>({
    resolver: zodResolver(ProjectSchema),
    defaultValues: initialValues
      ? { ...initialValues, status: initialValues.status as StatusEnumProject }
      : {
    
      assignedUsersID: [],
    
    },
  });

  const token = useAuth();
  console.log(token)

  const onSubmit = async (data: ProjectValues) => {
    try {
      if (initialValues?.id) {
        //@ts-ignore
       await updateProject(initialValues.id, data, token);
      } else {
        //@ts-ignore
        await createProject(data,token);
      }
      if (onSubmitSuccess) onSubmitSuccess();
    } catch (error) {
      console.error("Error submitting project:", error);
    }
  };


 


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="dark:text-dark-text-primary text-text-primary text-sm flex flex-col items-center w-full  gap-3">
            
            <InputTextProject label={t("project.titleP")} register={register} value="name" />
            <InputTextProject label={t("project.descriptionP")} register={register} value="description" />
            
            {!initialValues?.id && ( 
            
            <DropdownInputSingle    
                label={t("project.owner")}
                userType={RoleEnum.SUPERVISOR}
                // @ts-ignore
                users={users} 
                register={register}
                value="ownerId"
            />
            )
             
            }

            
            <DropdownInputMultiple
              label={t("project.users")}
              // @ts-ignore
              users={users}
              register={register}
              value="assignedUsersID"
              setValue={setValue} 
              watch={watch} 
            />
             {errors.assignedUsersID && <p className="text-red-500">{errors.assignedUsersID.message}</p>}
            <EnumDropdownProject
                label={t("project.statusValue")}
                // @ts-ignore
                enumType={Object.values(StatusEnumProject)}
                register={register}
                value="status"
            />
            
   
      <button type="submit" className="text-xl border-3 border-primary font-bold bg-primary text-background dark:text-dark-background w-60 rounded-lg px-4 py-2
          hover:bg-transparent hover:text-primary">
         {t("submit")}
      </button>
    </form>
  );
} 

export const UserForm = ({
  initialValues,
  onSubmitSuccess,
}: {
  initialValues?:{ 
    id?: number;
    name: string;
    email: string;
    password?: string;
    role: RoleEnum; 
  
  }
  onSubmitSuccess?: () => void; 
}) => {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<UserValues>({
    resolver: zodResolver(UserSchema),
    defaultValues: initialValues 
      ? { ...initialValues}
      : {
    
    
    }, 
  });

  const token = useAuth();
  console.log(token)

  const onSubmit = async (data: UserValues) => {
    try {
      if (initialValues?.id) {
        //@ts-ignore
        await updateUsers(initialValues.id, data, token);
      } else {
        //@ts-ignore
        await createUsers(data, token);
      }
      if (onSubmitSuccess) onSubmitSuccess(); 
    } catch (error) {
      console.error("Error submitting user:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="dark:text-dark-text-primary text-text-primary text-sm flex flex-col w-full items-center gap-3"
    >
   
    <InputTextUser label={t("user.name")} register={register} value="name" />
    {/*If one wants to change the password or email of a user is best to simply delete that user */} 
    {!initialValues?.id && (
      <>
        <InputTextUser label={t("user.email")} register={register} value="email" />
        <InputTextUser label={t("user.password")} register={register} value="password" />
      </>
    )}

    <EnumDropdownUser
        label={t("user.role")}
        // @ts-ignore
        enumType={Object.values(RoleEnum)}
        register={register}
        value="role"
    />
    

      <button
        type="submit"
        className="text-xl border-3 border-primary font-bold bg-primary text-background dark:text-dark-background w-60 rounded-lg px-4 py-2 hover:bg-transparent hover:text-primary"
      >
        {t("submit")}
      </button>
    </form>
  );
};

export const UserLogForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<UserLogType>({
    resolver: zodResolver(UserLogSchema),
  });

  const {login} = useAuth()
  const onSubmit = async (data: UserLogType) => {
    try {
      await login(data.email, data.password); 
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="dark:text-dark-text-primary text-text-primary text-sm flex flex-col w-full items-center gap-3"
    >
      <UserLogInput type="text" label={t("login.email")} register={register} value="email" />
      <UserLogInput type="password" label={t("login.password")} register={register} value="password" />
      {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      {errors.password && <p className="text-red-500">{errors.password.message}</p>}
      <button
        type="submit"
        className="text-xl border-3 border-primary font-bold bg-primary text-background dark:text-dark-background w-60 rounded-lg px-4 py-2 hover:bg-transparent hover:text-primary"
      >
        {t("submit")}
      </button>
    </form>
  );
};