// Pokazywać, edytować lub usuwać wybrane stream'y można na 2 sposoby. Albo za pomocą redux'a i zmiennej albo za pomocą zmian w url --> lekcja 358
// My będziemy zmieniali url!
// Będziemy porównywali nasze stream'y (nazwaliśmy je wcześniej cyferkami) do id w url (to dostaniemy z props'ów tego komponentu)

// UŻYWAJĄC REACT-ROUTER'A, MUSIMY ZADBAĆ O TO, ŻE KAŻDY KOMPONENT BĘDZIE OSOBNO FETCH'OWAŁ INFORMACJE DLA SIEBIE
// (bo jeśli pobieramy dane z redux'a, to jakby nasz stream, który chcemy edytować, wczytuje się dopiero po wciśnięciu przycisku edit)
// W tej aplikacji nie jest to aż tak duży problem ale jeśli np. ktoś zapisze sobie url z dokładną edycją danego stream'a, to nic mu się nie wyświetli

// To na dole w useEffect(), działa poprawnie!

import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchStream, editStream } from "../actions";
import StreamForm from "./StreamForm";

const StreamEdit = (props) => {
  useEffect(() => {
    if (!props.stream) {
      props.fetchStream(props.match.params.id);
    }
    console.log(props);
  }, [props.stream]);

  const onSubmit = (formValues) => {
    props.editStream(props.match.params.id, formValues);
  };

  return (
    <div>
      <h3>Edit a Stream</h3>
      {props.stream && ( // Pamiętaj, jak Ci coś nie wchodzi przy ładowaniu, to rób takie renderowania różne warunkowe
        <StreamForm
          initialValues={{
            // Można też użyć biblioteki lodash (a dokładniej _.pick(props.stream, 'title', 'description'))
            title: props.stream.title,
            description: props.stream.description,
          }}
          onSubmit={onSubmit}
        />
      )}
      {/* Wystarczy podać props'a initialValues */}
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  // ownProps to po prostu WSZYSTKIE props'y, które są w komponencie StreamEdit (zobacz sobie w console.log poniżej)
  console.log(ownProps);
  return {
    stream: state.streams[ownProps.match.params.id],
    // initialValues: {
    //   // jeśli initialValues === props'owi name w <Field />, to initialValues automatycznie zaczynają działać. Trzeba podać je jako props w danym komponencie, dlatego są tutaj
    //   title: "EDIT ME", // To i to pod spodem przy odświeżeniu nie działa. Problem ten jest napisany u góry w 4 linijce. W tym jednak wypadku trzeba przenieść całą logikę do innego komponentu i podać tam to jako props. Jest to rozwiązane w lekcji 365 oraz 366 i wstęp do tego jest chyba we wcześniejszych
    //   description: "DESCRIPTION EDIT",
    // },
  };
};

export default connect(mapStateToProps, { fetchStream, editStream })(
  StreamEdit
);
