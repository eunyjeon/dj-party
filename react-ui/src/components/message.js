import React from "react";

function Message(props) {
  console.log("message props", props)
  return (
    <div>
      <p>
        USER: {props.message}
      </p>
    </div>
  );
}

export default Message;
