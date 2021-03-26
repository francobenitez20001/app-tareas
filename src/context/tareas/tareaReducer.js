import { AGREGAR_TAREA, CAMBIAR_ESTADO_TAREA, ELIMINAR_TAREA, MODIFICAR_TAREA, OBENTER_TAREAS_PROYECTO, OBTENER_TAREAS, SELECCIONAR_TAREA, VALIDAR_FORMULARIO_TAREA } from "../../types";

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
        case ELIMINAR_TAREA:
            return {...state,tareas:state.tareas.filter(tar=>tar.id !== action.payload)}
        case MODIFICAR_TAREA:
            return {
                ...state,
                tareas:state.tareas.map(tarea=>tarea.id === action.payload.id ? action.payload : tarea),
                tarea:null
            }
        case CAMBIAR_ESTADO_TAREA:
            return {
                ...state,
                tareas:state.tareas.map(tarea=>tarea.id === action.payload ? {...tarea,estado:!tarea.estado} : tarea)
            }
        case SELECCIONAR_TAREA:
            return {...state,tarea:action.payload}
        default:
            return state;
    }
}