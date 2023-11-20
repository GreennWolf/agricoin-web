import { Header } from "./components/Header";
import './style/app.css'
import { Menu } from "./components/Menu"; 
import { BrowserRouter, Route, Routes } from "react-router-dom";
import io from 'socket.io-client'
import { useContext, useEffect, useState } from "react";
import { Login } from "./components/Login";
import { CrearSector } from "./components/CrearSector";
import { CrearCargo } from "./components/CrearCargo";
import { CrearProducto } from "./components/CrearProducto";
import { TransaccionesPen } from "./components/TransaccionesPen";
import { Transacciones } from "./components/Transacciones";
import { Conversiones } from "./components/Conversiones";
import { Inventario } from "./components/Inventario";
import { UserContext } from "./context/user";
import { AdministrarCuentas } from "./components/AdministrarCuentas";
import { AdministrarSectores } from "./components/AdministrarSectores";
import { AdministrarCargos } from "./components/AdministrasrCargos";
import { AdministrarProductos } from "./components/AdministrarProductos";

function App() {

  const socket = io('http://localhost:5000')
  const [usuarios , setUsuarios] = useState([])

  const [sectores,setSectores] = useState([])
  const [cargos,setCargos] = useState([])
  const [productos,setProductos] = useState([])
  const [transacciones,setTransacciones] = useState([])
  const [transaccionesPen,setTransaccionesPen] = useState([])
  const [conversiones,setConversiones] = useState([])
  const [inventario,setInventario] = useState([])
  const [agricoins,setAgricoins] = useState([])

  useEffect(()=>{
    GetUser()
    GetSectores()
    GetProductos()
    GetCargos()
    GetTransacciones()
    GetTransaccionesPen()
    GetConversiones()
    GetInventario()
    GetAgricoins()

    socket.on('cambiosUser',()=>{
      GetUser()
    })

    socket.on('cambiosSectores',()=>{
      GetSectores()
    })

    socket.on('cambiosProductos',()=>{
      GetProductos()
    })

    socket.on('cambiosCargos',()=>{
      GetCargos()
    })
    
    socket.on('cambiosInventario',()=>{
      GetInventario()
    })

    socket.on('cambiosTransacciones',()=>{
      GetTransacciones()
      GetTransaccionesPen()
    })

    socket.on('cambiosConversiones',()=>{
      GetConversiones()
    })


    return ()=>{
      socket.off('eliminarAgricoin')
      socket.off('inventarioAdeleted')
    }
  },[])

  function GetUser(){
    socket.emit('getUsuarios')
    socket.on('putUsuarios',(usuarios)=>{
      setUsuarios(usuarios)
      console.log(usuarios)
    })
  }

  function GetAgricoins(){
    socket.emit('getAgricoins')
    socket.on('putAgricoins',(agricoins)=>{
      setAgricoins(agricoins)
      console.log(agricoins)
    })
  }

  function GetProductos(){
    socket.emit('getProductos')
    socket.on('putProductos',(productos)=>{
      setProductos(productos)
      // console.log(productos)
    })
  }

  function GetTransacciones(){
    socket.emit('getTransacciones')
    socket.on('putTransacciones',(Transacciones)=>{
      setTransacciones(Transacciones)
      // console.log(Transacciones)
    })
  }

  function GetTransaccionesPen(){
    socket.emit('getTransaccionesPen')
    socket.on('putTransaccionesPen',(TransaccionesPen)=>{
      setTransaccionesPen(TransaccionesPen)
      console.log(TransaccionesPen)
    })
  }

  function GetSectores(){
    socket.emit('getSectores')
    socket.on('putSectores',(sectores)=>{
      setSectores(sectores)
      // console.log(sectores)
    })
  }

  function GetCargos(){
    socket.emit('getCargos')
    socket.on('putCargos',(cargos)=>{
      setCargos(cargos)
      console.log(cargos)
    })
  }

  function GetConversiones(){
    socket.emit('getConversiones')
    socket.on('putConversiones',(conversiones)=>{
      setConversiones(conversiones)
      console.log(conversiones,'converciones')
    })
  }

  function GetInventario(){
    socket.emit('getInventario')
    socket.on('putinventario',(Inventario)=>{
      setInventario(Inventario)
      console.log(inventario,'inventario')
    })
  }

  function formatearFecha(fechaISO) {
    var fecha = new Date(fechaISO);
    var year = fecha.getFullYear();
    var month = fecha.getMonth() + 1;
    var day = fecha.getDate();
    var hours = fecha.getHours();
    var minutes = fecha.getMinutes();
    
    // Agregar ceros delante de los valores de un solo dígito
    month = month < 10 ? "0" + month : month;
    day = day < 10 ? "0" + day : day;
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
  
    var fechaLegible = day + "/" + month + "/" + year + " " + hours + ":" + minutes;
    return fechaLegible;
  }

  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Login usuarios={usuarios}/>}/>
        <Route path="/Menu/:idusuario" element={<Menu usuarios={usuarios}/>}/>
        <Route path="/AdministrarCuentas" element={<AdministrarCuentas usuarios={usuarios} cargos={cargos} socket={socket}/>}/>
        <Route path="/AdministrarSector" element={<AdministrarSectores socket={socket} sectores={sectores}/>}/>
        <Route path="/AdministrarCargo" element={<AdministrarCargos cargos={cargos} socket={socket}/>}/>
        <Route path="/CrearProducto" element={<AdministrarProductos socket={socket} sectores={sectores} productos={productos}/>}/>
        <Route path="/TransaccionesPen" element={<TransaccionesPen socket={socket} formatearFecha={formatearFecha} transacciones_pen={transaccionesPen} usuarios={usuarios} sectores={sectores} productos={productos}/>}/>
        <Route path="/Transacciones" element={<Transacciones socket={socket} formatearFecha={formatearFecha} transacciones={transacciones} usuarios={usuarios} sectores={sectores} productos={productos}/>}/>
        <Route path="/Conversiones" element={<Conversiones socket={socket} agricoins={agricoins} conversiones={conversiones} usuarios={usuarios} productos={productos}/>}/>
        <Route path="/Inventario" element={<Inventario inventario={inventario} socket={socket} usuarios={usuarios} sectores={sectores} productos={productos}/>}/>
      </Routes>
    </BrowserRouter>
  );
}


export default App;
