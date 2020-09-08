import React from "react";

import SingleTrack from "./singleTrack";

const SearchResult = ({ list, roomId, playlistId }) => {

  return (
    <div>
      {
        list && list.map((item) =>
        <SingleTrack key={item.id} item={item} roomId={roomId} playlistId={playlistId} />)
      }
    </div>
  );
};

export default SearchResult;
