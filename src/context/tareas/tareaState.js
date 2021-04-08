import React, { useContext, useReducer } from 'react';
import TareaReducer  from "./tareaReducer";
import { TareaContext } from "./tareaContext";
import { ProyectoContext } from "../proyectos/proyectoContext";
import { AGREGAR_TAREA, OBTENER_TAREAS, VALIDAR_FORMULARIO_TAREA, OBENTER_TAREAS_PROYECTO, ELIMINAR_TAREA, MODIFICAR_TAREA, CAMBIAR_ESTADO_TAREA, SELECCIONAR_TAREA, TAREA_LOADING, TAREA_ERROR } from '../../types';
import tokenAuth from '../../config/token';
import clienteAxios from '../../config/axios';

const TareaState = props=>{
    const INITIAL_STATE = {
        tareas:[],
        tarea:null,
        errorFormulario:false,
        error:null,
        loading:null
    }

    const [state, dispatch] = useReducer(TareaReducer, INITIAL_STATE);
    const {proyecto} = useContext(ProyectoContext)

    const obtenerTareas = async(id)=>{
        const token = localStorage.getItem('token');
        if(!token) return;
        tokenAuth(token);
        dispatch({
            type:TAREA_LOADING
        });
        try {
            const reqTareas = await clienteAxios.get(`/api/tareas/${id}`);
            const {data:{data:tareas}} = reqTareas;
            dispatch({
                type:OBTENER_TAREAS,
                payload:tareas
            })
        } catch (error) {
            console.log('error: ',error);
            dispatch({
                type:TAREA_ERROR,
                payload:error.message
            })
        }
    }

    const agregarTarea = async tarea=>{
        const token = localStorage.getItem('token');
        if(!token) return;
        tokenAuth(token);
        dispatch({
            type:TAREA_LOADING
        });
        tarea.proyecto = proyecto._id;
        try {
            await clienteAxios.post(`/api/tareas`,tarea);
            return;
        } catch (error) {
            console.log('error: ',error);
            dispatch({
                type:TAREA_ERROR,
                payload:error.message
            })
        }
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
                errorFormulario:state.errorFormulario,
                error:state.error,
                loading:state.loading,
                obtenerTareas,
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