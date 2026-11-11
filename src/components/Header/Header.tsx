import styles from "./Header.module.css";
import rocket from "../../assets/rocket.png";
import todo from "../../assets/todo.png";

export function Header() {
  return (
    <header className={styles.header}>
      <img src={rocket} alt="" width={22} height={36} />
      <img src={todo} alt="todo" height={32} />
    </header>
  );
}
