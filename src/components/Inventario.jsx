import React, { useEffect, useState } from "react";
import '../style/inventario.css'
import { InventarioRow } from "./InventarioRow";

export function Inventario({socket,usuarios,sectores,inventario,productos}){

    const [inventarioSelected,setInventarioSelected] = useState('')
    const [modalCrear,setModalCrear] = useState('inactive')
    const [modalSuma,setModalSuma] = useState('inactive')
    const [modalResta,setModalResta] = useState('inactive')
    const [modalEditar,setModalEditar] = useState('inactive')

    const [sectorCrear,setSectorCrear] = useState('')
    const [productoCrear,setProductoCrear] = useState('')
    const [cantidadrCrear,setCantidadrCrear] = useState('')
    
    const [sectorEditar,setSectorEditar] = useState('')
    const [productoEditar,setProductoEditar] = useState('')
    const [cantidadrEditar,setCantidadrEditar] = useState('')

    const [suma,setSuma] = useState('')
    const [resta,setResta] = useState('')
    
    useEffect(()=>{
        socket.on('inventarioAdeleted',()=>{
            alert('Lo lamentamos no se puede eliminar este Inventario')
        })
    },[])
    
    useEffect(()=>{
        setSectorCrear(sectores[0]?.idsector)
        setProductoCrear(productos[0]?.idproducto)
    },[sectores,inventario])

    useEffect(()=>{
        const inve = inventario.find(inve => inve.idinventario == inventarioSelected)
        if(inve){
            setSectorEditar(inve.idsector)
            setProductoEditar(inve.idproducto)
            setCantidadrEditar(inve.cantidad)
        }
    },[inventarioSelected])

    return <main>
        <h1 className="titulo">Inventario</h1>
        <div className="options">
            <div className="optionI" onClick={()=>{
                setModalCrear('modal-inventario')
            }}>Comenzar Inventario</div>
            <div className="optionI" onClick={()=>{
                if(inventarioSelected != '' && inventarioSelected != undefined){
                    setModalSuma('modal-inventario')
                }else{
                    alert('Selecciona un inventario para editar')
                }
            }}>Sumar Cantidad</div>
            <div className="optionI" onClick={()=>{
                if(inventarioSelected != '' && inventarioSelected != undefined){
                    setModalEditar('modal-inventario')
                }else{
                    alert('Selecciona un inventario para editar')
                }
            }}>Editar Inventario</div>
            <div className="optionI" onClick={()=>{
                if(inventarioSelected != '' && inventarioSelected != undefined){
                    setModalResta('modal-inventario')
                }else{
                    alert('Selecciona un inventario para editar')
                }
            }}>Restar Cantidad</div>
            <div className="optionI" onClick={()=>{
                if(inventarioSelected != '' && inventarioSelected != undefined){
                    if(window.confirm('Estas seguro que quieres eliminar este inventario')){
                        socket.emit('deleteInventario',inventarioSelected)
                    }
                }else{
                    alert('Selecciona un inventario para editar')
                }
            }}>Eliminar Inventario</div>
        </div>

        <div className={modalSuma}>
            <form action="" onSubmit={(e)=>{
                e.preventDefault()
                var cant = parseInt(cantidadrEditar) + parseInt(suma)
                const data = {
                    id:inventarioSelected,
                    idsector:sectorEditar,
                    idproducto:productoEditar,
                    cantidad:cant
                }

                socket.emit('updateInventario',data)
                setModalSuma('inactive')
            }}>
                <button className="close-inventario" onClick={(e)=>{
                    e.preventDefault()
                    setModalSuma('inactive')
                    setInventarioSelected('')
                }}>X</button>
                <label style={{marginTop:60}} htmlFor="suma">Cantidad a Sumar</label>
                <input type="number" onChange={(e)=>{
                    setSuma(e.target.value)
                }} id="suma" placeholder="CANTIDAD"/>
                <button>Sumar</button>
            </form>
        </div>
        
        <div className={modalResta}>
            <form onSubmit={(e)=>{
                e.preventDefault()
                var cant = parseInt(cantidadrEditar) - parseInt(resta)
                const data = {
                    id:inventarioSelected,
                    idsector:sectorEditar,
                    idproducto:productoEditar,
                    cantidad:cant
                }

                socket.emit('updateInventario',data)
                setModalResta('inactive')
                setInventarioSelected('')
            }}>
            <button className="close-inventario" onClick={(e)=>{
                    e.preventDefault()
                    setModalResta('inactive')
                }}>X</button>
                <label style={{marginTop:60}} htmlFor="Resta">Cantidad a Restar</label>
                <input type="number" onChange={(e)=>{
                    setResta(e.target.value)
                }} id="Resta" placeholder="CANTIDAD"/>
                <button>Restar</button>
            </form>
        </div>
        <div className={modalCrear}>
            <form onSubmit={(e)=>{
                e.preventDefault()
                const data = {
                    idsector:sectorCrear,
                    idproducto:productoCrear,
                    cantidad:cantidadrCrear,
                }
                

                socket.emit('createInventario',data)
                setModalCrear('inactive')
            }}>
                <button className="close-inventario" onClick={(e)=>{
                    e.preventDefault()
                    setModalCrear('inactive')
                }}>X</button>
                <h1>Comenzar Inventario</h1>
                <label htmlFor="sectores">Sector</label>
                <select name="sectores" id="sectores" onChange={(e)=>{
                    setSectorCrear(e.target.value)
                }}>
                    {
                        sectores.map(sector =>{
                            return <option value={sector.idsector}>{sector.nombre}</option>
                        })
                    }
                </select>
                <label htmlFor="producto">Producto</label>
                <select name="producto" id="producto" onChange={(e)=>{
                    setProductoCrear(e.target.value)
                }}>
                    {
                        productos.map(producto =>{
                            return <option value={producto.idproducto}>{producto.nombre}</option>
                        })
                    }
                </select>
                <label htmlFor="cantidad">Cantidad</label>
                <input type="number" onChange={(e)=>{
                    setCantidadrCrear(e.target.value)
                }} placeholder="Cantidad"/>
                <button>Comenzar</button>
            </form>
        </div>
        <div className={modalEditar}>
            <form onSubmit={(e)=>{
                e.preventDefault()
                const data = {
                    id:inventarioSelected,
                    idsector:sectorEditar,
                    idproducto:productoEditar,
                    cantidad:cantidadrEditar,
                }
                

                socket.emit('updateInventario',data)
                setModalEditar('inactive')
            }}>
                <button className="close-inventario" onClick={(e)=>{
                    e.preventDefault()
                    setModalEditar('inactive')
                }}>X</button>
                <h1>Editar Inventario</h1>
                <label htmlFor="sectores">Sector</label>
                <select name="sectores" value={sectorEditar} id="sectores" onChange={(e)=>{
                    setSectorEditar(e.target.value)
                }}>
                    {
                        sectores.map(sector =>{
                            return <option value={sector.idsector}>{sector.nombre}</option>
                        })
                    }
                </select>
                <label htmlFor="producto">Producto</label>
                <select name="producto" value={productoEditar} id="producto" onChange={(e)=>{
                    setProductoEditar(e.target.value)
                }}>
                    {
                        productos.map(producto =>{
                            return <option value={producto.idproducto}>{producto.nombre}</option>
                        })
                    }
                </select>
                <label htmlFor="cantidad">Cantidad</label>
                <input type="number" value={cantidadrEditar} onChange={(e)=>{
                    setCantidadrEditar(e.target.value)
                }} placeholder="Cantidad"/>
                <button>Editar</button>
            </form>
        </div>
        <table className="table-conversiones">
            <thead>
                <tr>
                    <th>Sector</th>
                    <th>Producto</th>
                    <th>Cantidad</th>
                </tr>
            </thead>
            <tbody>
                {
                    inventario?.map(inve=>{
                        const producto = productos.find(producto => producto.idproducto == inve.idproducto)
                        const sector = sectores.find(sector => sector.idsector == inve.idsector)
                        return <InventarioRow inventario={inve} sector={sector} producto={producto} setInventarioSelected={setInventarioSelected} inventarioSelected={inventarioSelected}/>
                    })
                }
            </tbody>
        </table>
    </main>
}