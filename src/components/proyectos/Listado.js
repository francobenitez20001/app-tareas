import React from 'react';
import Proyecto from './Proyecto';

const ListadoProyectos = () => {
    const proyectos = [
        {nombre:'Tienda virtual'},
        {nombre:'Administrador'},
        {nombre:'SPA Angular'}
    ]
    return (
        <ul className="listado-proyectos">
            {proyectos.map((p,key)=>(
                <Proyecto proyecto={p} key={key}/>
            ))}
        </ul>
    );
}
 
export default ListadoProyectos;