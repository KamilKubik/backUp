import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchStreams } from "../actions";

const StreamList = ({ fetchStreams, streams, adminId, isLoggedIn }) => {
  useEffect(() => {
    fetchStreams();
  }, []);

  const renderAdminButtons = (stream) => {
    if (adminId === stream.googleId) {
      return (
        <div className="right floated content">
          <Link to={`/streams/edit/${stream.id}`} className="ui button primary">
            Edit
          </Link>
          <Link
            to={`/streams/delete/${stream.id}`}
            className="ui button negative"
          >
            Remove
          </Link>
        </div>
      );
    }
  };

  const renderCreateButton = () =>
    isLoggedIn ? (
      <div style={{ textAlign: "right", marginRight: "25px" }}>
        <Link to="/streams/new" className="ui button primary">
          Create Stream
        </Link>
      </div>
    ) : (
      <div style={{ textAlign: "right", marginRight: "25px" }}>
        Log In to create new Stream
      </div>
    );

  const renderList = () => {
    return streams.map((stream) => {
      return (
        <div className="item" key={stream.id}>
          {renderAdminButtons(stream)}
          {/* Te buttony renderują się po zalogowaniu na SWOJE konto. Czyli generują się przy streamie, który stworzony został przez danego użytkownika */}
          <i className="large middle aligned icon camere" />

          <div className="content">
            <Link to={`streams/${stream.id}`} className="header">{stream.title}</Link>
            <div className="description">{stream.description}</div>
          </div>
        </div>
      );
    });
  };

  console.log(streams);

  return (
    <div>
      <h2>Streams</h2>
      <div className="ui celled list">{renderList()}</div>
      {renderCreateButton()}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    streams: Object.values(state.streams),
    adminId: state.loginInformation.googleId,
    isLoggedIn: state.loginInformation.isLoggedIn,
  }; // Object.values() tworzy tablicę na postawię obiektów.
};

export default connect(mapStateToProps, { fetchStreams })(StreamList);
