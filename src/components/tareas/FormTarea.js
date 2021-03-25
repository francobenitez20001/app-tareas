import React, { useContext, useState } from 'react';
import { TareaContext } from "../../context/tareas/tareaContext";
import {ProyectoContext} from '../../context/proyectos/proyectoContext';

const FormTareas = () => {
    const [tarea, setTarea] = useState({
        nombre:''
    });

    const {errorFormulario,agregarTarea,mostrarError,obtenerTareasPorProyecto} = useContext(TareaContext);
    const {proyecto} = useContext(ProyectoContext);

    const handleChange = event=>{
        setTarea({nombre:event.target.value});
    }

    const handleSubmit = event=>{
        event.preventDefault();
        if(tarea.nombre === ''){
            mostrarError('Completa el nombre de la tarea');
            return;
        }
        if(!proyecto){
            mostrarError('Para agregar una tarea, debes tener un proyecto activo.');
            return;
        }
        agregarTarea(tarea);
        setTarea({nombre:''});
        obtenerTareasPorProyecto(proyecto.id);
    }

    return ( 
        <div className="formulario">
            {errorFormulario ? <p className="mensaje error">{errorFormulario}</p>: null}
            <form onSubmit={handleSubmit}>
                <div className="contenedor-input">
                    <input type="text" className="input-text" placeholder="Nombre tarea" name="nombre" value={tarea.nombre} onChange={handleChange}/>
                </div>
                <div className="contenedor-input">
                    <input type="submit" className="btn btn-primario btn-block" value="Agregar tarea"/>
                </div>
            </form>
        </div>
    );
}
 
export default FormTareas;