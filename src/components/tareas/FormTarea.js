import React, { useContext, useEffect, useState } from 'react';
import { TareaContext } from "../../context/tareas/tareaContext";
import {ProyectoContext} from '../../context/proyectos/proyectoContext';

const FormTareas = () => {
    const [formTarea, setTarea] = useState({
        id:null,
        nombre:'',
        idProyecto:null,
        estado:false
    });
    
    const {tarea,errorFormulario,agregarTarea,mostrarError,obtenerTareasPorProyecto,modificarTarea} = useContext(TareaContext);
    const {proyecto} = useContext(ProyectoContext);

    useEffect(() => {
        if(tarea){
            setTarea({
                id:tarea.id,
                nombre:tarea.nombre,
                idProyecto:tarea.idProyecto,
                estado:tarea.estado
            })
        }
    }, [tarea])


    const handleChange = event=>{
        setTarea({...formTarea,nombre:event.target.value});
    }

    const handleSubmit = event=>{
        event.preventDefault();
        if(formTarea.nombre === ''){
            mostrarError('Completa el nombre de la tarea');
            return;
        }
        if(!proyecto){
            mostrarError('Para agregar una tarea, debes tener un proyecto activo.');
            return;
        }

        if(tarea){
            //modifica tarea
            modificarTarea(formTarea);
        }else{
            //agrega tarea
            agregarTarea(formTarea);
        }
        setTarea({
            id:null,
            nombre:'',
            idProyecto:null,
            estado:false
        });
        obtenerTareasPorProyecto(proyecto.id);
    }

    return ( 
        <div className="formulario">
            {errorFormulario ? <p className="mensaje error">{errorFormulario}</p>: null}
            <form onSubmit={handleSubmit}>
                <div className="contenedor-input">
                    <input type="text" className="input-text" placeholder="Nombre tarea" name="nombre" value={formTarea.nombre} onChange={handleChange}/>
                </div>
                <div className="contenedor-input">
                    <input type="submit" id="btn-submit-tarea" className="btn btn-primario btn-block" value={tarea ? 'Modificar Tarea' : 'Agregar Tarea'}/>
                </div>
            </form>
        </div>
    );
}
 
export default FormTareas;