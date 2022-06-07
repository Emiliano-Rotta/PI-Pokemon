import './App.css';
import {BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Landingpage from "./components/LandingPage";
import Home from "./components/Home";
import PokCreate from "./components/PokCreate";
import Detail from "./components/Detail";
import NotFound from "./components/NotFound";

function App() {
  return (
    <BrowserRouter> 
    <div className="App">
    <Switch>
        <Route exact path = "/" component = {Landingpage}/>
        <Route exact path = "/home" component = {Home}/>
        <Route exact path= "/home/:id" component = {Detail}/>
        <Route exact path = "/types" component = {PokCreate}/>
        <Route exact path="/404notFound" component={NotFound} />
        <Route path="/:any" ><Redirect to="/404notFound" /> </Route>
      </Switch>
      {/* <h1>Henry Pokemon</h1> */}
    </div>
    </BrowserRouter>
  );
}

export default App;


