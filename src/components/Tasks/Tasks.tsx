import { ClipboardText, Trash } from "@phosphor-icons/react";
import { Task } from "../../lib/api";
import styles from "./Tasks.module.css";

interface TasksProps {
  tasks: Task[];
  onToggle: (task: Task) => void;
  onDelete: (task: Task) => void;
}

export function Tasks({ tasks, onToggle, onDelete }: TasksProps) {
  if (tasks.length === 0) {
    return (
      <div className={styles.empty}>
        <ClipboardText size={56} aria-hidden />
        <p>
          <strong>Você ainda não tem tarefas cadastradas</strong>
          <br />
          Crie tarefas e organize seus itens a fazer
        </p>
      </div>
    );
  }

  // Pending tasks first, keeping creation order inside each group
  const ordered = [...tasks.filter((t) => !t.completed), ...tasks.filter((t) => t.completed)];

  return (
    <ul className={styles.list}>
      {ordered.map((task) => (
        <li key={task._id} className={styles.item}>
          <label className={styles.label}>
            <input
              type="checkbox"
              className={styles.checkbox}
              checked={task.completed}
              onChange={() => onToggle(task)}
            />
            <span className={task.completed ? styles.done : undefined}>{task.title}</span>
          </label>
          <button
            type="button"
            className={styles.trash}
            onClick={() => onDelete(task)}
            aria-label={`Excluir tarefa: ${task.title}`}
            title="Excluir tarefa"
          >
            <Trash size={18} />
          </button>
        </li>
      ))}
    </ul>
  );
}
