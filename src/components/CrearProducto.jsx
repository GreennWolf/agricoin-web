import React, { useEffect, useState } from 'react'
import Escuela from '../Img/escuela.jpg'
import '../style/cuentas.css'

export function CrearProducto({socket,sectores}) {

    const [nombre,setNombre] = useState('')
    const [idSector,setIdSector] = useState('')

    function sendProd(){
        const data ={
            nombre,
            idSector,
        }
        socket.emit('createProd',data)
        console.log(data)
    }

    useEffect(()=>{
      setIdSector(sectores[0]?.idsector)
    },[])

  return <div className="contenedor">
  <h1 className="logo"><span className="nombre-empresa">Crear Producto</span> </h1>
  <div className="wrapper animated bounceInLeft">
    <div className="info-empresa">
      <ul className="servicios">
        <li><i className="fa fa-map-marker"></i><img src={Escuela} alt="Escuela"/></li>
      </ul>
    </div>
    <div className="contacto">
      <form className="formulario">
        <p>
          <label>Producto</label>
          <input className='input-crear' onChange={(e)=>{
            setNombre(e.target.value)
          }} type="text" required/>
        </p>
        <p>
          <label>Sector</label>
          <select name="sectores" id="sector" onChange={(e)=>{
                  setIdSector(e.target.value)
                  console.log(e.target.value)
                }}>
              {sectores.map(sector => {
                console.log(sector)
                return <option value={sector.idsector}>{sector.nombre}</option>
              })}
          </select>
        </p>
        <p className="full">
          <button onClick={(e)=>{
            e.preventDefault()
            console.log('data')
            sendProd()
          }} className="boton-enviar">Enviar</button>
        </p>
      </form>
    </div>
  </div>
</div>
  
}

