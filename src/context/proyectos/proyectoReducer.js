import { FORMULARIO_PROYECTO } from "../../types";

export default (state,action)=>{
    switch (action.type) {
        case FORMULARIO_PROYECTO:
            return {...state,nuevoProyecto:true}
        default:
            return state;
    }
}