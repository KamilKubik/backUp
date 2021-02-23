import React from "react";
import ReactDOM from "react-dom";
import history from "./history";

const Modal = ({ header, content, actions, onDismiss }) => {
  return ReactDOM.createPortal(
    // createPortal() przyjmuje 2 argumenty. Pierwszy z nich to to, co chcemy wyświetlić na ekranie
    <div
      onClick={() => onDismiss()} // Jeśli klikniemy poza naszym modealem, wychodzimy z niego. To jednak nie działa poprawnie, bo klikając na sam modal, również z niego wyjdziemy. Dzieje się tak przez bubble (wiesz o co chodzi)
      className="ui dimmer modals visible active"
    >
      <div
        onClick={(e) => e.stopPropagation()} // Dlatego w tym miejscu piszemy coś takiego i to stopuje to całe bubble. Teraz wychodzimy z modala, tylko klikając na przestrzeń poza nim, a nie na niego samego
        className="ui standard modal visible active"
      >
        <div className="header">{header}</div>
        <div className="content">{content}</div>
        <div className="actions">{actions}</div>
      </div>
    </div>,
    document.querySelector("#modal")
    // Drugi argument to element, w którym chcemy wyrenderować nasz portal (czyli to, co zapisaliśmy w pierwszym argumencie)
    // CO WAŻNE, możemy przypiąć nasz portal bezpośrednio do div'u #root ale wtedy zastąpimy całą naszą aplikację
    // Dlatego często tworzy się po prostu osobnego div'a w public/index.html
  );
};

export default Modal;
