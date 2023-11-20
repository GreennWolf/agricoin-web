import React, { useEffect, useState } from "react";

export function CargoItem({cargo,setCargoSelected,cargoSelected}){

    const [style,setStyle] = useState('grid-item')

    useEffect(()=>{
        if(cargoSelected == cargo.idcargo){
            setStyle('item-selected')
        }else{
            setStyle('grid-item')
        }
    })

    return <div key={cargo.idcargo} className={style} onClick={()=>{
        setCargoSelected(cargo.idcargo)
    }}>
        {cargo.cargo}
    </div>
}