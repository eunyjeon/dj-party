import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled from "styled-components";

//Right now, redux is not set up to check if a user is logged in.  This because we are going to use Apollo to query for user information.  As of now, once you log into Spotify, you'll be redirected to this page.

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
  return (
    <>
      <WelcomeDiv>
        <Heading>
          <h1>Welcome Username</h1>
        </Heading>
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
