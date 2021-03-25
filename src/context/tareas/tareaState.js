import React, { useContext, useReducer } from 'react';
import TareaReducer  from "./tareaReducer";
import { TareaContext } from "./tareaContext";
import {ProyectoContext} from '../proyectos/proyectoContext';
import { AGREGAR_TAREA, OBTENER_TAREAS, VALIDAR_FORMULARIO_TAREA, OBENTER_TAREAS_PROYECTO } from '../../types';
import uuid from 'uuid';

const TareaState = props=>{
    const tareas = [
        {nombre:'Elegir plataforma',estado:false,idProyecto:1},
        {nombre:'Elegir colores',estado:true,idProyecto:1},
        {nombre:'Elegir plataformas de pago',estado:false,idProyecto:1},
        {nombre:'Elegir hosting',estado:true,idProyecto:1}
    ];

    const INITIAL_STATE = {
        tareas:[],
        tareaPorProyecto:[],
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


    return (
        <TareaContext.Provider 
            value={{
                tareas:state.tareas,
                tareaPorProyecto:state.tareaPorProyecto,
                errorFormulario:state.errorFormulario,
                obtenerTareas,
                obtenerTareasPorProyecto,
                agregarTarea,
                mostrarError
            }}>
            {props.children}
        </TareaContext.Provider>
    )

}

export default TareaState;