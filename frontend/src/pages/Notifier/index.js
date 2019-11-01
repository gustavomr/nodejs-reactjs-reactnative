import React from "react";

import "./styles.css";

const Notifier = props => {
  return (
    <div>
      <span>
        {props.message}
        {props.children}
      </span>
    </div>
  );
};
export default Notifier;
