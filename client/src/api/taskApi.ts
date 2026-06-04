import axios from "axios";
import type { Task, TaskCreate, TaskFilter, TaskUpdate } from "../types/task";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getTasks = async (
  search?: string,
  status?: TaskFilter,
): Promise<Task[]> => {
  const normalizedSearch = search?.trim();
  const response = await api.get<Task[]>("/tasks", {
    params: {
      search:
        normalizedSearch && normalizedSearch.length > 0
          ? normalizedSearch
          : undefined,
      status,
    },
  });
  return response.data;
};

export const createTask = async (payload: TaskCreate): Promise<Task> => {
  const response = await api.post<Task>("/tasks", payload);
  return response.data;
};

export const updateTask = async (
  taskId: number,
  payload: TaskUpdate,
): Promise<Task> => {
  const response = await api.put<Task>(`/tasks/${taskId}`, payload);
  return response.data;
};

export const toggleTaskStatus = async (taskId: number): Promise<Task> => {
  const response = await api.patch<Task>(`/tasks/${taskId}/toggle`);
  return response.data;
};

export const deleteTask = async (
  taskId: number,
): Promise<{ message: string }> => {
  const response = await api.delete<{ message: string }>(`/tasks/${taskId}`);
  return response.data;
};
