import React from "react"
import style from "./Paginado.module.css";

export default function Paginado ({pokPerPage, pokemon, paginado }){
    const numeroPagina = []

    for (let i = 0; i < Math.ceil(pokemon/pokPerPage); i++) {
        numeroPagina.push (i+1)
    }
    return(
        <nav>
            <ul className= {style.paginadoContenedor}>
                {
                    numeroPagina &&
                    numeroPagina.map (number =>(
                        <div className="number" key={number}>
                        <button onClick={() => paginado(number)} 
                        className = {style.botonPaginado}>{number}
                        </button>
                        </div>
                    ))
                }
            </ul>
        </nav>
    )
}