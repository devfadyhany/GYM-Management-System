import React from "react";
import styles from "./messageBox.module.css";
import { Button } from "react-bootstrap";

function MessageBox({ message }) {
  return (
    <div className={styles.messageBoxContainer}>
      <div className={styles.Box}>
        <h3 className="mb-5">{message.text}</h3>
        <div>
          <Button
            onClick={message.yesFunction}
            className="text-white px-5 py-3 me-5"
            variant="success"
          >
            Yes
          </Button>
          <Button
            onClick={message.noFunction}
            className="text-white px-5 py-3"
            variant="danger"
          >
            No
          </Button>
        </div>
      </div>
    </div>
  );
}

export default MessageBox;
