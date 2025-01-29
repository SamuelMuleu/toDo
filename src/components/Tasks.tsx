import { ClipboardText, Trash } from "@phosphor-icons/react";
import styles from "./Tasks.module.css";
import "toastify-js/src/toastify.css";
import Toastify from "toastify-js";
import axios from "axios";


export interface Task {
  _id: string;
  title: string;
  completed: boolean;
}

interface TasksProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

export default function Tasks({ tasks, setTasks }: TasksProps) {


      function handleDeleteTask() {
        Toastify({
          text: "Tarefa excluída!",
          duration: 2000,
          gravity: "top",
          position: "right",
          backgroundColor: "#f44336", 
        }).showToast();
      }
    
    
      const getTasks = async () => {
        try {
          const response = await axios.get(
            `https://to-do-api-production-eb35.up.railway.app/tasks/`
          );
    
         
    
              setTasks(response.data);
         
    
        } catch (error) {
          console.error("Error deleting task:", error);
        }
      };
      getTasks()

      const handleDelete = async (taskId: string) => {
    try {
      await axios.delete(
        `https://to-do-api-production-eb35.up.railway.app/tasks/${taskId}`
      );

     

          setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
          handleDeleteTask()

    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };
  const handleToggleComplete = async (taskId: string, completed: boolean) => {
    try {

      const response = await axios.patch(
        `https://to-do-api-production-eb35.up.railway.app/tasks/${taskId}`,
        { completed: completed } 
      );
  

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, completed: response.data.completed } : task
        )
        
      );


    } catch (error) {
      console.error("Erro ao atualizar tarefa:", error);
    }
  };

  return (
    <div className={styles.tasks}>
        
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <div key={task._id} className={styles.title}>
            <input
              type="checkbox"
              onChange={() => handleToggleComplete(task._id, !task.completed)}
              checked={task.completed }
              className={styles.checkbox}
            />
            <p className={task.completed ? styles.checked : styles.notChecked}>
              {task.title}
            </p>
            <button
              onClick={() => handleDelete(task._id)}
              className={styles.trash}
            >
              <Trash size={20} />
            </button>
          </div>
        ))
      ) : (
        <div className={styles.notTasks}>
          <ClipboardText size={60} color="gray" />
          <p>Você ainda não tem tarefas cadastradas</p>
          <span>Crie tarefas e organize seus itens a fazer</span>
        </div>
      )}
    </div>
  );
}
