import React, { useEffect, useState } from "react";

export function ConverRow({converSelected,setConverSelected,producto,conversion}){
    const [style,setStyle] = useState('')

    useEffect(()=>{
        console.log(converSelected,'converted')
        if(converSelected == conversion?.idconversion){
            setStyle('selected')
        }else{
            setStyle('')
        }
    },[converSelected])

    return <tr onClick={()=>{
        setConverSelected(conversion.idconversion)
    }} className={style}>
        <td>{producto?.nombre}</td>
        <td>{conversion?.agricoin}</td>
    </tr>
}