import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {

    const [usuario, setUsuario] = useState({
        email:'',
        password:''
    })

    const handleChange = event=>{
        setUsuario({
            ...usuario,
            [event.target.name]:event.target.value
        })
    }

    const handleSubmit = e=>{
        e.preventDefault();

        //validación


        //pasarlo al action
    }

    return (
        <div className="form-usuario">
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