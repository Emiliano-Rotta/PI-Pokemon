import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";  //hook
import {getpok, orderByAttack, orderByName, filterCreated, getTipo, filterPokByTypes, volver  } from "../../actions";
import {Link} from "react-router-dom";
import Card from "../Card";
import Paginado from "../Paginado";
import SearchBar from "../SearchBar";
import style from "./Home.module.css";
    

export default function Home (){
    const dispatch = useDispatch()
    const pokemon = useSelector ((state) => state.pokemon); 
    

const [input, setInput] = useState ({
    name: "",
    image: "",
    life: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    types: ""
})  
const types = useSelector ((state) =>state.types)

    const [error, setError] = useState ("")
    const [orden, setOrden] = useState ("") 
    const [currentPage, setCurrentPage] = useState (1)
    const [pokPerPage, setPokPerPage ] = useState(12)

    const indiceUltimoP = currentPage * pokPerPage //12
    const indicePrimerP = indiceUltimoP - pokPerPage //0
    const currentPok = pokemon?.slice(indicePrimerP, indiceUltimoP)// slice me trae una copia en la que eloriginal n se destruye
    const paginado = (pageNumber) =>{
        setCurrentPage (pageNumber)
    }


    useEffect(()=>{
        dispatch (getpok());
        dispatch(getTipo());
        dispatch(volver());
        setCurrentPage (1);
    },[dispatch])


    
    function handleSelect (e){
    
        dispatch(filterPokByTypes(e.target.value));
        setCurrentPage (1);
     
    }
    function handleClick (e){
        e.preventDefault();
        dispatch(volver());
        setCurrentPage (1);
        
    }
    
    
    function  handleFilterCreated (e){
        dispatch(filterCreated(e.target.value));
        setCurrentPage (1);
        
    }

    function handleSort(e){
        e.preventDefault();
        dispatch (orderByName(e.target.value))
        setCurrentPage (1);
        setOrden (`Ordenado ${e.target.value}`)
    }
    
    function handleSortA(e){
        e.preventDefault();
        dispatch (orderByAttack(e.target.value))
        setCurrentPage (1);
        setOrden (`Ordenado ${e.target.value}`)
    }
   


    return (
        <div >
            <div>
            
            <h2 className ={style.titulo}> Atraparlos mi prueba es, entrenarlos mi ideal!! <SearchBar setCurrentPage = {setCurrentPage} /> </h2>
            
            </div>
          
            {/* todos los botones juntos */}
            <div className ={style.contenedorBotones}> 
           
                  <label className={style.boton1}>
                     {"Tipos:   "}
                  
             <select   className ={style.boton2} onChange ={(e)=>handleSelect(e)}>
             
                 {types.length && types.map((type) => {
                       return (
                        <option   key = {type.id} value ={type.name}> {type.name} </option>
                       )
                   })
                  } 
               </select></label>

            <select className ={style.boton}  onChange={e =>handleFilterCreated(e)}  >
                    
                    <option value="all">Todos los Pokemons</option>
                    <option value = "api">Pokemons existentes</option> 
                    <option value = "created">Creados por el usuario</option> 
                     
                    
            </select>
           
            
            <select className ={style.boton}  onChange={e =>handleSort(e)}>   
                    <option value="asc">Ordenar A-Z </option>
                    <option value="des">Ordenar Z-A </option>
             </select>
            
             <select className ={style.boton}  onChange={e =>handleSortA(e)} > 
                    <option value="ascA">Mayor fuerza</option>
                    <option value="desA">Menor fuerza</option>
                    
            </select>
            <Link to = "/types"><button className ={style.boton}>Crea tu Pokemon </button></Link>
            
            <button className ={style.volver}  onClick={e=> {handleClick(e)}} >
                Volver a cargar 
             </button> 
             

            
            </div>
            {/* <img className ={style.imagen2}src = "https://assets.stickpng.com/images/580b57fcd9996e24bc43c31f.png"></img> */}
            <img className ={style.imagen}src = "https://pngimg.com/uploads/pokemon/pokemon_PNG98.png"></img>
            {/* <img className ={style.imagen2}src = "https://assets.stickpng.com/images/580b57fcd9996e24bc43c31f.png"></img>           */}
                              
          
             <div> 
                <Paginado
               
                pokPerPage={pokPerPage}
                pokemon ={pokemon.length}
                paginado ={paginado}
                currentPage ={currentPage}
                
                
                />
             
             </div>   
                   
        
         <div className = {style.container}>  
           {currentPok.length>0? currentPok.map ((p) =>{ 
            return(
                <Fragment >                    
                     <Link  to = {"/home/" + p.id}> 
                        <Card 
                        name ={p.name.charAt(0).toUpperCase() + p.name.slice(1) }  
                        image ={p.image}    
                        types={p.types.map(e=> " -" + e.name.charAt(0).toUpperCase() + e.name.slice(1))  }   
                        attack = {p.attack}
                        key={p.id}/>
                    </Link>  
                </Fragment>
            ) 
        }) : <img className ={style.gif} src = "https://stickers.wiki/static/stickers/pokeanimated/file_61981.gif"></img> 

        } 
        
        
         
        </div>  
    
        <div> 
                <Paginado
               
                pokPerPage={pokPerPage}
                pokemon ={pokemon.length}
                paginado ={paginado}
                currentPage ={currentPage}
                
                />
             
             </div>  

        </div> 
    
    ) //CIERRA EL RETURN
}


