const initialState ={
    pokemon: [],
    allPok: [],
    types: [],
    detail: [],
    // loading: true,
}

    function rootReducer (state = initialState, action){
        switch (action.type){
            case "GET_POK":
                return {
                    ...state,
                    pokemon: action.payload,
                    allPok: action.payload,
                  
                }

                //buscar
            case "GET_NAME_POK":
                return {
                    ...state,
                    pokemon: action.payload,
                }
                
                //detalle
                case "GET_DETAILS":
                    return {
                        ...state,
                        detail: action.payload
                    }
                case "DELETE":
                    return {
                        ...state,
                        detail: []
                    } 
                    
                //boton de orden asc y desc creados
                case "ORDER_BY_NAME": 
                let sortedArr = action.payload === "asc" ?
                    state.pokemon.sort(function(a,b){
                        if (a.name > b.name) {
                            return 1;
                        }
                        if (b.name > a.name) {
                            return - 1;
                        }
                        return 0;
                    }) : 
                    state.pokemon.sort(function(a,b){
                        if (a.name > b.name) {
                            return -1;
                        }
                        if (b.name > a.name) {
                            return  1;
                        }
                        return 0;
                
                    })
                    return {
                    ...state,
                    pokemon: sortedArr
    
                    }
    
                case "ORDER_BY_ATTACK": 
                let sortedArrAttack = action.payload === 'ascA' ? 
                state.pokemon.sort(function (a, b){
                 
                    return b.attack - a.attack;
                }) :
                state.pokemon.sort(function(a, b){
                 
                    return a.attack - b.attack;
                })
                return{
                ...state,
                pokemon: sortedArrAttack
                } 
        

                case "FILTER_CREATED":
                const allpoke = state.allPok 
                const pokeCreado = action.payload === "created" ?  allpoke.filter (e => e.createdInDb): 
                allpoke.filter (e => !e.createdInDb)
                return { 
                ...state,
                pokemon: action.payload === 'all' ? allpoke : pokeCreado
                };

                //pokCreate
                
                case "POST_POK":
                return {
                    ...state,
                }

               case "GET_TIPO":
                return {
                    ...state,
                    types: action.payload,
                }


                case "FILTER_BY_TYPES":
            
                    const allPok = state.allPok;
                    const typeFiltered = allPok.filter( (e) =>
                                e.types && e.types.includes(action.payload) 
                            )
                            // .concat (allPok.filter (e =>  e.tipos? .includes(action.payload)))
                            //  || allPok.filter (e =>  e.tipos.includes(action.payload) ) 
                
                    return {
                        ...state, 
                        pokemon: typeFiltered,
                    };


                default:
                    return state;
                }
            }   

            
            export default rootReducer;
            
        