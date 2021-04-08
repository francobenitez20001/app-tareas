import React, { useContext } from 'react';
import {TareaContext} from '../../context/tareas/tareaContext'

const Tarea = ({tarea}) => {
    const {eliminarTarea,seleccionarTarea,modificarEstado,obtenerTareasPorProyecto} = useContext(TareaContext);

    const handleDelete = (idTarea)=>{
        eliminarTarea(idTarea);
        obtenerTareasPorProyecto(tarea.idProyecto);
    }

    const handleEstado = (idTarea)=>{
        modificarEstado(idTarea);
        obtenerTareasPorProyecto(tarea.idProyecto)
    }

    return ( 
        <li className="tarea sombra">
            <p>{tarea.nombre}</p>
            <div className="estado">{tarea.estado ? <button onClick={()=>handleEstado(tarea._id)} type="button" className="completo">Compĺeto</button> : <button type="button" onClick={()=>handleEstado(tarea._id)} className="incompleto">Incompĺeto</button>}</div>

            <div className="acciones">
                <button type="button" onClick={()=>seleccionarTarea(tarea)} className="btn btn-primario">Editar</button>
                <button type="button" onClick={()=>handleDelete(tarea._id)} className="btn btn-secundario">Eliminar</button>
            </div>
        </li>
    );
}
 
export default Tarea;