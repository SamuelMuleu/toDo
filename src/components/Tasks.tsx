import { ClipboardText, Trash } from "@phosphor-icons/react";
import styles from "./Tasks.module.css";

interface Task {
    id: string;
    title: string;
    isComplete: boolean;
}

interface TasksProps {
    tasks: Task[];
    onDelete: (taskId: string) => void;
    onToggleComplete: (taskId: string, isChecked: boolean) => void;
}

export default function Tasks(props: TasksProps) {
    const { tasks, onDelete, onToggleComplete } = props;

    return (
        <div className={styles.tasks}>
            {tasks.length > 0 ? (
                tasks.map(t => (
                    <div key={t.id} className={styles.title}>
                        <input
                            type="checkbox"
                            onChange={() => onToggleComplete(t.id, !t.isComplete)} // Invertendo o estado de isComplete
                            checked={t.isComplete}
                            className={styles.checkbox}
                        />
                        <p className={t.isComplete ? styles.checked : styles.notChecked}>{t.title}</p>
                        <button onClick={() => onDelete(t.id)} className={styles.trash}><Trash size={20} /></button>
                    </div>
                ))
            ) : (
                <div className={styles.notTasks}>
                    <ClipboardText size={60} color='gray' />
                    <p>Você ainda não tem tarefas cadastradas</p>
                    <span>Crie tarefas e organize seus itens a fazer</span>
                </div>
            )}
        </div>
    );
}
