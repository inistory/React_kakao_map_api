import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// import MapContiner from "./components/MapContiner";
import SearchPlace from "./components/SearchPlace";
function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={SearchPlace} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
