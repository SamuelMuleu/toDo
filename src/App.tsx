import rocket from "./assets/rocket.png";
import todo from "./assets/todo.png";

import "toastify-js/src/toastify.css";
import Toastify from "toastify-js";

import Tasks, { Task } from "./components/Tasks.tsx";

import { PlusCircle } from "@phosphor-icons/react";

import "./global.css";
import styles from "./App.module.css";
import { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [valueInput, setValueInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  function handleAddTask() {
    Toastify({
      text: "Tarefa criada com sucesso!",
      duration: 2000,
      gravity: "top",
      position: "right",
      backgroundColor: "#4caf50",
    }).showToast();
  }
  function handleErrorCreateTask() {
    Toastify({
      text: "Digite algo antes de Criar uma tarefa!",
      duration: 2000,
      gravity: "top",
      position: "center",
      backgroundColor: "#f44336",
    }).showToast();
  }

  const handleValueInput = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setValueInput(e.target.value);
  };

  const newTask = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (valueInput === "") {
      handleErrorCreateTask()
    }
 
    if (valueInput.trim() !== "") {
      setIsLoading(true);
      const newTask: Omit<Task, "_id"> = {
        title: valueInput,
        completed: false,
      };

      try {
     
        const response = await axios.post(
          "https://to-do-api-production-eb35.up.railway.app/tasks/",
          newTask
        );
  

        setTimeout(() => {
          setTasks((prevTasks) => [...prevTasks, response.data]);
          handleAddTask();

          setIsLoading(false);
          setValueInput("");
        }, 200);
      } catch (error) {
        console.log("Error creating task:", error);
        setIsLoading(false)
      }
    }
  };


  const completedTasksCount = tasks.filter((task) => task.completed).length;

  return (
    <div>
      <div className={styles.header}>
        <img src={rocket} alt="" />
        <img src={todo} alt="" />
      </div>

      <form className={styles.form} onSubmit={newTask}>
        <input
          className={styles.input}
          onChange={handleValueInput}
          placeholder="Adicione uma nova Tarefa"
          type="text"
          value={valueInput}
        />
        <button
         disabled={isLoading}
        className={styles.buttonPlus} 
        type="submit">
          Criar <PlusCircle size={20} />
        </button>
      </form>

      <div className={styles.main}>
        <div className={styles.created}>
          tarefas criadas{" "}
          <div className={styles.counterCreatedTask}>{tasks.length}</div>
        </div>
        <div className={styles.concluded}>
          concluídas{" "}
          <div className={styles.counterConcluedTask}>
            {completedTasksCount} de {tasks.length}
          </div>{" "}
        </div>
      </div>
      <div className={styles.line}></div>

      <div>
        <Tasks tasks={tasks} setTasks={setTasks} />
      </div>
    </div>
  );
}

export default App;
