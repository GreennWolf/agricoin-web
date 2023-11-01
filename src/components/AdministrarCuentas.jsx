import React, { useEffect, useState } from "react";
import { UserRow } from "./UserRow";
import Escuela from '../Img/escuela.jpg'
// wrapper-c animated bounceInLeft
export function AdministrarCuentas({socket,usuarios,cargos}){

    const [userSelected , setUserSelected] = useState('')
    const [apenom,setApenom] = useState('')
    const [password,setPassword] = useState('')
    const [dni,setDni] = useState('')
    const [cargo,setCargo] = useState(cargos[0]?.idcargo)
    const [admin,setAdmin] = useState(false)

    const [modalCrear,setModalCrear] = useState('inactive')
    const [modalEditar,setModalEditar] = useState('inactive')

    const [apenomEditar,setApenomEditar] = useState('')
    const [passwordEditar,setPasswordEditar] = useState('')
    const [dniEditar,setDniEditar] = useState('')
    const [cargoEditar,setCargoEditar] = useState(cargos[0]?.idcargo)
    const [adminEditar,setAdminEditar] = useState(false)


    function sendAccount(){
        const data ={
            apenom,
            password,
            dni,
            cargo,
            admin,
        }
        console.log(admin)
        socket.emit('createAccount',data)
    }

    function sendAccountEditar(){
        const data ={
            idusuario:userSelected,
            apenom:apenomEditar,
            password:passwordEditar,
            dni:dniEditar,
            cargo:cargoEditar,
            admin:adminEditar,
        }
        socket.emit('updateAccount',data)
    }

    useEffect(()=>{
        const user = usuarios.find(user => user.idusuario == userSelected)
        if(user){
            console.log(user)
            setApenomEditar(user?.apenom)
            setPasswordEditar(user?.password)
            setDniEditar(user?.dni)
            setCargoEditar(user?.cargo)
            setAdminEditar(user?.admin)
        }
    },[userSelected])

    return <main>
        <h1 className="titulo">Administrar Cuentas</h1>
        <div className="options">
            <div className="option" onClick={()=>{
                setModalCrear('wrapper-c animated bounceInLeft')
            }}>Crear Cuenta</div>
            <div className="option" onClick={()=>{
                if(userSelected != '' && userSelected != undefined){
                    setModalEditar('wrapper-c animated bounceInLeft')
                }else{
                    alert('Selecciona un Usuario')
                }
            }}>Editar Cuenta</div>
            <div className="option" onClick={()=>{
                if(userSelected != undefined && userSelected != ''){
                    if(window.confirm('Estas seguro que quieres eliminar esta cuenta')){
                        socket.emit('deleteAccount',userSelected)
                    }
                }else{
                    alert('Seleccionar usuario')
                }
            }}>Borrar Cuenta</div>
        </div>
    <div className={modalCrear}>
        <div className="close-modal" onClick={()=>{
            setModalCrear('inactive')
        }}>X</div>
        <div className="info-empresa-c">
        <ul className="servicios-c">
            <li><i className="fa fa-map-marker"></i><img src={Escuela} alt="Escuela"/></li>
        </ul>
        </div>
        <div className="contacto-c">
        <form className="formulario-c" onSubmit={(e)=>{
                e.preventDefault()
                sendAccount()
                setModalCrear('inactive')
            }}>
            <p>
            <label>Nombre</label>
            <input className='input-crear' onChange={(e)=>{
                setApenom(e.target.value)
            }} type="text" required/>
            </p>
            <p>
            <label>Contraseña</label>
            <input type="password" onChange={(e)=>{
                setPassword(e.target.value)
            }}/>
            </p>
            <p>
            <label>Documento</label>
            <input type="number" onChange={(e)=>{
                setDni(e.target.value)
            }} maxLength="8" />
            </p>

            <p>
            <label>Cargo</label>
            <select onChange={(e)=>{
                setCargo(e.target.value)
            }} name="cargos" id="">
                {
                    cargos.map(cargo =>{
                        return <option value={cargo.idcargo}>{cargo.cargo}</option>
                    })
                }
            </select>
            </p>

            <p>
            <label id="label-admin">Admin</label>
            <input type="checkbox" id="input-admin-c" onClick={()=>{
                setAdmin(!admin)
                console.log(admin)
            }} className="mycheck-c"/> <label for="input-admin-c"></label>
            </p>

            
            <p className="full">
            <button className="boton-enviar-c">Enviar</button>
            </p>
        </form>
        </div>
    </div>
    <div className={modalEditar}>
        <div className="close-modal" onClick={()=>{
            setModalEditar('inactive')
        }}>X</div>
        <div className="info-empresa-c">
        <ul className="servicios-c">
            <li><i className="fa fa-map-marker"></i><img src={Escuela} alt="Escuela"/></li>
        </ul>
        </div>
        <div className="contacto-c">
        <form className="formulario-c" onSubmit={(e)=>{
            e.preventDefault()
            sendAccountEditar()
            setModalEditar('inactive')
            setUserSelected('')
        }}>
            <p>
            <label>Nombre</label>
            <input value={apenomEditar} className='input-crear' onChange={(e)=>{
                setApenomEditar(e.target.value)
            }} type="text" required/>
            </p>
            <p>
            <label>Contraseña</label>
            <input value={passwordEditar} type="password" onChange={(e)=>{
                setPasswordEditar(e.target.value)
            }}/>
            </p>
            <p>
            <label>Documento</label>
            <input value={dniEditar} type="text" id="dni"  onChange={(e)=>{
                setDniEditar(e.target.value)
            }} maxLength="8"  onkeypress="return (event.charCode >= 45 && event.charCode <= 57)"/>
            </p>

            <p>
            <label>Cargo</label>
            <select value={cargoEditar} onChange={(e)=>{
                setCargoEditar(e.target.value)
            }} name="cargos">
                {
                    cargos.map(cargo =>{
                        return <option value={cargo.idcargo}>{cargo.cargo}</option>
                    })
                }
            </select>
            </p>

            <p>
            <label id="label-admin">Admin</label>
            <input checked={adminEditar}  type="checkbox" onClick={()=>{
                setAdminEditar(!admin)
                console.log(admin)
            }} className="mycheck-c" id="input-admin-c"/> <label for="input-admin-c"></label>
            </p>

            
            <p className="full">
            <button className="boton-enviar-c">Enviar</button>
            </p>
        </form>
        </div>
    </div>
        <table className="table-conversiones">
            <thead>
                <tr>
                    <th>Nombre y Apellido</th>
                    <th>D.N.I</th>
                    <th>Cargo</th>
                    <th>Admin</th>
                </tr>
            </thead>
            <tbody>
                {
                    usuarios.map(usuario =>{
                        return <UserRow userSelected={userSelected} setUserSelected={setUserSelected} usuario={usuario} cargos={cargos}/>
                    })
                }
            </tbody>
        </table>
    </main>
}