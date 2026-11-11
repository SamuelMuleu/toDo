import { useCallback, useEffect, useState } from "react";
import { Header } from "./components/Header/Header";
import { AddTaskForm } from "./components/AddTaskForm/AddTaskForm";
import { TaskStatistics } from "./components/AddTaskForm/TaskStatistics";
import { Tasks } from "./components/Tasks/Tasks";
import { Task, createTask, deleteTask, errorMessage, fetchTasks, setTaskCompleted } from "./lib/api";
import styles from "./App.module.css";
import "./global.css";

type LoadState = "loading" | "ready" | "error";

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loadState, setLoadState] = useState<LoadState>("loading");
  const [notice, setNotice] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoadState("loading");
    try {
      setTasks(await fetchTasks());
      setLoadState("ready");
    } catch (error) {
      setNotice(errorMessage(error, "Não foi possível carregar as tarefas."));
      setLoadState("error");
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  // Auto-hide notices after a few seconds
  useEffect(() => {
    if (!notice || loadState === "error") return;
    const t = setTimeout(() => setNotice(null), 4000);
    return () => clearTimeout(t);
  }, [notice, loadState]);

  async function handleCreate(title: string) {
    try {
      const task = await createTask(title);
      setTasks((prev) => [...prev, task]);
      setNotice(null);
      return true;
    } catch (error) {
      setNotice(errorMessage(error, "Não foi possível criar a tarefa."));
      return false;
    }
  }

  // Optimistic updates: change the UI right away and roll back on failure
  async function handleToggle(task: Task) {
    const completed = !task.completed;
    setTasks((prev) => prev.map((t) => (t._id === task._id ? { ...t, completed } : t)));
    try {
      await setTaskCompleted(task._id, completed);
    } catch (error) {
      setTasks((prev) => prev.map((t) => (t._id === task._id ? { ...t, completed: task.completed } : t)));
      setNotice(errorMessage(error, "Não foi possível atualizar a tarefa."));
    }
  }

  async function handleDelete(task: Task) {
    const snapshot = tasks;
    setTasks((prev) => prev.filter((t) => t._id !== task._id));
    try {
      await deleteTask(task._id);
    } catch (error) {
      setTasks(snapshot);
      setNotice(errorMessage(error, "Não foi possível excluir a tarefa."));
    }
  }

  const completed = tasks.filter((t) => t.completed).length;

  return (
    <>
      <Header />
      <main className={styles.container}>
        <AddTaskForm onCreate={handleCreate} disabled={loadState !== "ready"} />

        {notice && loadState !== "error" && (
          <p role="alert" className={styles.notice}>
            {notice}
          </p>
        )}

        <TaskStatistics total={tasks.length} completed={completed} />

        {loadState === "loading" && (
          <ul className={styles.skeleton} aria-busy="true" aria-label="Carregando tarefas">
            {[0, 1, 2].map((i) => (
              <li key={i} />
            ))}
          </ul>
        )}

        {loadState === "error" && (
          <div role="alert" className={styles.errorBox}>
            <p>{notice}</p>
            <button type="button" onClick={load}>
              Tentar novamente
            </button>
          </div>
        )}

        {loadState === "ready" && <Tasks tasks={tasks} onToggle={handleToggle} onDelete={handleDelete} />}
      </main>
    </>
  );
}
