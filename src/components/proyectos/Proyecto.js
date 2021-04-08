import React, { useContext } from 'react';
import {ProyectoContext} from '../../context/proyectos/proyectoContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const Proyecto = (props) => {

    const {seleccionarProyecto,proyecto,eliminarProyecto} = useContext(ProyectoContext)

    const handleClick = data=>{
        seleccionarProyecto(data._id);
    }

    const handleDelete = id=>{
        eliminarProyecto(id);
    }
    
    return (
        <li className={proyecto && proyecto._id === props.proyecto._id ? 'active' : ''} onClick={()=>handleClick(props.proyecto)}>
            <span>{props.proyecto.nombre}</span>
            <FontAwesomeIcon icon={faTrash} onClick={()=>handleDelete(props.proyecto._id)}/>
        </li>
    );
}
 
export default Proyecto;