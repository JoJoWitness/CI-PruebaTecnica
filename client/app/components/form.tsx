import { zodResolver } from "@hookform/resolvers/zod";
import { t } from "i18next";
import { useForm} from "react-hook-form";
import {PriorityEnum, type TaskValues, StatusEnum, type User, type ProjectValues, RoleEnum, type UserLogType} from "~/schemas/types";
import { ProjectSchema, TaskSchema, UserLogSchema} from "~/schemas/zod";
import { DropdownInputGeneralMultiple, DropdownInputMultiple, DropdownInputSingle, EnumDropdown, EnumDropdownProject, InputTextProject, InputTextTask, UserLogInput } from "./inputs";



export const TaskInput = () =>{
  const { register, handleSubmit, formState: { errors } } = useForm<TaskValues>({
    resolver: zodResolver(TaskSchema),
    
  });
  const onSubmit = (data: TaskValues) => {
    console.log("Selected Users:", data);
  };

  const mockUsers = [
    { id: 201, name: "John Doe", role: "USER" } as User,
    { id: 202, name: "Jane Smith", role: "USER" } as User,
  ];
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="dark:text-dark-text-primary text-text-primary text-sm flex flex-col w-full items-center gap-3">
      <InputTextTask label={t("task.titleT")} register={register} value="title" />
      <InputTextTask label={t("task.descriptionT")} register={register} value="description" />
      
      <DropdownInputGeneralMultiple
        label={t("task.users")}
        users={mockUsers} 
        register={register}
        value="assignedToId"
      />
       {errors.assignedToId && <p className="text-red-500">{errors.assignedToId.message}</p>}
      <EnumDropdown
        label={t("task.stat")}
        enumType={Object.values(StatusEnum)}
        register={register}
        value="status"
      />
      <EnumDropdown
        label={t("task.priority")}
        enumType={Object.values(PriorityEnum)} 
        register={register}
        value="priority"
      />
      <button type="submit" className="text-xl border-3 border-primary font-bold bg-primary text-background dark:text-dark-background w-60 rounded-lg px-4 py-2
          hover:bg-transparent hover:text-primary">
        Submit
      </button>
    </form>
  );
} 

export const ProjectInput = () =>{
  const { register, handleSubmit,setValue, watch, formState: { errors } } = useForm<ProjectValues>({
    resolver: zodResolver(ProjectSchema),
    defaultValues: {
        assignedUsersId: [],
      },
  });
  const onSubmit = (data: ProjectValues) => {
    console.log("Selected Users:", data);
  };
  
  const mockUsers = [
    { id: 200, name: "John Smith", role: "ADMIN" } as User,
    { id: 203, name: "Jane Doe", role: "SUPERVISOR" } as User,
    { id: 201, name: "John Doe", role: "USER" } as User,
    { id: 202, name: "Jane Smith", role: "USER" } as User,
    { id: 204, name: "Alex Doe", role: "USER" } as User,
    { id: 205, name: "Maggie Smith", role: "USER" } as User,
    { id: 206, name: "Rachel Doe", role: "USER" } as User,
    { id: 207, name: "Craig Boone", role: "USER" } as User,
    { id: 208, name: "Lucy Maclean", role: "USER" } as User,
    { id: 209, name: "Cooper Howard", role: "USER" } as User,
    { id: 210, name: "Robert House", role: "USER" } as User,
    { id: 211, name: "Maximus", role: "USER" } as User,
    { id: 212, name: "Rose Cassidy", role: "USER" } as User,

  ];
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="dark:text-dark-text-primary text-text-primary text-sm flex flex-col items-center w-full  gap-3">
            
            <InputTextProject label={t("project.titleP")} register={register} value="title" />
            <InputTextProject label={t("project.descriptionP")} register={register} value="description" />
            
            <DropdownInputSingle    
                label={t("project.owner")}
                userType={RoleEnum.SUPERVISOR}
                users={mockUsers} 
                register={register}
                value="ownerId"
            />
            <DropdownInputMultiple
              label={t("project.users")}
              users={mockUsers}
              register={register}
              value="assignedUsersId"
              setValue={setValue} 
              watch={watch} 
            />
             {errors.assignedUsersId && <p className="text-red-500">{errors.assignedUsersId.message}</p>}
            <EnumDropdownProject
                label={t("project.statusValue")}
                enumType={Object.values(StatusEnum)}
                register={register}
                value="status"
            />
            
   
      <button type="submit" className="text-xl border-3 border-primary font-bold bg-primary text-background dark:text-dark-background w-60 rounded-lg px-4 py-2
          hover:bg-transparent hover:text-primary">
        Submit
      </button>
    </form>
  );
} 

export const UserLogForm = () =>{
  const { register, handleSubmit, formState: { errors } } = useForm<UserLogType>({
    resolver: zodResolver(UserLogSchema),
    
  });
  const onSubmit = (data: UserLogType) => {
    console.log("Selected Users:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="dark:text-dark-text-primary text-text-primary text-sm flex flex-col w-full items-center gap-3">
      <UserLogInput label={t("login.email")} register={register} value="email" />
      <UserLogInput label={t("login.password")} register={register} value="password" />
      <button type="submit" className="text-xl border-3 border-primary font-bold bg-primary text-background dark:text-dark-background w-60 rounded-lg px-4 py-2
          hover:bg-transparent hover:text-primary">
        Submit
      </button>
    </form>
  );
}