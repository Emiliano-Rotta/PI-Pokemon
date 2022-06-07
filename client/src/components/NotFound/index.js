import React from "react";
import {Link} from "react-router-dom";
import style from "./NotFound.module.css";

export default function NotFound (){
        return (
           
        <div>
                <div>
                    <img src="https://i.imgur.com/BK3X1IS.png" alt="" />
                </div>

                <div>
                        <Link  to=     "/" ><button className= {style.boton}>Volvamos a empezar     </button></Link>
                                    
                        <Link  to = "/home"><button className = {style.boton}>Haz click para entrar</button></Link>      
                        
                        <Link  to=  "/types"><button className= {style.boton}> Crear tu pokemon    </button> </Link>
                </div>
        </div>

            
)
}

