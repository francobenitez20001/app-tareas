import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {AlertaContext} from '../../context/alertas/alertaContext';
import {AuthContext} from '../../context/autenticacion/authContext';

const Login = (props) => {

    const [usuario, setUsuario] = useState({
        email:'',
        password:''
    })

    const {alerta,mostrarAlerta} = useContext(AlertaContext);
    const {login,mensaje,autenticado} = useContext(AuthContext);

    useEffect(() => {
        if(autenticado){
            props.history.push('/proyectos');
        }

        if(mensaje){
            mostrarAlerta(mensaje.msg,mensaje.categoria);
        }
    }, [mensaje,autenticado,props.history])

    const handleChange = event=>{
        setUsuario({
            ...usuario,
            [event.target.name]:event.target.value
        })
    }

    const handleSubmit = e=>{
        e.preventDefault();

        //validación
        if(usuario.email.trim() === '' || usuario.password.trim() === ''){
            mostrarAlerta('Todos los campos son obligatorios','alerta-error');
            return;
        }

        //pasarlo al action
        login(usuario);
    }

    return (
        <div className="form-usuario">
            {alerta ? <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div> : null}
            <div className="contenedor-form sombra-dark">
                <h1>Iniciar sesión</h1>

                <form onSubmit={handleSubmit}>
                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Tu email"
                            value={usuario.email}
                            onChange={handleChange}/>
                    </div>
                    <div className="campo-form">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Tu password"
                            value={usuario.password}
                            onChange={handleChange}/>
                    </div>
                    <div className="campo-form">
                        <input
                            type="submit"
                            value="Ingresar"
                            className="btn btn-primario btn-block"/>
                    </div>
                </form>
                <Link to="/nueva-cuenta" className="enlace-cuenta">Obtener cuenta</Link>
            </div>
        </div>
    );
}
 
export default Login;