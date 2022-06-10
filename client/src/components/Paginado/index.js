import React from "react"
import style from "./Paginado.module.css";

export default function Paginado ({pokPerPage, pokemon, paginado, currentPage}){
    const numeroPagina = []

    for (let i = 0; i < Math.ceil(pokemon/pokPerPage); i++) {
        numeroPagina.push (i+1)
    }
    return(
        <nav>
            
            <ul className= {style.paginadoContenedor}>
            <button disabled = {currentPage===1? true:false}  className = {style.botonPaginado} onClick={() => paginado(currentPage-1)}> {"<"} </button>
                {
                    numeroPagina &&
                    numeroPagina.map (number =>(
                        <div  key={number}>
                        <button onClick={() => paginado(number)} 
                        className = {style.botonPaginado}>{number}
                        </button>
                        </div>
                    ))
                }
                <button disabled = {currentPage === numeroPagina.length? true:false} className = {style.botonPaginado} onClick={() => paginado(currentPage+1)}> {">"} </button>
            </ul>
            
        </nav>
    )
}


//linea 4 linea 13 y 24 y 31