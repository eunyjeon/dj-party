import React, {useState, useEffects} from 'react'
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const SongList = () => {
  const [trackName, setTrackName] = useState("no song lol");

  const GET_TRACK_BY_NAME = gql`
  {
    queryTracks(byName: "${trackName}") {
      name
    }
  }
  `
}
