import React, { ReactElement } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Claim } from "./views/Claim";
import { Create } from "./views/Create";
import { Distribute } from "./views/Distribute";
import { Home } from "./views/Home";
import { Identity } from "./views/Identity";
import { Groups } from "./views/Groups";

export const Router = (): ReactElement => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/claim">
          <Claim />
        </Route>
        <Route path="/identity">
          <Identity />
        </Route>
        <Route path="/distribute">
          <Distribute />
        </Route>
        <Route path="/create">
          <Create />
        </Route>
        <Route path="/groups">
          <Groups />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};
