import React, { useState } from "react";
import { TableRow } from "./TableRow";

export function Transacciones({ socket,formatearFecha, transacciones, sectores, usuarios, productos }) {
  const [selected, setSelected] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 14; // Definir la cantidad de elementos por página

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = transacciones.slice(indexOfFirstItem, indexOfLastItem);

  function Autorizar() {
    if (selected != null && selected != '' && selected != undefined) {
      const transaccion = transacciones.find(transaccion => transaccion.idtransaccion_pen == selected);
      socket.emit('autorizarPen', transaccion);
    } else {
      alert('Selecciona una Transaccion');
    }
  }

  return (
    <main>
      <h1 className="titulo">Transacciones</h1>
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
          {currentItems.reverse().map(tran => {
            const user = usuarios.find(user => user.idusuario == tran.idusuario);
            const sectorO = sectores.find(sector => sector.idsector == tran.idsector_o);
            const sectorD = sectores.find(sector => sector.idsector == tran.idsector_d);
            const producto = productos.find(producto => producto.idproducto == tran.idproducto);
            const cantidad = tran.cantidad;
            const fecha = formatearFecha(tran.fecha)
            return (
              <TableRow
                key={tran.idtransaccion} // Cambiar la clave única si es necesario
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
          Página {currentPage} de {Math.ceil(transacciones.length / itemsPerPage)}
        </div>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={indexOfLastItem >= transacciones.length}
        >
          Siguiente
        </button>
      </div>
    </main>
  );
}
