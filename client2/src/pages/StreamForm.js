import React from "react";
import { Field, reduxForm } from "redux-form";

const StreamForm = (props) => {
  // Nasz komponent przyjmuje argument, zobacz sobie jak bardzo wiele metod posiada!

  const renderError = ({ error, touched }) => {
    // touched dostajemy od formProps.meta.error (Jeśli mamy focus na inpucie to touched = false, ale jeśli klikniemy poza naszego input'a zmienia się na true)
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  };

  const renderInput = (formProps) => {
    console.log(formProps);
    return (
      <div
        className={`field ${
          formProps.meta.error && formProps.meta.touched ? "error" : ""
        }`}
      >
        <label>{formProps.label}</label>
        <input
          {...formProps.input} // To jest krótszym zapisem tego, co mamy zaraz pod tą linijką (opróc onChange oraz value) daje nam oczywiście jeszcze inne props'y
          // onChange={formProps.input.onChange}
          // value={formProps.input.value}
          autoComplete="off"
        />
        {/* {formProps.meta.error} Masz rozpisane na telefonie w notatkach. Idziemy o krok dalej i piszemy to, co jest linijkę niżej */}
        {renderError(formProps.meta)}
      </div>
    );
  };

  const onSubmit = (formProps) => {
    props.onSubmit(formProps);
  };

  // W Field, wrzucamy nasz komponent, w którym zwracamy to, co chcemy wyświetlić
  return (
    <form onSubmit={props.handleSubmit(onSubmit)} className="ui form error">
      {/* Musimy dodać klasę error, bo jak u góry mamy klasę w divi'e "ui error message", to dostanie ten div display: none. Tak działa semantic ui, form musi mieć w tym wypadlu klasę error */}
      {/* przez wrzucenie naszego komponentu w reduxForm, jako props'a dostajemy na przykład handleSubmit. Normalnie obsługujemy submit'y trochę inaczej. W tym przypadku nie musimy pisać na przykład e.preventDefault (handleSubmit() robi to za nas!!!) */}
      {/* co więcej, klikając nasz button, od razu dostajemy wartości, które wpisujemy w input'ach. Nie musimy bawić się już w event.target.value itp itd... */}
      <Field name="title" component={renderInput} label="Enter the Title" />
      {/* Field nie wie, co zrobić z props'em label, więc wrzuca go jako props'a do naszego component, czyli do renderInput */}
      <Field
        name="description"
        component={renderInput}
        label="Enter the Description"
      />
      <button className="ui button primary">Submit</button>
    </form>
  );
};

const validate = (formValues) => {
  const errors = {};

  if (!formValues.title) {
    errors.title = "You must enter a title";
  }

  if (!formValues.description) {
    errors.description = "You must enter a description";
  }

  return errors; // Zwracamy pusty object, jeśli nie ma żadnych błędów (masz zdjęcie takiej jakby rozpiski, mapki jak postępować w notatkach na telefonie w zakładce react form )
};

export default reduxForm({ form: "streamsForm", validate })(StreamForm); // reduxForm przyjmuje tylko jeden argument, jakim jest objekt
