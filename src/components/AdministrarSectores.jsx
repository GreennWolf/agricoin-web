import React, { useEffect, useState } from "react";
import { SectorItem } from "./SectorItem";
import Escuela from '../Img/escuela.jpg'

export function AdministrarSectores({sectores,socket}){

    const [sectorSelected , setSectorSelected] = useState('')
    const [modal,setModal] = useState('inactive')
    const [modalCrear,setModalCrear] = useState('inactive')
    const [modalEditar,setModalEditar] = useState('inactive')
    const [sectorCrear , setSectorCrear] = useState('')
    const [sectorEditar , setSectorEditar] = useState('')

    useEffect(()=>{
        const sector = sectores.find(sector => sector.idsector == sectorSelected)
        if(sector){
            setSectorEditar(sector.nombre)
        }
    },[sectorSelected])

    return <main>
        <h1 className="titulo">Administrar Sectores</h1>
        <div className="options">
            <div className="option" onClick={()=>{
                setModal('modals-container')
                setModalCrear('modal-contenedor')
            }}>Crear Sector</div>
            <div className="option" onClick={()=>{
                if(sectorSelected != undefined && sectorSelected != ''){
                    setModal('modals-container')
                    setModalEditar('modal-contenedor')
                }else{
                    alert('Selecciona un Sector')
                }
            }}>Editar Sector</div>
            <div className="option" onClick={()=>{
                if(sectorSelected != undefined && sectorSelected != ''){
                    if(window.confirm('Estas seguro que quieres elimnar este sector')){
                        socket.emit('deleteSector',sectorSelected)
                    }
                }else{
                    alert('Selecciona un Sector')
                }
            }}>Eliminar Sector</div>
        </div>
        <div className={modal}>
            <div className={modalCrear}>
                <div className="close-modal" onClick={()=>{
                setModal('inactive')
                setModalCrear('inactive')
            }}>X</div>
                <img src={Escuela} alt="" />
                <form onSubmit={(e)=>{
                    e.preventDefault()
                    const data = {
                        nombre:sectorCrear
                    }
                    socket.emit('createSector',data)
                    setModal('inactive')
                    setModalCrear('inactive')
                }}>
                    <h1>Crear Sector</h1>
                    <input type="text" onChange={(e)=>{
                        setSectorCrear(e.target.value)
                    }} placeholder="Nombre del Sector" />
                    <button>CREAR</button>
                </form>
            </div>
            <div className={modalEditar}>
                <div className="close-modal" onClick={()=>{
                setModal('inactive')
                setModalEditar('inactive')
            }}>X</div>
                <img src={Escuela} alt="" />
                <form onSubmit={(e)=>{
                    e.preventDefault()
                    const data ={
                        idsector:sectorSelected,
                        nombre:sectorEditar
                    }
                    socket.emit('updateSector',data)
                    setModal('inactive')
                    setModalEditar('inactive')
                }}>
                    <h1>Editar Sector</h1>
                    <input onChange={(e)=>{
                        setSectorEditar(e.target.value)
                    }} value={sectorEditar} type="text" placeholder="Nombre del Sector" />
                    <button>Editar</button>
                </form>
            </div>
        </div>
        <div className="grid-container">
            {
                sectores.map(sector =>{
                    return <SectorItem sector={sector} sectorSelected={sectorSelected} setSectorSelected={setSectorSelected}/>
                })
            }
        </div>
    </main>
}