import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import Header from "./components/organisms/Header";

import StreamList from "./pages/StreamList";
import StreamShow from "./pages/StreamShow";
import StreamEdit from "./pages/StreamEdit";
import StreamCreate from "./pages/StreamCreate";
import StreamDelete from "./pages/StreamDelete";

import history from "./history";
// Podajemy history do BrowserRouter i dostajemy błąd, bo BrowserRouter posiada już swój własny obiekt history
// Żeby podać nasz własny obiekt history, musimy zaimportować zwykłego Router'a, zamiast BrowserRouter'a

// 591985125965-p6vrh2s71mudjg8c8q60vijo211hhqmv.apps.googleusercontent.com

const Root = () => (
  <>
    <Router history={history}>
      <Header />
      <Switch>
        <Route path="/" exact component={StreamList} />
        <Route path="/streams/edit/:id" component={StreamEdit} />
        {/* /:id --> mówi o tym, że będziemy dodawali jakąś zmienną do url. Głównie chodzi o :, ponieważ id możemy zmienić sobie na różne inne nazwy */}
        {/* Jeśli tego nie dodamy, też będzie działało ale chodzi o props'y, które przyjmuje komponent StreamEdit */}
        {/* W tym komponencie w props.match.params mamy właśnie id: "3" --> ta 3 tylko i wyłącznie dla przykładu. Jak napiszemy w path /:car, to będzie w props.match.params car: "3 */}
        <Route path="/streams/new" component={StreamCreate} />
        <Route path="/streams/delete/:id" component={StreamDelete} />
        <Route path="/streams/:id" component={StreamShow} />
      </Switch>
    </Router>
  </>
);

export default Root;
