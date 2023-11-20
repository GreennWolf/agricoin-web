import React, { useEffect, useState } from "react";

export function InventarioRow({sector,producto,inventario,inventarioSelected,setInventarioSelected}){

    const [style,setStyle] = useState('')

    useEffect(()=>{
        if(inventarioSelected == inventario.idinventario){
            setStyle('selected')
        }else{
            setStyle('')
        }
    },[inventarioSelected])

    return <tr key={inventario.idinventario} className={style} onClick={()=>{
        setInventarioSelected(inventario.idinventario)
    }}>
        <td>{sector.nombre}</td>
        <td>{producto.nombre}</td>
        <td>{inventario.cantidad}</td>
    </tr>
}