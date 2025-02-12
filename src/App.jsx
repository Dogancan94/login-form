import "./App.css";
import Login from "./components/Login";
import { Success } from "./components/Success";
import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route exact path="/success">
          <Success />
        </Route>
      </Switch>
    </>
  );
}

export default App;
