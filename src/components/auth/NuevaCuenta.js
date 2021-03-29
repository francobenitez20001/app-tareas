import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {AlertaContext} from '../../context/alertas/alertaContext';
import {AuthContext} from '../../context/autenticacion/authContext';

const NuevaCuenta = (props) => {

    const [usuario, setUsuario] = useState({
        nombre:'',
        email:'',
        password:'',
        cpassword:''
    })

    const {alerta,mostrarAlerta} = useContext(AlertaContext);
    const {register,mensaje,autenticado} = useContext(AuthContext);

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
        if(usuario.nombre.trim() === '' || usuario.email.trim() === '' || usuario.password.trim() === '' || usuario.cpassword.trim() === ''){
            mostrarAlerta('Todos los campos son obligatorios','alerta-error');
            return;
        }

        //password minimo de 6 caracteres
        if(usuario.password.length <=6 || usuario.cpassword.length <= 6){
            mostrarAlerta('El password debe ser mayor a 6 caracteres', 'alerta-error');
            return;
        }

        //los 2 password sean iguales
        if(usuario.password !== usuario.cpassword){
            mostrarAlerta('Las contraseñas no coinciden','alerta-error');
            return;
        }

        
        //pasarlo al action
        register(usuario);
    }
    return (
        <div className="form-usuario">
            {alerta ? <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div> : null}
            <div className="contenedor-form sombra-dark">
                <h1>Obtener una cuenta</h1>

                <form onSubmit={handleSubmit}>
                    <div className="campo-form">
                        <label htmlFor="nombre">Nombre</label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            placeholder="Tu nombre"
                            value={usuario.nombre}
                            onChange={handleChange}/>
                    </div>
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
                        <label htmlFor="cpassword">Confirmar password</label>
                        <input
                            type="password"
                            id="cpassword"
                            name="cpassword"
                            placeholder="Confirma tu password"
                            value={usuario.cpassword}
                            onChange={handleChange}/>
                    </div>
                    <div className="campo-form">
                        <input
                            type="submit"
                            value="Registrarme"
                            className="btn btn-primario btn-block"/>
                    </div>
                </form>
                <Link to="/" className="enlace-cuenta">Ingresar con mi cuenta</Link>
            </div>
        </div>
    );
}
 
export default NuevaCuenta;