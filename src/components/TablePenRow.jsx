import React, { useEffect, useState } from "react";

export function TablePenRow({tran,user,sectorO,sectorD,producto,cantidad,fecha,selected,setSelected}){

    const [style,setStyle] = useState("")

    useEffect(()=>{
        if (selected != tran.idtransaccion_pen){
            setStyle('')
            console.log(style,selected)
        }
    },[selected])

    return <tr className={style} key={tran.idtransaccion_pen} onClick={()=>{
        if(style == ''){
            setStyle('selected')
            setSelected(tran.idtransaccion_pen)
        }else{
            setStyle('')
            setSelected()
        }
    }}>
    <td>{tran.idtransaccion_pen}</td>
    <td>{user?.apenom}</td>
    <td>{sectorO?.nombre}</td>
    <td>{sectorD?.nombre}</td>
    <td>{producto?.nombre}</td>
    <td>{cantidad}</td>
    <td>{fecha}</td>
  </tr>
}