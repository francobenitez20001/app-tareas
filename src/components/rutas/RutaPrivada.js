import React,{useContext,useEffect} from 'react';
import { Route,Redirect } from "react-router-dom";
import {AuthContext} from '../../context/autenticacion/authContext';

const RutaPrivada = ({component:Component,...props}) => {
    const {autenticado,cargando,obtenerUsuario} = useContext(AuthContext);
    useEffect(() => {
        obtenerUsuario();
    }, [])

    return (
        <Route
            {...props}
            render={props=>!autenticado && !cargando?(
                <Redirect to="/"/>
            ):(
                <Component {...props}/>
            )}
        />
    );
}
 
export default RutaPrivada;
