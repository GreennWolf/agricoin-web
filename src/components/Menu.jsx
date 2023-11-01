import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router";

export function Menu({usuarios,setUsuario}){

    const nav = useNavigate()
    const {idusuario} = useParams()

    console.log(idusuario)

    return <main>
        <section className="menu">
            <div className="menu-btn" onClick={()=>{
                nav('/AdministrarCuentas')
            }}>Administrar Cuentas</div>
            <div className="menu-btn" onClick={()=>{
                nav('/AdministrarSector')
            }}>Administrar Sector</div>
            <div className="menu-btn" onClick={()=>{
                nav('/AdministrarCargo')
            }}>Administrar Cargo</div>
            <div className="menu-btn" onClick={()=>{
                nav('/CrearProducto')
            }}>Administrar Producto</div>
            <div className="menu-btn" onClick={()=>{
                nav('/TransaccionesPen')
            }}>Transacciones Pendientes</div>
            <div className="menu-btn" onClick={()=>{
                nav('/Transacciones')
            }}>Transacciones</div>
            <div className="menu-btn" onClick={()=>{
                nav('/Conversiones')
            }}>Tabla de conversiones</div>
            <div className="menu-btn" onClick={()=>{
                nav('/Inventario')
            }}>Inventario</div>
        </section>
    </main>
}