import React, { useState } from "react";
import { TablePenRow } from "./TablePenRow";
import { useEffect } from "react";

export function TransaccionesPen({ socket,formatearFecha, transacciones_pen, sectores, usuarios, productos }) {
  const [selected, setSelected] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 12; // Definir la cantidad de elementos por página

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const arrayOrdenado = transacciones_pen.sort((a, b) => b.idtransaccion_pen - a.idtransaccion_pen);
  const currentItems = arrayOrdenado.slice(indexOfFirstItem, indexOfLastItem);


  function Autorizar() {
    if (selected != null && selected != '' && selected != undefined) {
      const transaccion = transacciones_pen.find(transaccion => transaccion.idtransaccion_pen == selected);
      socket.emit('autorizarPen', transaccion);
      console.log('autorizado');
    } else {
      alert('Selecciona una Transaccion');
    }
  }

  function Denegar(){
    if (selected != null && selected != '' && selected != undefined) {
      if(window.confirm('Estas seguro que quieres denegar esta transaccion')){
        const transaccion = transacciones_pen.find(transaccion => transaccion.idtransaccion_pen == selected);
        socket.emit('denegarPen', transaccion.idtransaccion_pen);
        console.log('denegado' , transaccion.idtransaccion_pen);
      }
    } else {
      alert('Selecciona una Transaccion');
    }
  }

  return (
    <main>
      <h1 className="titulo">Transacciones Pendientes</h1>
      <div className="OptionsPen">
        <button onClick={Autorizar}>Autorizar</button>
        <button onClick={Denegar}>Denegar</button>
      </div>
      <table className="table-conversiones">
        <thead>
          <tr>
            <th>ID Transacción</th>
            <th>Usuario</th>
            <th>Sector Origen</th>
            <th>Sector Destino</th>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map(tran => {
            const user = usuarios.find(user => user.idusuario == tran.idusuario);
            const sectorO = sectores.find(sector => sector.idsector == tran.idsector_o);
            const sectorD = sectores.find(sector => sector.idsector == tran.idsector_d);
            const producto = productos.find(producto => producto.idproducto == tran.idproducto);
            const cantidad = tran.cantidad;
            const fecha = formatearFecha(tran.fecha)
            return (
              <TablePenRow
                key={tran.idtransaccion_pen} // Agregar una clave única
                tran={tran}
                user={user}
                sectorO={sectorO}
                sectorD={sectorD}
                producto={producto}
                cantidad={cantidad}
                fecha={fecha}
                selected={selected}
                setSelected={setSelected}
              />
            );
          })}
        </tbody>
      </table>
    <div className="pagination">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <div className="pagination-info">
        Página {currentPage} de {Math.ceil(transacciones_pen.length / itemsPerPage)}
      </div>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={indexOfLastItem >= transacciones_pen.length}
        >
          Siguiente
        </button>
      </div>
    </main>
  );
}
