import React, { useState } from 'react'
import Escuela from '../Img/escuela.jpg'

export function CrearSector({socket}) {

    const [nombre,setNombre] = useState('')

    function sendSector(){
        const data ={
            nombre,
        }
        socket.emit('createSector',data)
    }

  return <div className="contenedor">
  <h1 className="logo"><span className="nombre-empresa">Crear Sector</span> </h1>
  <div className="wrapper animated bounceInLeft">
    <div className="info-empresa">
      <ul className="servicios">
        <li><i className="fa fa-map-marker"></i><img src={Escuela} alt="Escuela"/></li>
      </ul>
    </div>
    <div className="contacto">
      <form className="formulario">
        <p>
          <label>Nombre</label>
          <input className='input-crear' onChange={(e)=>{
            setNombre(e.target.value)
          }} type="text" required/>
        </p>
        <p class="full">
          <button onClick={()=>{
            sendSector()
          }} className="boton-enviar">Enviar</button>
        </p>
      </form>
    </div>
  </div>
</div>
  
}

