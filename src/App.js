import './App.css';
import Gestor from './pages/Gestor/Gestor';
import {
  BrowserRouter as Router,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Gestor/>      
    </Router>
  );
}
export default App;
