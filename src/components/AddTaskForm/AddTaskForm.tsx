import { FormEvent, useState } from "react";
import { PlusCircle } from "@phosphor-icons/react";
import styles from "./AddTaskForm.module.css";

interface AddTaskFormProps {
  onCreate: (title: string) => Promise<boolean>;
  disabled?: boolean;
}

const MAX = 200;

export function AddTaskForm({ onCreate, disabled = false }: AddTaskFormProps) {
  const [title, setTitle] = useState("");
  const [saving, setSaving] = useState(false);
  const trimmed = title.trim();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!trimmed || saving) return;
    setSaving(true);
    const ok = await onCreate(trimmed);
    setSaving(false);
    if (ok) setTitle("");
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label htmlFor="new-task" className="sr-only">
        Nova tarefa
      </label>
      <input
        id="new-task"
        className={styles.input}
        placeholder="Adicione uma nova tarefa"
        value={title}
        maxLength={MAX}
        autoComplete="off"
        disabled={disabled}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button className={styles.button} type="submit" disabled={disabled || saving || !trimmed}>
        {saving ? "Criando..." : "Criar"} <PlusCircle size={18} weight="bold" aria-hidden />
      </button>
    </form>
  );
}
