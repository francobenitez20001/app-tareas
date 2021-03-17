import React from 'react';
import Tarea from './Tarea';

const ListadoTareas = () => {
    const tareas = [
        {nombre:'Elegir plataforma',estado:false},
        {nombre:'Elegir colores',estado:true},
        {nombre:'Elegir plataformas de pago',estado:false},
        {nombre:'Elegir hosting',estado:true},
    ];
    return ( 
        <>
            <h2>Proyecto: Tienda Virtual</h2>
            <ul className="listado-tareas">
                {tareas.length === 0 ? <li className="tarea"><p>No hay tareas</p></li> :
                tareas.map((tarea,key)=>(
                    <Tarea key={key} tarea={tarea}/>
                ))}
                <button type="button" className="btn btn-eliminar">Eliminar Proyecto &times;</button>
            </ul>
        </>
    );
}
 
export default ListadoTareas;