import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseMutationResult,
  type UseQueryResult,
} from "@tanstack/react-query";
import type { Task, TaskCreate, TaskFilter, TaskUpdate } from "../types/task";
import {
  createTask,
  deleteTask,
  getTasks,
  toggleTaskStatus,
  updateTask,
} from "../api/taskApi";

export const QUERY_KEYS = {
  TASKS: ["tasks"] as const,
};

export const useTasks = (
  search: string,
  status: TaskFilter,
): UseQueryResult<Task[], Error> => {
  return useQuery({
    queryKey: [...QUERY_KEYS.TASKS, search, status],
    queryFn: () => getTasks(search, status),
    select: (data) => (Array.isArray(data) ? data : []),
  });
};

export const useCreateTask = (): UseMutationResult<Task, Error, TaskCreate> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.TASKS });
    },
  });
};

type UpdatePayload = { taskId: number; data: TaskUpdate };

export const useUpdateTask = (): UseMutationResult<
  Task,
  Error,
  UpdatePayload
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ taskId, data }) => updateTask(taskId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.TASKS });
    },
  });
};

export const useDeleteTask = (): UseMutationResult<
  { message: string },
  Error,
  number
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.TASKS });
    },
  });
};

export const useToggleTaskStatus = (): UseMutationResult<
  Task,
  Error,
  number
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: toggleTaskStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.TASKS });
    },
  });
};
