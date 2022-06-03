import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Landingpage from "./components/LandingPage";
import Home from "./components/Home";
import PokCreate from "./components/PokCreate";
import Detail from "./components/Detail";

function App() {
  return (
    <BrowserRouter> 
    <div className="App">
    <Switch>
        <Route exact path = "/" component = {Landingpage}/>
        <Route exact path = "/home" component = {Home}/>
        <Route path= "/home/:id" component = {Detail}/>
        <Route path = "/types" component = {PokCreate}/>
      </Switch>
      {/* <h1>Henry Pokemon</h1> */}
    </div>
    </BrowserRouter>
  );
}

export default App;


