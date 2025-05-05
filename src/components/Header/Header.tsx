import styles from "./Header.module.css";
import rocket from "../../assets/rocket.png";
import todo from "../../assets/todo.png";

export function Header() {
  return (
    <div className={styles.header}>
      <img src={rocket} alt="" />
      <img src={todo} alt="" />
    </div>
  );
};

