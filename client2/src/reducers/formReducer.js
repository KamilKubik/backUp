/* eslint-disable import/no-anonymous-default-export */

import _ from "lodash";

export default (state = {}, action) => {
  switch (action.type) {
    case "FETCH_STREAMS":
      return { ...state, ..._.mapKeys(action.payload, "id") }; // Lekcja 346 --> tam jest o _.mapKeys()
    case "FETCH_STREAM":
      return { ...state, [action.payload.id]: action.payload };
    case "CREATE_STREAM":
      return { ...state, [action.payload.id]: action.payload };
    case "EDIT_STREAM":
      return { ...state, [action.payload.id]: action.payload };
    case "DELETE_STREAM":
      return _.omit(state, action.payload); // Nie musimy pisać action.payload.id, bo action.payload = id, w przypadku Action DELETE_STREAM
    // _.omit() tworzy totalnie nowy objekt. Pierwszy argument (state) mówi o tym, co ma zawierać nowo utworzony objekt, a drugi argument (action.payload) mówi o tym, co usuwamy jakby z tego pierwszego argumentu (czyli w naszym przypadku ze state'a)
    default:
      return state;
  }
};
