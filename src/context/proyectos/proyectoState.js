import React, { useReducer } from 'react';
import { AGREGAR_PROYECTO, FORMULARIO_PROYECTO,OBTENER_PROYECTOS, VALIDAR_FORMULARIO, PROYECTO_ACTUAL } from '../../types';
import { ProyectoContext } from './proyectoContext';
import proyectoReducer from './proyectoReducer';
import uuid from 'uuid';

//initial state
const ProyectoState = props =>{

    const proyectos = [
        {id:1, nombre:'Tienda virtual'},
        {id:2, nombre:'Administrador'},
        {id:3, nombre:'SPA Angular'}
    ];

    const initialState = {
        proyectos:[],
        nuevoProyecto:false, //maneja el estado para mostrar el form de nuevo proyecto
        errorFormulario:false,
        proyecto:null
    }

    //Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(proyectoReducer, initialState);


    //serie de funciones para el crud
    const mostrarFormulario = ()=>{
        dispatch({
            type:FORMULARIO_PROYECTO
        })
    }

    const obtenerProyectos = ()=>{
        dispatch({
            type:OBTENER_PROYECTOS,
            payload:proyectos
        })
    }

    const agregarProyecto = proyecto=>{
        proyecto.id = uuid.v4();
        dispatch({
            type:AGREGAR_PROYECTO,
            payload:proyecto
        })
    }

    const mostrarError = ()=>{
        dispatch({
            type:VALIDAR_FORMULARIO
        })
    }

    const seleccionarProyecto = id=>{
        dispatch({
            type:PROYECTO_ACTUAL,
            payload:id
        })
    }

    return (
        <ProyectoContext.Provider 
            value={{
                proyectos:state.proyectos,
                nuevoProyecto:state.nuevoProyecto,
                errorFormulario:state.errorFormulario,
                proyecto:state.proyecto,
                mostrarFormulario,
                obtenerProyectos,
                agregarProyecto,
                mostrarError,
                seleccionarProyecto 
            }}>
            {props.children}
        </ProyectoContext.Provider>
    )
}

export default ProyectoState;