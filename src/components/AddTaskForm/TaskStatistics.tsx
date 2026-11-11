import styles from "./AddTaskForm.module.css";

interface TaskStatisticsProps {
  total: number;
  completed: number;
}

export function TaskStatistics({ total, completed }: TaskStatisticsProps) {
  return (
    <div className={styles.stats}>
      <span className={styles.created}>
        Tarefas criadas <span className={styles.counter}>{total}</span>
      </span>
      <span className={styles.concluded}>
        Concluídas{" "}
        <span className={styles.counter}>{total ? `${completed} de ${total}` : 0}</span>
      </span>
    </div>
  );
}
