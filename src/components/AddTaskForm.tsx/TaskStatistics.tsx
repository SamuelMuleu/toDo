import { Task } from "../Tasks/Tasks";
import styles from "./AddTaskForm.module.css";

interface TaskStatisticsProps {
  tasks: Task[];
  completedTasksCount: number;
}

export function TaskStatistics({ tasks, completedTasksCount }:TaskStatisticsProps){
  return (
    <div className={styles.main}>
      <div className={styles.created}>
        tarefas criadas 
        <div className={styles.counterCreatedTask}>{tasks.length}</div>
      </div>
      <div className={styles.concluded}>
        concluídas
        <div className={styles.counterConcluedTask}>
          {completedTasksCount} de {tasks.length}
        </div>
      </div>
    </div>
  );
};


