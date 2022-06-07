import React from "react";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { getDetail, deleteDetail } from "../../actions";
import { useEffect} from "react";
import style from "./Detail.module.css";

    
export default function Detail(props){
    // console.log (props)
    const dispatch = useDispatch ()

    useEffect(() => {
        dispatch (getDetail(props.match.params.id));
        return function (){dispatch (deleteDetail())}
    }, [dispatch])

    

const myPokemon = useSelector ((state)=> state.detail)

return (
    <div >
        {
            myPokemon.length>0?
            <div>
            <div className = {style.DetailContainer} >
                {/* nombre */}
                <h2 className ={style.name}>Pokemon: {myPokemon[0].name.charAt(0).toUpperCase() + myPokemon[0].name.slice(1)}.
                {/* id si viene de la api */}
                 {!myPokemon[0].createdInDb ? " Id " : "" } {!myPokemon[0].createdInDb ? "(" + (myPokemon[0].id) + ")" : "" }</h2> 
                {/* imagen */}
                <img src = {myPokemon[0].image} alt = "" className ={style.image}/>
                {/* id si viene de la base de datos */}
                <p className ={style.id}>{myPokemon[0].createdInDb ? "Id: " : "" } {myPokemon[0].createdInDb ? "(" + (myPokemon[0].id) + ")" : "" }</p>
                
                <h4 className ={style.tipos}>Tipo:
                {myPokemon[0].types.map(e=> " -" + e.name.charAt(0).toUpperCase() + e.name.slice(1)) }</h4>
                
                <h4 className ={style.ayp}>Altura: {myPokemon[0].height} Peso: {myPokemon[0].weight}</h4>
                
                <h4 className ={style.Estadisticas}>Estadisticas: </h4>
                <h5 className ={style.Estadisticas2}>
                    Vida: {myPokemon[0].life}; 
                    Fuerza: {myPokemon[0].attack}; 
                    Defensa: {myPokemon[0].defense}; 
                    Velocidad: {myPokemon[0].speed}. 
                </h5>


                <Link to = "/home/" >
                 <button className ={style.volver} >Volver</button>
                </Link>   
            </div>    

             </div> : <img className ={style.gif} src = "https://www.risevision.com/hubfs/Imported_Blog_Media/Pokemon-Template-Poke-Stop-test.gif"></img> 
        }
        
    </div>
)
}