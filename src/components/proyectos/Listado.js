import React, { useContext, useEffect } from 'react';
import Proyecto from './Proyecto';
import {ProyectoContext} from '../../context/proyectos/proyectoContext';

const ListadoProyectos = () => {
    //extraigo proyectos del state inicial
    const {proyectos,obtenerProyectos} = useContext(ProyectoContext);
    
    useEffect(() => {
        obtenerProyectos();    
    }, [])

    if(proyectos.length === 0) return null;


    return (
        <ul className="listado-proyectos">
            {proyectos.map((p,key)=>(
                <Proyecto proyecto={p} key={key}/>
            ))}
        </ul>
    );
}
 
export default ListadoProyectos;