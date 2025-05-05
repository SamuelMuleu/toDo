import { PlusCircle } from "@phosphor-icons/react";
import styles from "./AddTaskForm.module.css";
import { ChangeEvent, FormEvent } from "react";

interface AddTaskFormProps {
  valueInput: string;
  setValueInput: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
  newTask: (event: FormEvent<HTMLFormElement>) => void;
}

export function AddTaskForm({
  valueInput,
  setValueInput,
  isLoading,

  newTask,
}: AddTaskFormProps) {
  const handleValueInput = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setValueInput(e.target.value);
  };

  return (
    <form className={styles.form} onSubmit={newTask}>
      <input
        className={styles.input}
        onChange={handleValueInput}
        placeholder="Adicione uma nova Tarefa"
        type="text"
        value={valueInput}
      />
      <button disabled={isLoading} className={styles.buttonPlus} type="submit">
        Criar <PlusCircle size={20} />
      </button>
    </form>
  );
}
