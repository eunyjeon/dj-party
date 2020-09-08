import React from "react";

import SingleTrack from "./singleTrack";

const SearchResult = ({ list, roomId, playlist }) => {

  return (
    <div>
      {
        list && list.map((item) =>
        <SingleTrack key={item.id} item={item} roomId={roomId} playlist={playlist} />)
      }
    </div>
  );
};

export default SearchResult;
