import React, { useEffect, useState } from "react";

export function TableRow({tran,user,sectorO,sectorD,producto,cantidad,fecha,selected,setSelected}){

    const [style,setStyle] = useState("")

    useEffect(()=>{
        if (selected != tran.idtransaccion){
            setStyle('')
            console.log(style,selected)
        }
    },[selected])

    return <tr className={style} key={tran.idtransaccion} onClick={()=>{
        if(style == ''){
            setStyle('selected')
            setSelected(tran.idtransaccion)
        }else{
            setStyle('')
            setSelected()
        }
    }}>
    <td>{tran.idtransaccion}</td>
    <td>{user?.apenom}</td>
    <td>{sectorO?.nombre}</td>
    <td>{sectorD?.nombre}</td>
    <td>{producto?.nombre}</td>
    <td>{cantidad}</td>
    <td>{fecha}</td>
  </tr>
}