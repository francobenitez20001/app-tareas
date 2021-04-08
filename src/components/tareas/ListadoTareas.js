import React, { useContext, useEffect } from 'react';
import Tarea from './Tarea';
import Loader from '../Loader';
import { ProyectoContext } from "../../context/proyectos/proyectoContext";
import { TareaContext } from "../../context/tareas/tareaContext";

const ListadoTareas = () => {
    const {proyecto,desactivarProyecto} = useContext(ProyectoContext);
    const {tareas,obtenerTareas,loading,error} = useContext(TareaContext);

    useEffect(() => {
        if(proyecto){
            obtenerTareas(proyecto._id);
        }
    }, [proyecto])
    
    //console.log(proyecto);
    if(loading) return <div style={{textAlign:'center'}}><Loader/></div>
    if(!proyecto) return <p className="mensaje error">Ningun proyecto seleccionado</p>;

    return ( 
        <>
            <h2>Proyecto: {proyecto.nombre}</h2>
            <ul className="listado-tareas">
                {tareas.length === 0 ? <li className="tarea"><p>No hay tareas asignadas a este proyecto</p></li> :
                tareas.map((tarea,key)=>(
                    <Tarea key={key} tarea={tarea}/>
                ))}
                <button type="button" onClick={desactivarProyecto} className="btn btn-eliminar">Eliminar Proyecto &times;</button>
            </ul>
        </>
    );
}
 
export default ListadoTareas;