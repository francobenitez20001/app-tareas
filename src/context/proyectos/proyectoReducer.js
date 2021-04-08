import { AGREGAR_PROYECTO, FORMULARIO_PROYECTO, OBTENER_PROYECTOS, PROYECTO_ACTUAL, PROYECTO_DESACTIVAR, PROYECTO_ERROR, PROYECTO_LOADING, VALIDAR_FORMULARIO } from "../../types";

const proyectoReducer = (state,action)=>{
    switch (action.type) {
        case PROYECTO_LOADING:
            return {...state,loading:true}
        case FORMULARIO_PROYECTO:
            return {...state,nuevoProyecto:true}
        case OBTENER_PROYECTOS:
            return {...state,proyectos:action.payload,loading:false,error:null}
        case AGREGAR_PROYECTO:
            return {...state,proyectos:[...state.proyectos,action.payload],nuevoProyecto:false,errorFormulario:false,loading:false,error:null}
        case VALIDAR_FORMULARIO:
            return {...state,errorFormulario:true}
        case PROYECTO_ACTUAL:
            return {...state,proyecto:state.proyectos.filter(pr=>pr._id === action.payload)[0]}
        case PROYECTO_DESACTIVAR:
            return {...state,proyecto:null}
        case PROYECTO_ERROR:
            return {...state,error:action.payload,loading:false}
        default:
            return state;
    }
}

export default proyectoReducer;