import React, { useContext, useReducer } from 'react';
import TareaReducer  from "./tareaReducer";
import { TareaContext } from "./tareaContext";
import {ProyectoContext} from '../proyectos/proyectoContext';
import { AGREGAR_TAREA, OBTENER_TAREAS, VALIDAR_FORMULARIO_TAREA, OBENTER_TAREAS_PROYECTO, ELIMINAR_TAREA, MODIFICAR_TAREA, CAMBIAR_ESTADO_TAREA, SELECCIONAR_TAREA } from '../../types';
import uuid from 'uuid';

const TareaState = props=>{
    const tareas = [
        {id:1,nombre:'Elegir plataforma',estado:false,idProyecto:1},
        {id:2,nombre:'Elegir colores',estado:true,idProyecto:1},
        {id:3,nombre:'Elegir plataformas de pago',estado:false,idProyecto:1},
        {id:4,nombre:'Elegir hosting',estado:true,idProyecto:1}
    ];

    const INITIAL_STATE = {
        tareas:[],
        tareaPorProyecto:[],
        tarea:null,
        errorFormulario:false
    }

    const [state, dispatch] = useReducer(TareaReducer, INITIAL_STATE);
    const {proyecto} = useContext(ProyectoContext);

    const obtenerTareas = ()=>{
        dispatch({
            type:OBTENER_TAREAS,
            payload:tareas
        })
    }
    
    const obtenerTareasPorProyecto = idProyecto=>{
        dispatch({
            type:OBENTER_TAREAS_PROYECTO,
            payload:idProyecto
        })
    }

    const agregarTarea = tarea=>{
        tarea.id = uuid.v4();
        tarea.idProyecto = proyecto.id;
        dispatch({
            type:AGREGAR_TAREA,
            payload:tarea
        })
    }

    const mostrarError = (message)=>{
        dispatch({
            type:VALIDAR_FORMULARIO_TAREA,
            payload:message
        })
    }

    const seleccionarTarea = tarea=>{
        dispatch({
            type:SELECCIONAR_TAREA,
            payload:tarea
        })
    }

    const eliminarTarea = id =>{
        dispatch({
            type:ELIMINAR_TAREA,
            payload:id
        })
    }

    const modificarTarea = tarea =>{
        dispatch({
            type:MODIFICAR_TAREA,
            payload:tarea
        })
    }

    const modificarEstado = id=>{
        dispatch({
            type:CAMBIAR_ESTADO_TAREA,
            payload:id
        })
    }

    return (
        <TareaContext.Provider 
            value={{
                tareas:state.tareas,
                tarea:state.tarea,
                tareaPorProyecto:state.tareaPorProyecto,
                errorFormulario:state.errorFormulario,
                obtenerTareas,
                obtenerTareasPorProyecto,
                agregarTarea,
                mostrarError,
                seleccionarTarea,
                eliminarTarea,
                modificarTarea,
                modificarEstado
            }}>
            {props.children}
        </TareaContext.Provider>
    )

}

export default TareaState;