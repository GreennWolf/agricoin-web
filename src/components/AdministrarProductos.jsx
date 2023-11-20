import React, { useEffect, useState } from "react";
import { ProductoItem } from "./ProductoItem";

export function AdministrarProductos({socket,productos,sectores}){

    const [productoSelected , setProductoSelected] = useState('')
    const [modalCrear,setModalCrear] = useState('inactive')
    const [modalEditar,setModalEditar] = useState('inactive')

    const [productoCrear , setProductoCrear] = useState('')
    const [sectorCrear , setSectorCrear] = useState(sectores[0]?.idsector)
    const [productoEditar , setProductoEditar] = useState('')
    const [sectorEditar , setSectorEditar] = useState('')


    useEffect(()=>{
        socket.on('eliminarAgricoin',()=>{
            alert('Lo lamentamos no se puede eliminar este producto')
        })
    },[])

    useEffect(()=>{
        const producto = productos.find(producto => producto.idproducto == productoSelected)
        if(producto){
            setProductoEditar(producto.nombre)
            setSectorEditar(producto.idsector)
        }
    },[productoSelected])

    return <main>
        <h1 className="titulo">Administrar Productos</h1>
        <div className="options">
            <div className="option" onClick={()=>{
                setModalCrear('modal-conversiones')
            }}>Crear Producto</div>
            <div className="option" onClick={()=>{
                if(productoSelected != '' && productoSelected != undefined){
                    setModalEditar('modal-conversiones')
                }else{
                    alert('Seleccionar Producto')
                }
            }}>Editar Producto</div>
            <div className="option" onClick={()=>{
                if(productoSelected != '' && productoSelected != undefined){
                    if(window.confirm('Estas seguro que quieres eliminar este producto')){
                        socket.emit('deleteProducto',productoSelected)
                    }
                }else{
                    alert('Seleccionar Producto')
                }
            }}>Eliminar Producto</div>
        </div>
        <div className={modalCrear}>
            <div className="modal-content">
                <div className="modal-form" action="">
                    <button className="close" onClick={()=>{
                        setModalCrear('inactive')
                    }}>X</button>
                    <label htmlFor="productos">Producto</label>
                    <input type="text" name="productos" id="productos" placeholder="Nombre del Producto" onChange={(e)=>{
                        setProductoCrear(e.target.value)}}/>
                    <label htmlFor="sector">Sector</label>
                    <select name="sector" id="sector" onChange={(e)=>{
                        setSectorCrear(e.target.value)
                    }}>
                        {
                            sectores.map(sector =>{
                                return <option value={sector.idsector}>{sector.nombre}</option>
                            })
                        }
                    </select>
                    <button className="submit" onClick={()=>{
                        const data = {
                            nombre:productoCrear,
                            idsector:sectorCrear
                        }
                        socket.emit('createProd',data)
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
                    <label htmlFor="productos">Producto</label>
                    <input value={productoEditar} type="text" name="productos" id="productos" placeholder="Nombre del Producto" onChange={(e)=>{
                        setProductoEditar(e.target.value)}}/>
                    <label htmlFor="sector">Sector</label>
                    <select name="sector" id="sector" onChange={(e)=>{
                        setSectorEditar(e.target.value)
                    }}>
                        {
                            sectores.map(sector =>{
                                return <option value={sector.idsector}>{sector.nombre}</option>
                            })
                        }
                    </select>
                    <button onClick={()=>{
                        const data = {
                            idproducto:productoSelected,
                            nombre:productoEditar,
                            idsector:sectorEditar
                        }
                        socket.emit('updateProducto',data)
                        setModalEditar('inactive')
                    }} className="submit">Editar</button>
                </div>
            </div>
        </div>
        <table className="table-conversiones">
            <thead>
                <tr>
                    <th>Producto</th>
                    <th>Sector</th>
                </tr>
            </thead>
            <tbody>
                {
                    productos.map(producto =>{
                        const sector = sectores.find(sector => sector.idsector == producto.idsector)
                        return <ProductoItem sector={sector} producto={producto} setProductoSelected={setProductoSelected} productoSelected={productoSelected}/>
                    })
                }
            </tbody>
        </table>
    </main>
}