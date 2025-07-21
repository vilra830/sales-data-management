import React from "react";
import styles from "./ErrorBanner.module.scss";

interface ErrorBannerProps {
  message: string;
  onDismiss: () => void;
}

const ErrorBanner: React.FC<ErrorBannerProps> = ({ message, onDismiss }) => {
  return (
    <div className={styles.errorBanner}>
      <p>{message}</p>
      <button className={styles.dismissButton} onClick={onDismiss}>
        ✖
      </button>
    </div>
  );
};

export default ErrorBanner;
