import axios from "axios";
import { get } from "lodash";
import streams from "../apis/streams";
import history from '../history';

export const signIn = (id) => {
  return {
    type: "SIGN_IN",
    payload: id,
  };
};

export const logOut = () => {
  return {
    type: "LOG_OUT",
    payload: null,
  };
};

export const createStream = (formValues) => async (dispatch, getState) => {
  // drugi argument, czyli getState, pozwala wziąć jakieś informacje, dane z naszego store'a
  const { googleId } = getState().loginInformation; // Nie wiem jeszcze, czy to na pewno działa
  const response = await streams.post("/streams", { ...formValues, googleId });
  dispatch({ type: "CREATE_STREAM", payload: response.data });
  // Tutaj będziemy robić programmatic navigation (czyli, po jakiejś akcji wykona się przeniesienie na inną stronę). Tego właśnie szukałeś!
  // Jak jednak to zrobić? BrowserRouter ma object history. Zbiera tam historię naszego url jakby, które zostało zmieniane.
  // Za każdym razem, kiedy przenosimy się na inną stronę, używając jakiegoś komponentu (który przedstawia tą stronę), ten komponent dostaje props'a w postaci właśnie tego obiektu history
  // Dlatego zrobienie programmatic navigation jest dość proste w danych komponentach, które korzystają z BrowserRouter.
  // W tym przypadku nie mamy jednak takiego komponentu, więc jak dostać się do obiektu history?
  // Jednym z rozwiązań jest w funkcji createStream jako argument podać history i w komponencie, w którym występuje funkcja createStream po prostu przerzucić ten obiekt history
  // Drugim rozwiązaniem jest stworzenie samemu obiektu history, a co za tym idzie, stworzenie własnego BrowserRouter'a i potem zaimportowanie po prostu tego obiektu
  // My oczywiście wybieramy tą drugą opcję! Ta pierwsza jest trochę nieadekwatna(?).
  // Tworzymy osobny folder --> history.js
  history.push("/");
  // W taki sposób podajemy ścieżkę, do której mamy się przenieść!
  // Po uruchomieniu funkcji createStream, od razu zostajemy przeniesieni do "/".
};

export const fetchStreams = () => async (dispatch) => {
  const response = await streams.get("/streams");
  dispatch({ type: "FETCH_STREAMS", payload: response.data });
};

export const fetchStream = (id) => async (dispatch) => { // Tego używamy dość często (np. przy edit oraz delte), żeby mieć dostęp do konkretnego stream'a i odwołać się jakby do niego w edit albo delte
  const response = await streams.get(`/streams/${id}`);
  dispatch({ type: "FETCH_STREAM", payload: response.data });
};

// Z requestem put jest taki mały, A RACZEJ DUŻY problem. Mało dokumentacji podobno o tym mówi ale put request działa tak,
// że wszystkie dane, które podamy w formValues zastąpią dane, które były obecnie (czyli do czasu tej zmiany)
// W naszym projekcie powoduje to problem, bo mieliśmy googleId, które pozwalało edytować stream'y poszczególnym użytkownikom
// Przy zmianie, nie podajemy za pomocą formValues tego googleId, więc w zmienionej części ta wartość po prostu nie istnieje

// Żeby temu zapobiec możemy skorzystać z request'a patch, zamiast z request'a put.
// Request patch zmienia tylko te wartości / zmienne, które podamy, a resztę zostawia w spokoju!
export const editStream = (id, formValues) => async (dispatch) => { // formValues to informacje / dane, które chcemy zaktualizować
  const response = await streams.patch(`/streams/${id}`, formValues);
  dispatch({ type: "EDIT_STREAM", payload: response.data });
  history.push("/");
};

export const deleteStream = (id) => async (dispatch) => {
  await streams.delete(`/streams/${id}`);
  dispatch({ type: "DELETE_STREAM", payload: id });
  history.push("/");
};
