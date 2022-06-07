import React from "react";
import {Link} from "react-router-dom";
import style from "./LandingPage.module.css";

export default function LandingPage (){
    return(
        <div>
             <h1 className = {style.h1}>Todos los Pokemon en un solo lugar!!</h1> 
             <Link to = "/home"><button className = {style.boton} >Haz click para entrar</button></Link>
             <h6><img className ={style.imagen}src = "https://pngimg.com/uploads/pokemon/pokemon_PNG98.png"></img></h6>
           
         </div>
    )
}