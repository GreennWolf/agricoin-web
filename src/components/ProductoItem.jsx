import React, { useEffect, useState } from "react";

export function ProductoItem({sector,producto,productoSelected,setProductoSelected}){

    const [style,setStyle] = useState('')

    useEffect(()=>{
        if(productoSelected == producto.idproducto){
            setStyle('selected')
        }else{
            setStyle('')
        }
    })

    return <tr key={producto.idproducto} className={style} onClick={()=>{
        setProductoSelected(producto.idproducto)
    }}>
        <td>{producto.nombre}</td>
        <td>{sector.nombre}</td>
    </tr>
}