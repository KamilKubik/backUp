import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchStream } from "../actions";

const StreamShow = ({ match, fetchStream, stream }) => {
  useEffect(() => {
    fetchStream(match.params.id);
  });

  return (
    <div>
      <h2>{stream.title}</h2>
      <p>{stream.description}</p>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id],
  };
};

export default connect(mapStateToProps, { fetchStream })(StreamShow);
