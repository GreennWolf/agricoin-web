import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../context/user";

export function Header({}){
    
    const nav = useNavigate()
    const {usuario , setUsuario } = useContext(UserContext)
    const user = usuario != undefined && usuario != '' ? JSON.parse(usuario) : ''
    return <header>
        <h1 onClick={()=>{
            nav(`/menu/${user.idusuario}`)
        }}>Transacciones App</h1>
        <h2 className="titulo-header">{user.apenom}</h2>
        {usuario != '' ? <button class="button-19" role="button" onClick={()=>{
            nav('/')
            setUsuario('')
        }}>Cerrar Sesion</button> : ''}
    </header>
}