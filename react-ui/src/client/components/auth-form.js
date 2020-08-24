import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { auth } from "../store";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SpotifyButton = styled(Link)`
  padding: 10px 30px 10px 30px;
  margin-top: 500px;
  background-color: rgb(36, 212, 78);
  font-family: "Montserrat", sans-serif;
  border-radius: 30px;
  color: white;
`;

const LoginPage = styled.div`
  background-image: url(https://www.freepngimg.com/thumb/headphones/1-2-headphones-png-hd.png),
    linear-gradient(black, ${({ theme }) => theme.primary});
  background-size: contain;
  background-repeat: no-repeat;
  font-family: "Montserrat", sans-serif;
  padding: 20%;
  height: 100vh;
`;

/**
 * COMPONENT
 */

const AuthForm = (props) => {
  const { name, displayName, handleSubmit, error } = props;

  return (
    <LoginPage>
      <SpotifyButton to="/auth/spotify">Login With Spotify</SpotifyButton>
    </LoginPage>
  );
};

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: "login",
    displayName: "Login",
    error: state.user.error,
  };
};

const mapSignup = (state) => {
  return {
    name: "signup",
    displayName: "Sign Up",
    error: state.user.error,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const email = evt.target.email.value;
      const password = evt.target.password.value;
      //this needs to be changed!
      dispatch(auth(email, password, formName));
    },
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object,
};
