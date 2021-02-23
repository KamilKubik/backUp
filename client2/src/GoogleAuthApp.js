import React, { useEffect, useState } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { connect } from "react-redux";
import { signIn, logOut } from "./actions";

const clientId =
  "591985125965-p6vrh2s71mudjg8c8q60vijo211hhqmv.apps.googleusercontent.com";

const GoogleAuthApp = ({ isLoggedIn, googleId, signIn, logOut }) => {
  const onSuccess = (response) => {
    // console.log(response.profileObj.googleId);
    return signIn(response.profileObj.googleId); // onSuccess odpala się po zalogowaniu. Odpala się wtedy Action Creator, który dostaje googlId jako argument
  };

  const onFailure = (response) => {
    console.log(response);
  };

  const logout = () => {
    return logOut();
  };

  useEffect(() => {
    console.log(googleId);
  }, [isLoggedIn]);

  return (
    <div>
      {isLoggedIn ? (
        <GoogleLogout
          clientId={clientId}
          buttonText="Logout"
          onLogoutSuccess={logout}
          onFailure={onFailure}
          isSignedIn={true}
        />
      ) : (
        <GoogleLogin
          clientId={clientId}
          buttonText="Sign In with Google"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={"single_host_origin"}
          isSignedIn={true}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.loginInformation.isLoggedIn,
    googleId: state.loginInformation.googleId // To jest Id wygenerowane automatycznie przez Google'a. Potrzebujemy je, aby określić użytkowników danych stream'ów
  };
};

export default connect(mapStateToProps, { signIn, logOut })(GoogleAuthApp);
