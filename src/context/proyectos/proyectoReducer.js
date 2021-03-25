import { AGREGAR_PROYECTO, FORMULARIO_PROYECTO, OBTENER_PROYECTOS, PROYECTO_ACTUAL, VALIDAR_FORMULARIO } from "../../types";

export default (state,action)=>{
    switch (action.type) {
        case FORMULARIO_PROYECTO:
            return {...state,nuevoProyecto:true}
        case OBTENER_PROYECTOS:
            return {...state,proyectos:action.payload}
        case AGREGAR_PROYECTO:
            return {...state,proyectos:[...state.proyectos,action.payload],nuevoProyecto:false,errorFormulario:false}
        case VALIDAR_FORMULARIO:
            return {...state,errorFormulario:true}
        case PROYECTO_ACTUAL:
            return {...state,proyecto:state.proyectos.filter(pr=>pr.id === action.payload)[0]}
        default:
            return state;
    }
}