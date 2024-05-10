
import rocket from "./assets/rocket.png";
import todo from "./assets/todo.png";

import Tasks from './components/Tasks.tsx';


import { PlusCircle } from "@phosphor-icons/react";
import { v4 as uuidv4 } from 'uuid';

import './global.css'
import styles from "./App.module.css";
import { ChangeEvent, FormEvent, useState } from "react";



interface Task {
  id: string;
  title: string;
  isComplete: boolean;
}


function App() {

  const [tasks, setTasks] = useState<Task[]>([]);

  const [allTasks, setAllTasks] = useState(0);

  const [completedTask, setCompletedTask] = useState(0);





  const [contentInput, setContentInput] = useState('');


  function newTasks(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();





    if (contentInput.trim() !== '') {
      const newTask: Task = {
        id: uuidv4(),
        title: contentInput,
        isComplete: false,
      };

      setTasks([...tasks, newTask]);
      setContentInput('');
      setAllTasks(tasks.length + 1);

    }
  }


  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {

    setContentInput(event.target.value);
  }


  const handleDeleteTask = (taskId: string) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
    setAllTasks(updatedTasks.length);



  }

  const handleToggleComplete = (taskId: string, isChecked: boolean) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, isComplete: isChecked };

      }
      return task;
    });

    setTasks(updatedTasks);


    
    const updatedTasksverify = tasks.map(task => {
      if (task.isComplete) {
        return task.isComplete;
      } else {
        return false;
      }
    });
    console.log(updatedTasksverify);




    setTasks(updatedTasks);


    const completedTasksCount = updatedTasks.filter(task => task.isComplete).length;
    setCompletedTask(completedTasksCount);

    setAllTasks(tasks.length);

  }



  return (

    <div>
      <div className={styles.header}>
        <img src={rocket} alt="" />
        <img src={todo} alt="" />
      </div>


      <form className={styles.form}
        onSubmit={newTasks} >

        <input
          className={styles.input}
          placeholder='Adicione uma nova Tarefa'
          type="text"
          value={contentInput}
          onChange={handleInputChange}
        />
        <button className={styles.buttonPlus}>Criar <PlusCircle
          size={20} /> </button>
      </form>

      <div className={styles.main}>
        <div className={styles.created}>tarefas criadas <div className={styles.counterCreatedTask}>{allTasks}</div></div>
        <div className={styles.concluded} >concluídas <div className={styles.counterConcluedTask}>{completedTask} de {allTasks}</div> </div>

      </div>
      <div className={styles.line}></div>



      <div >

        <Tasks tasks={tasks} onDelete={handleDeleteTask} onToggleComplete={(taskId, isChecked) => handleToggleComplete(taskId, isChecked)} />

      </div>
    </div>
  )
}

export default App
