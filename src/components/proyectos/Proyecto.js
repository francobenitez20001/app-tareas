import React, { useContext } from 'react';
import {ProyectoContext} from '../../context/proyectos/proyectoContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
const Swal = require('sweetalert2');
const Proyecto = (props) => {

    const {seleccionarProyecto,proyecto,error,eliminarProyecto} = useContext(ProyectoContext)

    const handleClick = data=>{
        seleccionarProyecto(data._id);
    }

    const handleDelete = id=>{
        Swal.fire({
            title: '¿Seguro quieres eliminar el proyecto?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirmar'
          }).then(async(result) => {
            if (result.isConfirmed) {
                await eliminarProyecto(id);
                if (error) {
                    return Swal.fire(
                        'Error',
                        error,
                        'error'
                    );
                }
                Swal.fire(
                    'Eliminado',
                    'Recurso eliminado',
                    'success'
                )
            }
        })
        
    }

    
    return (
        <li className={proyecto && proyecto._id === props.proyecto._id ? 'active' : ''} onClick={()=>handleClick(props.proyecto)}>
            <span>{props.proyecto.nombre}</span>
            <FontAwesomeIcon icon={faTrash} onClick={()=>handleDelete(props.proyecto._id)}/>
        </li>
    );
}
 
export default Proyecto;