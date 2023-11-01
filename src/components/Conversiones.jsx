import React, { useEffect, useState } from "react";
import '../style/converciones.css'
import { ConverRow } from "./ConverRow";

export function Conversiones({socket,productos,agricoins,usuarios,conversiones}){

    const [modalCrear,setModalCrear] = useState('inactive')
    const [modalEditar,setModalEditar] = useState('inactive')
    const [converSelected,setConverSelected] = useState('')
    

    const idProductosEnAgricoins = agricoins.map(agricoin => agricoin.idproducto);

    // Filtrar la lista de productos para excluir los que están en agricoins
    const productosDisponibles = productos.filter(producto => !idProductosEnAgricoins.includes(producto.idproducto));

    const [crearProd,setCrearProd] = useState(productosDisponibles[0]?.idproducto)
    const [crearAgricoin,setCrearAgricoin] = useState('')
    const [crearProdDefault,setCrearProdDefault] = useState(productosDisponibles[0]?.idproducto)
    const [crearAgriCoinDefault,setCrearAgriCoinDefault] = useState('')
    
    
    const [prodSelected,setProdSelected] = useState('')
    const [agricoinSelected , setAgricoinSelected] = useState('')
    const [editarProd,setEditarProd] = useState('')
    const [editarAgricoin,setEditarAgricoin] = useState('')



    useEffect(()=>{
        if(converSelected != ''){
            const conver = conversiones.find(conver => conver.idconversion == converSelected)
            setProdSelected(conver?.idproducto)
            setAgricoinSelected(conver?.agricoin)
            setEditarProd(conver?.idproducto)
            setEditarAgricoin(conver?.agricoin)
        }
    },[converSelected])

    return <main >
        <h1 className="titulo">Tabla de Conversiones</h1>
        <div className="options">
            <div className="option" onClick={()=>{
                setModalCrear('modal-conversiones')
            }}>Crear Conversion</div>
            <div className="option" onClick={()=>{
                if(converSelected != ''){
                    setModalEditar('modal-conversiones')
                }else{
                    alert('SELECCIONE UNA CONVERSION')
                }
            }}>Editar Conversion</div>
            <div className="option" onClick={()=>{
                if(converSelected != ''){
                    if(window.confirm('Estas seguro que quieres elimnar esta conversion')){
                        socket.emit('deleteConversion',converSelected)
                    }
                }else{
                    alert('SELECCIONE UNA CONVERSION')
                }
            }}>Eliminar Conversion</div>
        </div>
        <div className={modalCrear}>
            <div className="modal-content">
                <div className="modal-form" action="">
                    <button className="close" onClick={()=>{
                        setModalCrear('inactive')
                    }}>X</button>
                    <label htmlFor="productos">Producto a transformar</label>
                    <select value={crearProdDefault} name="productos" id="productos" onChange={(e)=>{
                        setCrearProd(e.target.value)
                        setCrearProdDefault(e.target.value)
                    }}>
                        {
                            productosDisponibles.map(producto =>{
                                return <option value={producto.idproducto}>{producto.nombre}</option>
                            })
                            
                        }
                    </select>
                    <label htmlFor="cant">Equivalencia en AgriCoins</label>
                    <input value={crearAgriCoinDefault} type="number" name="cant" id="cant" onChange={(e)=>{
                        setCrearAgricoin(e.target.value)
                        setCrearAgriCoinDefault(e.target.value)
                    }} placeholder="Cantidad de agricoins" />
                    <button className="submit" onClick={()=>{
                        const data = {
                            idproducto:crearProd,
                            agricoin:crearAgricoin
                        }
                        socket.emit('crearConversion',data)
                        setCrearAgriCoinDefault('')
                        setCrearProdDefault(productos[0]?.idproducto)
                        setModalCrear('inactive')
                    }}>Crear</button>
                </div>
            </div>
        </div>
        <div className={modalEditar}>
            <div className="modal-content">
                <div className="modal-form" action="">
                    <button className="close" onClick={()=>{
                        setModalEditar('inactive')
                    }}>X</button>
                    <label htmlFor="productos">Producto a transformar</label>
                    <select value={editarProd} name="productos" id="productos" onChange={(e)=>{
                        setEditarProd(e.target.value)
                    }}>
                        {
                            productosDisponibles.map(producto =>{
                                return <option value={producto.idproducto}>{producto.nombre}</option>
                            })
                            
                        }
                    </select>
                    <label htmlFor="cant">Equivalencia en AgriCoins</label>
                    <input onChange={(e)=>{
                        setEditarAgricoin(e.target.value)
                    }} defaultValue={agricoinSelected} type="number" name="cant" id="cant" placeholder="Cantidad de agricoins" />
                    <button onClick={()=>{
                        const data = {
                            id:converSelected,
                            idproducto:editarProd,
                            agricoin:editarAgricoin
                        }
                        socket.emit('updateConversion',data)
                        setModalEditar('inactive')
                        setConverSelected('')
                    }} className="submit">Editar</button>
                </div>
            </div>
        </div>
        <table className="table-conversiones">
            <thead>
                <tr>
                    <th>Producto</th>
                    <th>Agricoins</th>
                </tr>
            </thead>
            <tbody>
                {conversiones.map(convercion =>{
                    console.log(convercion)
                    const producto = productos.find(producto => producto.idproducto == convercion.idproducto)
                    return <ConverRow setConverSelected={setConverSelected} converSelected={converSelected} producto={producto} conversion={convercion}/>
                })}
            </tbody>
        </table>
    </main>
}