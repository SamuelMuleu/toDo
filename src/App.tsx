import "toastify-js/src/toastify.css";

import Tasks, { Task } from "./components/Tasks/Tasks.tsx";

import Toastify from "toastify-js";
import "./global.css";
import styles from "./App.module.css";
import { Header } from "./components/Header/Header.tsx";
import { FormEvent, useState } from "react";
import { AddTaskForm } from "./components/AddTaskForm.tsx/AddTaskForm.tsx";
import axios from "axios";
import { TaskStatistics } from "./components/AddTaskForm.tsx/TaskStatistics.tsx";

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

  const newTask = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (valueInput === "") {
      handleErrorCreateTask();
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
        setIsLoading(false);
      }
    }
  };

  const completedTasksCount = tasks.filter((task) => task.completed).length;

  return (
    <div>
      <div>
        <Header />
        <AddTaskForm
          valueInput={valueInput}
          setValueInput={setValueInput}
          isLoading={isLoading}

          newTask={newTask}
        />
        <TaskStatistics
          tasks={tasks}
          completedTasksCount={completedTasksCount}
        />
        <div className={styles.line}></div>
        <Tasks tasks={tasks} setTasks={setTasks} />
      </div>
    </div>
  );
}

export default App;
