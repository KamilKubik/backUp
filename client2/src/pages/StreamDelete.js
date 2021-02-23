import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Modal from "../Modal";
import history from "../history";
import { fetchStream, deleteStream } from "../actions";

const StreamDelete = ({ fetchStream, match, stream, deleteStream }) => {
  useEffect(() => {
    fetchStream(match.params.id);
  }, []);

  const actions = ( // A ten zapis strasznie ciekawy!
    <>
      <button
        onClick={() => deleteStream(match.params.id)}
        className="ui negative button"
      >
        Delete
      </button>
      <Link to="/" className="ui button">
        Cancel
      </Link>
    </>
  );

  const onDismiss = () => {
    history.push("/");
  };

  const contentRender = () => {
    if (!stream) {
      return "...Loading";
    }

    return `Are you sure you want to delete the stream with title: ${stream.title}`;
  };

  return (
    <div>
      Stream Delete
      <Modal
        header="Delete Stream"
        content={contentRender()}
        actions={actions}
        onDismiss={onDismiss}
      />
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id],
  };
};

export default connect(mapStateToProps, { fetchStream, deleteStream })(
  StreamDelete
);
