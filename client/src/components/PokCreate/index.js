import React, { useState, useEffect } from 'react';
import {Link, useHistory} from 'react-router-dom';
import { postPok, getTipo } from "../../actions";
import { useDispatch, useSelector } from 'react-redux';
import style from "./PokCreate.module.css";

export default function PokCreate(){
    const dispatch = useDispatch()
    const history = useHistory()
    const types = useSelector((state)=> state.types)
    const allPok = useSelector((state) => state.allPok)
    const [errors, setErrors] = useState({})

    const[input, setInput] = useState({
        name: "",
        image: "",
        life: "",
        attack: "",
        defense: "",
        speed: "",
        height: "", 
        weight: "",
        types: [],
        
    })

        function validate(input){
            let errors = {};

            if  ( allPok.find ( (e)  =>  e.name.toUpperCase ()  ===  input.name.toUpperCase () )   || input.name === "ditto" || input.name === "zubat"){
                errors.name = "Ya existe un pokemon con ese nombre, prueba con escoger otro";
            }
            if(!input.name || !/^[a-z]+[A-Za-z0-9\s]+$/g.test(input.name)){
                errors.name = 'Al menos dos caracteres el primero, letra minúscula.';
            }

            if(!input.life || !/^[1-9]\d*(\.\d+)?$/.test(input.life)){
                errors.life = 'El número tiene que ser positivo.';
            }
            if(!input.attack || !/^[1-9]\d*(\.\d+)?$/.test(input.attack)){
                errors.attack = 'El número tiene que ser positivo.';
            }
            if(!input.defense  || !/^[1-9]\d*(\.\d+)?$/.test(input.defense)){
                errors.defense = 'El número tiene que ser positivo.';
            }
            if(!input.speed || !/^[1-9]\d*(\.\d+)?$/.test(input.speed)){
                errors.speed = 'El número tiene que ser positivo.';
            }
            if(!input.height || !/^[1-9]\d*(\.\d+)?$/.test(input.height)){
                errors.height = 'El número tiene que ser positivo.';
            }
            if(!input.weight || !/^[1-9]\d*(\.\d+)?$/.test(input.weight)){
                errors.weight = 'El número tiene que ser positivo.';
            }
            if (!input.image || !/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/.test(input.image) ){
                errors.image = 'Debe ser una URL';
            }
            if (!input.types){
                errors.types = 'Elegir minimo un tipo';
            }
            return errors


    
        }




function handleChange(e){
    e.preventDefault ();
    setInput({
    ...input,
    [e.target.name] : e.target.value,
    });
    setErrors(validate({
        ...input,
        [e.target.name]: e.target.value

    }));console.log (input)
}

function handleSelect(e){
     if (input.types.includes(e.target.value)) {
      setInput({
        ...input,
        types: input.types,
      });
    } else {
      setInput({
        ...input,
        types: [...input.types, e.target.value],
      });
    }
  };

   
    function handleDelete(e){
        setInput({
            ...input,
            types: input.types.filter(t=> t !== e)
        })
    }
   
    
    
    function handleSubmit(e){
        e.preventDefault()
        console.log(input)
        if(input.name.length >1
        && input.name.charAt(0).toUpperCase() !== input.name.charAt(0)
        && !errors.hasOwnProperty("name") //devuelve un buleano si el objeto tiene la propiedad especificada 
        && input.image.length >20
        && input.life.length > 0
        && input.attack.length > 0
        && input.defense.length > 0
        && input.speed.length > 0
        && input.height.length > 0
        && input.weight.length > 0
        && input.types.length > 0 
        )

        {dispatch(postPok(input))
        alert ("Pokemon creado con exito")
        setInput({
            name: "",
            image: "",
            life: "",
            attack: "",
            defense: "",
            speed: "",
            height: "", 
            weight: "",
            types: [],
        })
         // history.push('/home')
    }
        else{
        alert ("Debe compeltar correctamente todos los campo con asteriscos (*)")
         
    }
    }
    useEffect (()=>{
                dispatch(getTipo());
            }, [dispatch]);
            

    return(
        <div>
            {/* <h1 className = {style.titulo}>Creá tu propia Pokemon!!!! </h1> */}
            <h6><img className ={style.imagen}src = "https://pngimg.com/uploads/pokemon/pokemon_PNG98.png"></img></h6>
            
            <form className ={style.contenedor}  onSubmit = {(e)=>handleSubmit(e)} >
        <div>
                <label> </label><br/>
                <input
                placeholder="Nombre: (*)"
                autocomplete="off"
                type = "text"
                value = {input.name}
                name = "name"
                onChange ={(e)=>handleChange(e)} 
                /> 
                {errors.name && (
                    <p className ={style.error}><p className = "error">{errors.name}</p></p>
                )}
        </div>

        <div><br/>
                            
            <input  
            autocomplete="off"  
            type="number" 
            value={input.height} 
            name='height' 
            placeholder="Altura. (*)"  
            onChange={(e)=>handleChange(e)} 
            /> 
                {errors.height && (<p className= {style.error} >{errors.height}</p>)}<br/>


                <input  
            autocomplete="off"  
            type="number" 
            value={input.weight} 
            name='weight' 
            placeholder="Peso. (*)"  
            onChange={(e)=>handleChange(e)} 
            />
             {errors.weight && (<p className= {style.error} >{errors.weight}</p>)}<br/>
        </div>
                
        <div> Estadisticas:
                <br/>
                <input  
                autocomplete="off" 
                type="number" 
                value={input.life} 
                name='life'  
                placeholder="Vida. (*)" 
                onChange={(e)=>handleChange(e)}
                /> 
                {errors.life && (<p className= {style.error} >{errors.life}</p>)}<br/>

                <input  
                autocomplete="off"  
                type="number" 
                value={input.attack} 
                name='attack'  
                placeholder="Fuerza. (*)" 
                onChange={(e)=>handleChange(e)}
                /> 
                    {errors.attack && (<p className= {style.error} >{errors.attack}</p>)}<br/>
                                
                <input  
                autocomplete="off"  
                type="number" 
                value={input.defense} 
                name='defense' 
                placeholder="Defensa. (*)"  
                onChange={(e)=>handleChange(e)} 
                /> 
                {errors.defense && (<p className= {style.error} >{errors.defense}</p>)}<br/>

                <input  
                autocomplete="off"  
                type="number" 
                value={input.speed} 
                name='speed' 
                placeholder="Velocidad. (*)"  
                onChange={(e)=>handleChange(e)} 
                /> 
                {errors.speed && (<p className= {style.error} >{errors.speed}</p>)}<br/>

        </div>
           

        <div><br/>
                <input type="text" 
                value={input.image} 
                name='image' 
                placeholder="Imagen. (*)" 
                onChange={(e)=>handleChange(e)} />
                 {errors.image && (<p className= {style.error} >{errors.image}</p>)} 
        </div> 
      
       
            <br/>
            Tipos de Pokemons: (*)<br/>
            {errors.types && (<p className= {style.error} >{errors.types}</p>)} <br/>
                                        
            <select  onChange={(e)=> handleSelect(e)} className={style.tipos}>
            {types && types.map((t)=>(
            <option 
             
            value={t.name} 
            key={t.id}>{t.name}
            </option> 
            ))}

            
            </select><br/> {/* para ver que types voy agarrando */}
            <ul >
            <p>
                {input.types.map(e=> <button className={style.botonBorrar} 
                type='button' 
                key={e.id} 
                onClick={()=>handleDelete(e)}>
                    {e}</button>)}</p></ul>
            
        <br/>

        <button className={style.boton1} type='submit'>Crear Pokemon</button>
            
        <Link to= "/home"><button className ={style.volver}>Volver</button></Link>
        </form>
        </div>
    )
}