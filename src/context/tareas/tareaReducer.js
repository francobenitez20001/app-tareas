import { AGREGAR_TAREA, OBENTER_TAREAS_PROYECTO, OBTENER_TAREAS, VALIDAR_FORMULARIO_TAREA } from "../../types";

export default(state,action)=>{
    switch (action.type) {
        case OBTENER_TAREAS:
            return {...state,tareas:action.payload}
        case OBENTER_TAREAS_PROYECTO:
            return {...state,tareaPorProyecto:state.tareas.filter(tar=>tar.idProyecto === action.payload)}
        case AGREGAR_TAREA:
            return {...state,tareas:[...state.tareas,action.payload],errorFormulario:false}
        case VALIDAR_FORMULARIO_TAREA:
            return {...state,errorFormulario:action.payload}
        default:
            return state;
    }
}