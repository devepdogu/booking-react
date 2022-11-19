import React from "react";
import { memo } from "react";
import { ArrowRight } from "phosphor-react";
import styles from "./styles.module.scss";
export function Button({
  label,
  children,
  disabled,
  onClickHandle,
  className,
  withArrow = true,
}) {
  const handleOnClick = () =>
    typeof onClickHandle === "function" && onClickHandle();
  return (
    <button
      disabled={disabled}
      className={`${className} ${styles.buttonWrapper}`}
      onClick={handleOnClick}
    >
      {label ?? children}
      {withArrow && <ArrowRight weight="bold" />}
    </button>
  );
}

export default memo(Button);
