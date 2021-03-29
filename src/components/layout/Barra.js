import React, { useContext, useEffect } from 'react';
import {AuthContext} from '../../context/autenticacion/authContext';

const Barra = () => {
    const {usuario,obtenerUsuario,logout} = useContext(AuthContext);
    useEffect(() => {
        obtenerUsuario();
    }, []);

    return ( 
        <header className="app-header">
            {usuario ?
            <>
                <p className="nombre-usuario">Hola <span>{usuario.nombre}</span></p>
                <nav className="nav-principal">
                    <button onClick={()=>logout()} className="btn btn-blank cerrar-sesion">Cerrar sesión</button>
                </nav>
            </> : null}
        </header>
    );
}
 
export default Barra;