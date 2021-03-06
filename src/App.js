import "./App.css";
import React from "react";
import Sidebar from "./Components/Sidebar/Sidebar";
import Chat from "./Components/Chat/Chat";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from './Components/Login/Login';
import { useStateValue } from "./StateProvider/StateProvider";

function App() {

  const [{user},dispatch] = useStateValue();

  return (
    <div className="app">
      { !user ? <Login />
       : <div className="app_body">
        <Router>
              <Sidebar />
          <Switch>
            <Route path="/groups/:groupId">
              <Chat />
            </Route>
            <Route path="/">
              <Chat />
            </Route>
          </Switch>
        </Router>
      </div>}
    </div>
  );
}

export default App;
