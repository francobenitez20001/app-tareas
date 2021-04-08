import React, { useReducer } from 'react';
import clienteAxios from '../../config/axios';
import tokenAuth from '../../config/token';
import { AGREGAR_PROYECTO, FORMULARIO_PROYECTO,OBTENER_PROYECTOS, VALIDAR_FORMULARIO, PROYECTO_ACTUAL, PROYECTO_LOADING, PROYECTO_DESACTIVAR, PROYECTO_ERROR } from '../../types';
import { ProyectoContext } from './proyectoContext';
import proyectoReducer from './proyectoReducer';
//import uuid from 'uuid';

//initial state
const ProyectoState = props =>{

    const initialState = {
        proyectos:[],
        nuevoProyecto:false, //maneja el estado para mostrar el form de nuevo proyecto
        errorFormulario:false,
        proyecto:null,
        loading:false,
        error:null,
        info:null
    }

    //Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(proyectoReducer, initialState);


    //serie de funciones para el crud
    const mostrarFormulario = ()=>{
        dispatch({
            type:FORMULARIO_PROYECTO
        })
    }

    const obtenerProyectos = async ()=>{
        const token = localStorage.getItem('token');
        if(!token) return;
        tokenAuth(token);
        dispatch({
            type:PROYECTO_LOADING
        });
        const proyectos = await clienteAxios.get('/api/proyectos');
        const {data:{data}} = proyectos;
        dispatch({
            type:OBTENER_PROYECTOS,
            payload:data
        })
    }

    const agregarProyecto = async proyecto=>{
        const token = localStorage.getItem('token');
        if (!token) return;
        tokenAuth(token);
        dispatch({
            type:PROYECTO_LOADING
        })
        const reqProyecto = await clienteAxios.post('/api/proyectos',proyecto);
        const {data:{data}} = reqProyecto;
        //console.log(data);
        dispatch({
            type:AGREGAR_PROYECTO,
            payload:data
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

    const desactivarProyecto = ()=>{
        dispatch({
            type:PROYECTO_DESACTIVAR
        })
    }

    const eliminarProyecto = async id=>{
        const token = localStorage.getItem('token');
        if (!token) return;
        tokenAuth(token);
        dispatch({
            type:PROYECTO_LOADING
        });
        try {
            await clienteAxios.delete(`/api/proyectos/${id}`);
            obtenerProyectos();
        } catch (error) {
            console.log('error: ',error);
            dispatch({
                type:PROYECTO_ERROR,
                payload:error.message
            })
        }
    }

    return (
        <ProyectoContext.Provider 
            value={{
                proyectos:state.proyectos,
                nuevoProyecto:state.nuevoProyecto,
                errorFormulario:state.errorFormulario,
                proyecto:state.proyecto,
                loading:state.loading,
                error:state.error,
                info:state.info,
                mostrarFormulario,
                obtenerProyectos,
                agregarProyecto,
                mostrarError,
                seleccionarProyecto,
                desactivarProyecto,
                eliminarProyecto
            }}>
            {props.children}
        </ProyectoContext.Provider>
    )
}

export default ProyectoState;