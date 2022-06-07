import axios from "axios";


export function getpok (){
    return async function (dispatch){ //enviar acciones al reducer, la crea el midle (solo para asincronas)
        try {
        var json = await axios.get ("http://localhost:3001/pokemons"); 
        return dispatch({      
        type: "GET_POK", 
        payload: json.data

        })
    } catch (error) {
        console.log(error)
    
    }  
  }
  
}
//buscar
export function getNamePok(name){
    return async function (dispatch){
        try{
            var json = await axios.get ("http://localhost:3001/pokemons?name=" + name);
            return dispatch({
                type: "GET_NAME_POK",
                payload: json.data

            })
        }catch (error){
            alert ("Pokemon no encontrado, verifique haber escrito bien el nombre")
        console.log (error)
    }
}
}

//detalle
export function getDetail (id){
    return async function (dispatch) {
        try{
            var json = await axios.get ("http://localhost:3001/pokemons/" + id);
            return dispatch ({
                type: "GET_DETAILS",
                payload: json.data
            })
        }catch(error)  {
            console.log (error)
    } 
    }
}

export function deleteDetail (){
    return{
        type: "DELETE",
}
}


//boton de orden asc y desc creados
export function orderByName(payload){
    return{
        type: "ORDER_BY_NAME",
        payload
    }
}

export function orderByAttack(payload){
    return{
        type: "ORDER_BY_ATTACK",
        payload
    }
}
export function filterCreated(payload){
    return{
        type: "FILTER_CREATED",
        payload
    }
}

//pokCreate
export function getTipo (){
    return async function (dispatch){
        var info = await axios.get ("http://localhost:3001/types",{
            
        });
        // console.log(info.data)
        return dispatch({type: "GET_TIPO", payload: info.data});
        };
    }

//formulario
export function postPok (payload){
    return async function (dispatch){
        var response = await axios.post ("http://localhost:3001/pokemons",payload);
        console.log (response)
        return response;
    }}

//filtro tipos
export function filterPokByTypes(payload){
    return{
         type: "FILTER_BY_TYPES",
         payload
    }
 }

 export function volver (payload){
        return {      
        type: "VOLVER", 
        payload
        }
    
    }  