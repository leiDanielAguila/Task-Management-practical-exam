export interface Task {
  id: number;
  title: string;
  description: string | null;
  is_completed: boolean;
  created_at: string;
  updated_at: string;
}

export interface TaskCreate {
  title: string;
  description?: string | null;
  is_completed?: boolean;
}

export interface TaskUpdate {
  title?: string | null;
  description?: string | null;
  is_completed?: boolean | null;
}

export type TaskFilter = "all" | "active" | "inactive";
