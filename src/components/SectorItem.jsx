import React, { useEffect, useState } from "react";

export function SectorItem({sector,setSectorSelected,sectorSelected}){

    const [style,setStyle] = useState('grid-item')

    useEffect(()=>{
        if(sectorSelected == sector.idsector){
            setStyle('item-selected')
        }else{
            setStyle('grid-item')
        }
    })

    return <div key={sector.idsector} className={style} onClick={()=>{
        setSectorSelected(sector.idsector)
    }}>
        {sector.nombre}
    </div>
}