import React from "react";
import { Link } from "react-router-dom";
import GoogleAuth from "../../GoogleAuth";
import GoogleAuthApp from "../../GoogleAuthApp";

const Header = () => (
  <div className="ui secondary pointing menu">
    <Link to="/" className="item">
      Streamer
    </Link>
    <div className="right menu">
      <Link to="/" className="item">
        All Streams
      </Link>
      <GoogleAuthApp/>
    </div>
  </div>
);

export default Header;
