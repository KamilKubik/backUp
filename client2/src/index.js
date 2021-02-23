import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import combineReducers from "./reducers";
import reduxThunk from "redux-thunk";

import Root from "./Root";

const store = createStore(
  combineReducers,
  compose(
    applyMiddleware(reduxThunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

ReactDOM.render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.querySelector("#root")
);
