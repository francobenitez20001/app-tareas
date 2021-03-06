import { CERRAR_SESION, LOGIN_ERROR, LOGIN_EXITOSO, OBTENER_USUARIO, REGISTRO_ERROR, REGISTRO_EXITOSO } from "../../types/index";
export default (state,action)=>{
    switch (action.type) {
        case REGISTRO_EXITOSO:
            localStorage.setItem('token',action.payload.token);
            return {...state,autenticado:true,mensaje:null,cargando:false};
        case REGISTRO_ERROR:
            return {...state,token:null,mensaje:action.payload,cargando:false};
        case OBTENER_USUARIO:
            return {...state,usuario:action.payload,autenticado:true,cargando:false};
        case LOGIN_EXITOSO:
            localStorage.setItem('token',action.payload.token);
            return {...state,autenticado:true,mensaje:null,cargando:false};
        case LOGIN_ERROR:
            localStorage.removeItem('token');
            return {...state,token:null,mensaje:action.payload,cargando:false};
        case CERRAR_SESION:
            localStorage.removeItem('token');
            return {...state,token:null,usuario:null,mensaje:action.payload,autenticado:false};
        default:
            return state;
    }
}