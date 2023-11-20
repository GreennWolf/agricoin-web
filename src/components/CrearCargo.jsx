import React, { useState } from 'react'
import Escuela from '../Img/escuela.jpg'

export function CrearCargo({socket}) {

    const [cargo,setCargo] = useState('')

    function sendCargo(){
        const data ={
            cargo,
        }
        socket.emit('createCargo',data)
    }

  return <div className="contenedor">
  <h1 className="logo"><span className="nombre-empresa">Crear Cargo</span> </h1>
  <div className="wrapper animated bounceInLeft">
    <div className="info-empresa">
      <ul className="servicios">
        <li><i className="fa fa-map-marker"></i><img src={Escuela} alt="Escuela"/></li>
      </ul>
    </div>
    <div className="contacto">
      <form className="formulario">
        <p>
          <label>Cargo</label>
          <input className='input-crear' onChange={(e)=>{
            setCargo(e.target.value)
          }} type="text" required/>
        </p>
        <p class="full">
          <button onClick={()=>{
            sendCargo()
          }} className="boton-enviar">Enviar</button>
        </p>
      </form>
    </div>
  </div>
</div>
  
}

