import React from "react";
import { useState } from "react";
import {useDispatch, useSelector} from "react-redux"; 
import { getNamePok } from "../../actions";
import style from './SearchBar.module.css';


export default function SearchBar({setCurrentPage}){
    const dispatch = useDispatch()
    const [name, setName] = useState ("")
    const allPok = useSelector ((state) => state.detail);


    function handleInputChange (e){
    e.preventDefault()
    setName(e.target.value)
    // console.log (name)
    

    }
    //boton
    function handleSubmit(e){
    e.preventDefault();
    setCurrentPage (1)

        if(name !== ""){
        dispatch(getNamePok(name));
        // console.log (name)
        // setName("");
    }

        else{
        alert("Ingresa un nombre para buscar")
        }
    }



    return (
       

        <div>
            <form onSubmit={handleSubmit}>
            <div className={style.searchBar}>
            
            <input
            className={style.input} 
            type="text"
            placeholder="Introduce un Pokemon..."
            onChange = {(e) => handleInputChange (e)}
            value={name}
            />
            
            <button  className={style.boton} type='submit' onClick={handleSubmit}>Buscar</button>
            </div></form>
        </div>
    )
    }