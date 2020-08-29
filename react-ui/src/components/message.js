import React from "react";

function Message(props) {
  console.log("props for the MESSAGE component:", props)
  return (
    <div>
      <p>
        {props.user.spotifyUsername}: {props.message}
      </p>
    </div>
  );
}

export default Message;
