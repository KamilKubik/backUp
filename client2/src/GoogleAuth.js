import React from "react";

class GoogleAuth extends React.Component {
  state = {
    isSignedIn: null,
  };

  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "591985125965-p6vrh2s71mudjg8c8q60vijo211hhqmv.apps.googleusercontent.com",
          scope: "email",
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          console.log(this.auth);
          this.setState({ isSignedIn: this.auth.isSignedIn.get() });
          this.auth.isSignedIn.listen(this.onAuthChange); // listen() --> zmienia się, kiedy zmienia się status
        });
    });
  }

  onAuthChange() {
    this.setState({ isSignedIn: this.auth.isSignedIn.get() });
  }

  onSignIn() {
    this.auth.signIn();
  }

  onSignOut() {
    this.auth.signOut();
  }

  renderAuthButton() {
    if (this.state.isSignedIn === null) {
      return null;
    } else if (this.state.isSignedIn === true) {
      return (
        <button onClick={this.onSignOut} className="ui red google button">
          <i className="google icon">Sign Out</i>
        </button>
      );
    } else {
      return (
        <button onClick={this.onSignIn} className="ui red google button">
          <i className="google icon">Sign In with Google</i>
        </button>
      );
    }
  }

  render() {
    console.log(this.state.isSignedIn)
    return <div>{this.renderAuthButton()}</div>;
  }
}

export default GoogleAuth;

  // componentDidMount() {
  //   window.gapi.load('client:auth2', () => {
  //     window.gapi.client
  //       .init({
  //         clientId:
  //           '797401886567-9cumct9mrt3v2va409rasa7fa6fq02hh.apps.googleusercontent.com',
  //         scope: 'email',
  //       })
  //       .then(() => {
  //         this.auth = window.gapi.auth2.getAuthInstance();
  //         this.setState({ isSignedIn: this.auth.isSignedIn.get() });
  //         this.auth.isSignedIn.listen(this.onAuthChange);
  //       });
  //   });
  // }

  // onAuthChange = () => {
  //   this.setState({ isSignedIn: this.auth.isSignedIn.get() });
  // };

  // onSignIn = () => {
  //   this.auth.signIn();
  // };

  // onSignOut = () => {
  //   this.auth.signOut();
  // };
