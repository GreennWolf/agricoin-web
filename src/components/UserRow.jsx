import React, { useEffect, useState } from "react";

export function UserRow({usuario,cargos,setUserSelected , userSelected}){

    const cargo = cargos.find(cargo => cargo.idcargo == usuario.idcargo)
    const [style,setStyle] = useState('')

    useEffect(()=>{
        if(userSelected == usuario.idusuario){
            setStyle('selected')
        }else{
            setStyle('')
        }
    },[userSelected])

    return <tr key={usuario.idusuario} className={style} onClick={()=>{
        setUserSelected(usuario.idusuario)
    }}>
        <td>{usuario.apenom}</td>
        <td>{usuario.dni}</td>
        <td>{cargo?.cargo}</td>
        <td>{usuario.admin == 1? 'SI' : 'NO'}</td>
    </tr>
}