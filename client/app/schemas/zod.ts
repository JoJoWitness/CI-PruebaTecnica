import { z, ZodType } from "zod";
import type { ProjectValues, TaskValues, UserLogType, UserValues } from "./types";
import { PriorityEnum, RoleEnum, StatusEnum, StatusEnumProject } from "./types";

export const UserSchema: ZodType<UserValues> = z.object({ 
  name: z.string(),
  email: z.string().email("Invalid email format"),
  password: z.string().min(8).regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/).optional(),
  role: z.nativeEnum(RoleEnum),
  refreshToken: z.string().optional()
});

export const ProjectSchema: ZodType<ProjectValues> =  z.object({ 
    name: z.string(),
    description: z.string().optional(),
    ownerId: z.number(),
    assignedUsersID: z.number().array().min(1, "At least one user must be assigned"),
    status: z.nativeEnum(StatusEnumProject),
  
});

export const TaskSchema: ZodType<TaskValues> = z.object({
    title: z.string(),
    description: z.string().optional(),
    assignedToId: z.number(),
    projectId: z.number(),
    status: z.nativeEnum(StatusEnum),
    priority: z.nativeEnum(PriorityEnum),
});

export const UserLogSchema: ZodType<UserLogType> = z.object({
  email: z.string(),
  password: z.string().min(8),
});