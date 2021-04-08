import { AGREGAR_TAREA, CAMBIAR_ESTADO_TAREA, ELIMINAR_TAREA, MODIFICAR_TAREA, OBENTER_TAREAS_PROYECTO, OBTENER_TAREAS, SELECCIONAR_TAREA, TAREA_ERROR, TAREA_LOADING, VALIDAR_FORMULARIO_TAREA } from "../../types";

export default(state,action)=>{
    switch (action.type) {
        case OBTENER_TAREAS:
            return {...state,tareas:action.payload,loading:false,error:null}
        case OBENTER_TAREAS_PROYECTO:
            return {...state,tareaPorProyecto:state.tareas.filter(tar=>tar.idProyecto === action.payload)}
        case AGREGAR_TAREA:
            return {...state,tareas:[...state.tareas,action.payload],errorFormulario:false,loading:false,error:null}
        case VALIDAR_FORMULARIO_TAREA:
            return {...state,errorFormulario:action.payload}
        case ELIMINAR_TAREA:
            return {...state,tareas:state.tareas.filter(tar=>tar.id !== action.payload)}
        case MODIFICAR_TAREA:
            return {
                ...state,
                tareas:state.tareas.map(tarea=>tarea._id === action.payload.id ? action.payload : tarea),
                tarea:null
            }
        case CAMBIAR_ESTADO_TAREA:
            return {
                ...state,
                tareas:state.tareas.map(tarea=>tarea._id === action.payload ? {...tarea,estado:!tarea.estado} : tarea)
            }
        case SELECCIONAR_TAREA:
            return {...state,tarea:action.payload}
        case TAREA_LOADING:
            return {...state,loading:true}
        case TAREA_ERROR:
            return {...state,loading:false,error:action.payload}
        default:
            return state;
    }
}