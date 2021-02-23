import React from "react";
import { connect } from "react-redux";
import { createStream } from "../actions";
import StreamForm from './StreamForm';

const StreamCreate = (props) => {

  const onSubmit = (formValues) => {
    props.createStream(formValues);
  };

  // W Field, wrzucamy nasz komponent, w którym zwracamy to, co chcemy wyświetlić
  return (
    <div>
      <h3>Create a Stream</h3>
      <StreamForm onSubmit={onSubmit} /> {/* Te propsy idą do ReduxForm'a, a nie do samego komponentu, pamiętaj o tym! */}
    </div>
  );
};

export default connect(null, { createStream })(StreamCreate);
