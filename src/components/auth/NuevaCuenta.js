import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NuevaCuenta = () => {

    const [usuario, setUsuario] = useState({
        nombre:'',
        email:'',
        password:'',
        cpassword:''
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


        //password minimo de 6 caracteres


        //los 2 password sean iguales

        
        //pasarlo al action
    }

    return (
        <div className="form-usuario">
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