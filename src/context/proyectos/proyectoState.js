import React, { useReducer } from 'react';
import { FORMULARIO_PROYECTO } from '../../types';
import { ProyectoContext } from './proyectoContext';
import proyectoReducer from './proyectoReducer';

//initial state
const ProyectoState = props =>{
    const initialState = {
        nuevoProyecto:false //maneja el estado para mostrar el form de nuevo proyecto
    }

    //Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(proyectoReducer, initialState);


    //serie de funciones para el crud
    const mostrarFormulario = ()=>{
        dispatch({
            type:FORMULARIO_PROYECTO
        })
    }

    return (
        <ProyectoContext.Provider 
            value={{
                nuevoProyecto:state.nuevoProyecto,
                mostrarFormulario 
            }}>
            {props.children}
        </ProyectoContext.Provider>
    )
}

export default ProyectoState;