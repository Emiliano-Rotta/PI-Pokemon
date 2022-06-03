import React from "react";
import style from "./Card.module.css";


export default function Card ({name, image, attack, types}){
    return (
        <div className = {style.CardContainer}>

            <h3 className ={style.name}>Pokemon: {name}</h3>
            <img src = {image} alt = {name} className ={style.image} />
            <h3 className ={style.tipo}>Fuerza: {attack}</h3> 
            <h3 className ={style.tipo}>Tipo: { types}</h3>
           
                      
            
        </div>
    );
}


