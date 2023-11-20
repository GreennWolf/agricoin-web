import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Escuela from '../Img/escuela.jpg'
import { UserContext } from "../context/user";


export function Login({ usuarios }) {

    const [dni, setDni] = useState('')
    const [password, setPassword] = useState('')
    const nav = useNavigate()
    const {usuario,setUsuario} = useContext(UserContext)
    const [error,setError] = useState('inactive')

    useEffect(()=>{
        setUsuario('')
        setError('inactive')
    },[])

    function Comprobar() {
        const usuario = usuarios.find(usuario => usuario.dni == dni && usuario.password == password && usuario.admin == 1)
        if (usuario != undefined && usuario != null) {
            nav(`/menu/${usuario.idusuario}`)
            const json = JSON.stringify(usuario)
            setUsuario(json)
        } else {
            setError('error')
        }
    }

    return <div class="contenedor">
        <h1 class="logo"><span className="nombre-empresa">Iniciar sesion</span> </h1>
        <div class="wrapper animated bounceInLeft">
            <div class="info-empresa">
                <ul class="servicios">
                    <li><i class="fa fa-map-marker"></i><img src={Escuela} alt="Escuela" /></li>
                </ul>
            </div>
            <div className="contacto">
                <form className="formulario">
                    <div>
                        <label htmlFor="dni">Documento</label><br />
                        <input type="number" name="dni" id="dni" placeholder="Documento" onChange={(e) => {
                            setDni(e.target.value)
                        }} />
                    </div><br/>
                    <div>
                        <label htmlFor="password">Contraseña</label><br />
                        <input type="password" name="password" id="password" placeholder="Contraseña" onChange={(e) => {
                            setPassword(e.target.value)
                        }} />
                    </div><br/>
                    <div>
                        <button onClick={(event) => {
                            event.preventDefault()
                            Comprobar()            
                        }} className="boton-login">Iniciar Sesion</button>
                    </div>
                    <div className={error}>Dni o Contraseña incorrecta</div>
                </form>
            </div>
        </div>
    </div>

}