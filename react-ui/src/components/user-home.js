import React from "react";
import styled from "styled-components";
import { ChatRoom } from "./";

//Right now, redux is not set up to check if a user is logged in.  This because we are going to use Apollo to query for user information.  As of now, once you log into Spotify, you'll be redirected to this page.

import { gql, useQuery } from '@apollo/client';

const GET_All_ROOMS = gql`
  query getAllRooms {
    rooms {
      id
      name
      description
      # public
    }
  }
`

const WelcomeDiv = styled.div`
  background-color: ${({ theme }) => theme.primary}
  font-family: 'Cardo', serif;
`;
const Heading = styled.div`
  font-family: "Montserrat", sans-serif;
  color: ${({ theme }) => theme.accent};
`;

/**
 * COMPONENT
 */
export const UserHome = (props) => {
  const { loading, error, data } =useQuery(GET_All_ROOMS)

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  console.log(data)

  return (
    <>
      <WelcomeDiv>
        <Heading>
          <h1>Welcome Username</h1>
          <ul>
            {
              data.map(room =>
                <li>
                  {room.name}
                  {room.description}
                </li>)
            }
          </ul>
        </Heading>
        <ChatRoom />
      </WelcomeDiv>
    </>
  );
};

/**
 * CONTAINER
 */
// const mapState = state => {
//   return {
//     spotifyId: state.user.spotifyId
//   }
// }

export default UserHome;

// /**
//  * PROP TYPES
//  */
// UserHome.propTypes = {
//   spotifyId: PropTypes.string
// }
