import { useReducer } from 'react';
import { CERRAR_SESION, LOGIN_ERROR, LOGIN_EXITOSO, OBTENER_USUARIO, REGISTRO_ERROR, REGISTRO_EXITOSO } from "../../types/index";
import authReducer from './authReducer';
import {AuthContext} from './authContext';
import clienteAxios from '../../config/axios';
import tokenAuth from '../../config/token';

const AuthState = props=>{

    const INITIAL_STATE = {
        token:localStorage.getItem('token'),
        autenticado:false,
        usuario:null,
        mensaje:null,
    }

    const [state,dispatch] = useReducer(authReducer,INITIAL_STATE);

    const register = async data=>{
        try {
            const respuesta = await clienteAxios.post('/api/usuarios',data);
            //console.log(respuesta);
            dispatch({
                type:REGISTRO_EXITOSO,
                payload:respuesta.data
            });

            //Obtener usuario
            obtenerUsuario();
        } catch (error) {
            //console.log(error.response); 
            const alerta = {
                categoria:'alerta-error',
                msg:error.response.data.msg
            }
            dispatch({
                type:REGISTRO_ERROR,
                payload:alerta
            })
        }
    }

    const obtenerUsuario = async ()=>{
        const token = localStorage.getItem('token');
        if (token) {
            tokenAuth(token);
        }

        try {
            const respuesta = await clienteAxios.get('/api/auth');
            const {data:{usuario:dataUser}} = respuesta;
            dispatch({
                type:OBTENER_USUARIO,
                payload:dataUser
            })
        } catch (error) {
            dispatch({
                type:LOGIN_ERROR
            })
        }
    }

    const login = async data=>{
        try {
            const respuesta = await clienteAxios.post('/api/auth',data);
            dispatch({
                type:LOGIN_EXITOSO,
                payload:respuesta.data
            });
            
            obtenerUsuario();
        } catch (error) {
            const alerta = {
                categoria:'alerta-error',
                msg:error.response.data.msg
            }
            dispatch({
                type:LOGIN_ERROR,
                payload:alerta
            })
        }
    }

    const logout = async()=>{
        dispatch({type:CERRAR_SESION});
    }
    

    return(
        <AuthContext.Provider 
            value={{
                token:state.token,
                autenticado:state.autenticado,
                usuario:state.usuario,
                mensaje:state.mensaje,
                register,
                login,
                obtenerUsuario,
                logout
            }}>
            {props.children}
        </AuthContext.Provider>
    )
}
export default AuthState;