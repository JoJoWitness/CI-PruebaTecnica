import { zodResolver } from "@hookform/resolvers/zod";
import { t } from "i18next";
import { useForm} from "react-hook-form";
import {PriorityEnum, type TaskValues, StatusEnum, type User, type ProjectValues, RoleEnum, type UserLogType, StatusEnumProject, type ProjectType, type TaskType} from "~/schemas/types";
import { ProjectSchema, TaskSchema, UserLogSchema} from "~/schemas/zod";
import { DropdownInputGeneralMultiple, DropdownInputMultiple, DropdownInputSingle, DropdownProject, EnumDropdown, EnumDropdownProject, InputTextProject, InputTextTask, UserLogInput } from "./inputs";
import { useEffect, useState } from "react";
import { createProject, fetchProject, updateProject } from "~/api/projects";
import { fetchUsers } from "~/api/users";
import { useProjects } from "~/hooks/projectData";



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

  const selectedProjectId = watch("projectId") || initialValues?.projectId;
  const { data: projects, isLoading: isProjectsLoading } = useProjects();

    useEffect(() => {
         const fetchData = async () => {
            const data = await fetchProject();
            setProjectsAr(data);
          };
  
        fetchData();
      }, []);


  const assignedUsers = selectedProjectId
    ? projects?.find((proj) => proj.id === parseInt(selectedProjectId))?.assignedUsers || []
    : [];
 

  const onSubmit = async (data: TaskValues) => {
    try {
      if (initialValues?.id) {
        await updateTask(initialValues.id, data);
      } else {
        await createTask(data);
      }
      if (onSubmitSuccess) onSubmitSuccess();
    } catch (error) {
      console.error("Error submitting task:", error);
    }
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="dark:text-dark-text-primary text-text-primary text-sm flex flex-col w-full items-center gap-3">
      
      {!initialValues?.id && ( 
      <DropdownProject
        label={t("task.project")}
        // @ts-ignore
        projects={projects.projects} 
        register={register}
        value="projectId"
      />
      )
      }

      
      <InputTextTask label={t("task.titleT")} register={register} value="title" />
      <InputTextTask label={t("task.descriptionT")} register={register} value="description" />
      
      
      <DropdownInputGeneralMultiple
        label={t("task.users")}
        users={assignedUsers} 
        register={register}
        value="assignedToId"
      />
       {errors.assignedToId && <p className="text-red-500">{errors.assignedToId.message}</p>}
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
      <button type="submit" className="text-xl border-3 border-primary font-bold bg-primary text-background dark:text-dark-background w-60 rounded-lg px-4 py-2
          hover:bg-transparent hover:text-primary">
        Submit
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
  const [users, setUsers] = useState<User[]>([])

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<ProjectValues>({
    resolver: zodResolver(ProjectSchema),
    defaultValues: initialValues
      ? { ...initialValues, status: initialValues.status as StatusEnumProject }
      : {
    
      assignedUsersID: [],
    
    },
  });


  const onSubmit = async (data: ProjectValues) => {
    try {
      if (initialValues?.id) {
       await updateProject(initialValues.id, data);
      } else {

        await createProject(data);
      }
      if (onSubmitSuccess) onSubmitSuccess();
    } catch (error) {
      console.error("Error submitting project:", error);
    }
  };

  useEffect(() => {
   const fetchData = async () => {
         const data = await fetchUsers();
         setUsers(data);
       };
       fetchData();
  }, []);
  
 


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="dark:text-dark-text-primary text-text-primary text-sm flex flex-col items-center w-full  gap-3">
            
            <InputTextProject label={t("project.titleP")} register={register} value="name" />
            <InputTextProject label={t("project.descriptionP")} register={register} value="description" />
            
            {!initialValues?.id && ( 
            
            <DropdownInputSingle    
                label={t("project.owner")}
                userType={RoleEnum.SUPERVISOR}
                users={users} 
                register={register}
                value="ownerId"
            />
            )
             
            }

            
            <DropdownInputMultiple
              label={t("project.users")}
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