import React, { useContext, useEffect } from 'react';
import Proyecto from './Proyecto';
import Loader from '../Loader'
import {ProyectoContext} from '../../context/proyectos/proyectoContext';

const ListadoProyectos = () => {
    //extraigo proyectos del state inicial
    const {proyectos,loading,obtenerProyectos} = useContext(ProyectoContext);
    
    useEffect(() => {
        obtenerProyectos();    
    }, [])

    if(loading) return <div style={{textAlign:'center'}}><Loader/></div>
    if(proyectos.length === 0) return <p className="mensaje error">No tienes proyectos guardados.</p>;

    return (
        <ul className="listado-proyectos">
            {proyectos.map((p,key)=>(
                <Proyecto proyecto={p} key={key}/>
            ))}
        </ul>
    );
}
 
export default ListadoProyectos;