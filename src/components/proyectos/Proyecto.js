import React, { useContext } from 'react';
import {ProyectoContext} from '../../context/proyectos/proyectoContext';

const Proyecto = ({proyecto}) => {

    const {seleccionarProyecto} = useContext(ProyectoContext)

    const handleClick = proyecto=>{
        seleccionarProyecto(proyecto.id);
    }
    
    return (
        <li>
            <button onClick={()=>handleClick(proyecto)} type="button" className="btn btn-blank">{proyecto.nombre}</button>
        </li>
    );
}
 
export default Proyecto;