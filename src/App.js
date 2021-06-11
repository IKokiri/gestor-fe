import './App.css';
import Gestor from './pages/Gestor/Gestor';
import Login from './pages/Login/Login';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <Router>
    <Switch>
      <Route exact path="/">
        <Login/>
      </Route>
      <Route path="/admin">
        <Gestor/>
      </Route>
    </Switch>
  </Router >
  );
}
export default App;
