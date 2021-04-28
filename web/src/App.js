import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import SearchPlace from "./components/SearchPlace";
import ButtonSearch from "./components/ButtonSearch";
function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={SearchPlace} />
          <Route exact path="/ButtonSearch" component={ButtonSearch} />ß
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
