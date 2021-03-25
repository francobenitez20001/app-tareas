import React, { useContext, useEffect } from 'react';
import Tarea from './Tarea';
import { ProyectoContext } from "../../context/proyectos/proyectoContext";
import { TareaContext } from "../../context/tareas/tareaContext";

const ListadoTareas = () => {
    const {proyecto} = useContext(ProyectoContext);
    const {tareaPorProyecto,obtenerTareas,obtenerTareasPorProyecto} = useContext(TareaContext);

    useEffect(() => {
        obtenerTareas();
    }, []);

    useEffect(() => {
        if(proyecto){
            obtenerTareasPorProyecto(proyecto.id);
        }
    }, [proyecto])


    if(!proyecto) return <p className="mensaje error">Ningun proyecto seleccionado</p>;
    return ( 
        <>
            <h2>Proyecto: {proyecto.nombre}</h2>
            <ul className="listado-tareas">
                {tareaPorProyecto.length === 0 ? <li className="tarea"><p>No hay tareas asignadas a este proyecto</p></li> :
                tareaPorProyecto.map((tarea,key)=>(
                    <Tarea key={key} tarea={tarea}/>
                ))}
                <button type="button" className="btn btn-eliminar">Eliminar Proyecto &times;</button>
            </ul>
        </>
    );
}
 
export default ListadoTareas;