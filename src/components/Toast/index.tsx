import React, { useEffect } from "react";
import { ToastStatus } from "../../enums/toast";
import "./styles.css";

type ToastProps = {
  message: string;
  type?: ToastStatus | string;
  onClose: () => void;
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  type = ToastStatus.SUCCESS,
  onClose,
  duration = 3000,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div className={`toast ${type}`}>
      <span>{message}</span>
      <button className="close-btn" onClick={onClose} aria-label="Close">
        ×
      </button>
    </div>
  );
};
