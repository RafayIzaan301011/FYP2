import React from "react";
import styles from "./Button.module.css";

interface Props {
  children: string;
  onClick: () => void;
  color?: string;
}

const Button = ({ children, onClick, color = "secondary" }: Props) => {
  return (
    <button
      className={[styles.btn, styles["btn-" + color]].join(" ")}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
