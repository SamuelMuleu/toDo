import axios from "axios";

export interface Task {
  _id: string;
  title: string;
  completed: boolean;
  createdAt?: string;
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:3001",
  timeout: 12000,
});

export const fetchTasks = () => api.get<Task[]>("/tasks").then((r) => r.data);
export const createTask = (title: string) => api.post<Task>("/tasks", { title }).then((r) => r.data);
export const setTaskCompleted = (id: string, completed: boolean) =>
  api.patch<Task>(`/tasks/${id}`, { completed }).then((r) => r.data);
export const deleteTask = (id: string) => api.delete(`/tasks/${id}`);

export function errorMessage(error: unknown, fallback: string) {
  if (axios.isAxiosError(error)) {
    if (!error.response) return "Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.";
    const msg = (error.response.data as { error?: string } | undefined)?.error;
    if (msg) return msg;
  }
  return fallback;
}
