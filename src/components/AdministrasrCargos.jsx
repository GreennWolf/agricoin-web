import React, { useEffect, useState } from "react";
import { CargoItem } from "./CargoItem";
import Escuela from '../Img/escuela.jpg'

export function AdministrarCargos({cargos,socket}){

    const [cargoSelected , setCargoSelected] = useState('')
    const [modal,setModal] = useState('inactive')
    const [modalCrear,setModalCrear] = useState('inactive')
    const [modalEditar,setModalEditar] = useState('inactive')
    const [cargoCrear , setCargoCrear] = useState('')
    const [cargoEditar , setCargoEditar] = useState('')

    useEffect(()=>{
        const cargo = cargos.find(cargo => cargo.idcargo == cargoSelected)
        if(cargo){
            setCargoEditar(cargo.cargo)
        }
    },[cargoSelected])

    return <main>
        <h1 className="titulo">Administrar cargos</h1>
        <div className="options">
            <div className="option" onClick={()=>{
                setModal('modals-container')
                setModalCrear('modal-contenedor')
            }}>Crear Cargo</div>
            <div className="option" onClick={()=>{
                if(cargoSelected != undefined && cargoSelected != ''){
                    setModal('modals-container')
                    setModalEditar('modal-contenedor')
                }else{
                    alert('Selecciona un Cargo')
                }
            }}>Editar Cargo</div>
            <div className="option" onClick={()=>{
                if(cargoSelected != undefined && cargoSelected != ''){
                    if(window.confirm('Estas seguro que quieres eliminar este cargo')){
                        socket.emit('deleteCargo',cargoSelected)
                    }
                }else{
                    alert('Selecciona un Cargo')
                }
            }}>Eliminar Cargo</div>
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
                        cargo:cargoCrear
                    }
                    socket.emit('createCargo',data)
                    console.log(data)
                    setModal('inactive')
                    setModalCrear('inactive')
                }}>
                    <h1>Crear Cargo</h1>
                    <input type="text" onChange={(e)=>{
                        setCargoCrear(e.target.value)
                    }} placeholder="Nombre del Cargo" />
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
                        idcargo:cargoSelected,
                        nombre:cargoEditar
                    }
                    socket.emit('updateCargo',data)
                    setModal('inactive')
                    setModalEditar('inactive')
                }}>
                    <h1>Editar Cargo</h1>
                    <input onChange={(e)=>{
                        setCargoEditar(e.target.value)
                    }} value={cargoEditar} type="text" placeholder="Nombre del Cargo" />
                    <button>Editar</button>
                </form>
            </div>
        </div>
        <div className="grid-container">
            {
                cargos.map(cargo =>{
                    return <CargoItem cargo={cargo} cargoSelected={cargoSelected} setCargoSelected={setCargoSelected}/>
                })
            }
        </div>
    </main>
}