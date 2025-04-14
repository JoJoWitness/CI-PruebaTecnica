import { z, ZodType } from "zod";
import type { ProjectValues, TaskValues } from "./types";
import { PriorityEnum, StatusEnum } from "./types";

export const userSchema = z.object({ 
  id: z.number(),
  name: z.string(),
  email: z.string().email("Invalid email format"),
  password: z.string().min(8).regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/),
  role: z.enum(["ADMIN", "USER", "SUPERVISOR"]), 
  refreshToken: z.string().optional()
});

export const ProjectSchema: ZodType<ProjectValues> =  z.object({ 
    name: z.string(),
    description: z.string().optional(),
    ownerId: z.number(),
    assignedUsersID: z.number().array().min(1, "At least one user must be assigned"),
    status: z.nativeEnum(StatusEnum),
  
});

export const ProjectUpdateSchema = z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    ownerId: z.number().optional(),
    assignedUsersID: z.number().array().min(1, "At least one user must be assigned").optional(),
    status: z.nativeEnum(StatusEnum).optional(),
});

export const TaskSchema: ZodType<TaskValues> = z.object({
    title: z.string(),
    description: z.string().optional(),
    assignedToId: z.number(),
    status: z.nativeEnum(StatusEnum),
    priority: z.nativeEnum(PriorityEnum),
});

export const TaskUpdateSchema = z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    assignedToId: z.number().optional(),
    status: z.nativeEnum(StatusEnum).optional(),
    priority: z.nativeEnum(PriorityEnum).optional(),
});



export const UserLogSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(8).regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/),
});