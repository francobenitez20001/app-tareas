import React, { useContext, useState } from 'react';
import {ProyectoContext} from '../../context/proyectos/proyectoContext';

const NuevoProyecto = () => {
    const [proyecto, setProyecto] = useState({
        nombre:''
    });

    const {errorFormulario,nuevoProyecto,mostrarFormulario,agregarProyecto,mostrarError} = useContext(ProyectoContext);

    const handleChange = e=>{
        setProyecto({
            ...proyecto,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit = e=>{
        e.preventDefault();
        if(proyecto.nombre === '') return mostrarError();
        agregarProyecto(proyecto);
        setProyecto({nombre:''})
    }
    return (
        <>
            <button type="button" className="btn btn-block btn-primario" onClick={mostrarFormulario}>Nuevo Proyecto</button>
            {nuevoProyecto ? 
            <form className="formulario-nuevo-proyecto" onSubmit={handleSubmit}>
                <input type="text" className="input-text" name="nombre" placeholder="Nombre proyecto" onChange={handleChange} value={proyecto.nombre}/>
                <input type="submit" value="Agregar Proyecto" className="btn btn-primario btn-block"/>
            </form>
            :null}

            {errorFormulario ? <p className="mensaje error">El nombre del proyecto es obligatorio</p> : null}
        </>
    );
}
 
export default NuevoProyecto;