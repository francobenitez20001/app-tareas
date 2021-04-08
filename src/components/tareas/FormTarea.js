import React, { useContext, useEffect, useState } from 'react';
import { TareaContext } from "../../context/tareas/tareaContext";
import {ProyectoContext} from '../../context/proyectos/proyectoContext';

const FormTareas = () => {
    
    const {tarea,errorFormulario,agregarTarea,mostrarError,modificarTarea,obtenerTareas} = useContext(TareaContext);
    const {proyecto} = useContext(ProyectoContext);
    const [formTarea, setTarea] = useState({
        _id:null,
        nombre:'',
        proyecto:null,
        estado:false
    });

    useEffect(() => {
        if(tarea){
            setTarea({
                _id:tarea._id,
                nombre:tarea.nombre,
                proyecto:tarea.proyecto,
                estado:tarea.estado
            })
        }
    }, [tarea])


    const handleChange = event=>{
        setTarea({...formTarea,nombre:event.target.value});
    }

    const handleSubmit = async event=>{
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
            await modificarTarea(formTarea);
        }else{
            //agrega tarea
            await agregarTarea(formTarea);
        }
        setTarea({
            _id:null,
            nombre:'',
            proyecto:null,
            estado:false
        });
        obtenerTareas(proyecto._id);
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