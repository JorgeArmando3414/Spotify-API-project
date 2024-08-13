import React, { useState, useEffect } from "react";

const Listado: React.FC<{
  listaCompleta: any[];
  lista: any[];
  actual: number;
  setBusqueda: (busqueda: string) => void;
}> = ({ listaCompleta, lista, actual, setBusqueda }) => {
  const VALOR_POR_PAGINA = 5;
  const [busquedaLocal, setBusquedaLocal] = useState("");

  const listaFiltrada = listaCompleta.filter((item) =>
    item.name.toLowerCase().includes(busquedaLocal.toLowerCase())
  );

  useEffect(() => {
    setBusqueda(busquedaLocal);
  }, [busquedaLocal, setBusqueda]);

  return (
    <>
      <input
        type="text"
        placeholder="Search..."
        id="buscador"
        value={busquedaLocal}
        onChange={(e) => setBusquedaLocal(e.target.value)}
      />
      {listaFiltrada[0] == undefined ? (
        <p>No se han encontrado Resultados</p>
      ) : (
        <table className="table table-zebra bg-black">
          <thead>
            {listaFiltrada[0].followers ? (
              <tr>
                <th>#</th>
                <th> </th>
                <th>Nombre</th>
                <th>Followers</th>
              </tr>
            ) : (
              <tr>
                <th>#</th>
                <th> </th>
                <th>Nombre</th>
                <th>Artista</th>
                <th>Album</th>
              </tr>
            )}
          </thead>
          <tbody>
            {lista.map((track: any, index) => {
              const displayIndex = (actual - 1) * VALOR_POR_PAGINA + index + 1;
              return track.followers ? (
                <tr key={track.id}>
                  <td>
                    <p>{displayIndex}</p>
                  </td>
                  <td>
                    <div className="avatar">
                      <div className="mask mask-circle h-24 w-24">
                        <img src={track.images[0].url} alt="artists" />
                      </div>
                    </div>
                  </td>
                  <td>
                    <p>{track.name}</p>
                  </td>
                  <td>
                    <p>{track.followers.total}</p>
                  </td>
                </tr>
              ) : (
                <tr key={track.id}>
                  <td>
                    <p>{displayIndex}</p>
                  </td>
                  <td>
                    <div className="avatar">
                      <div className="mask mask-square h-24 w-24">
                        <img src={track.album.images[0].url} alt="album" />
                      </div>
                    </div>
                  </td>
                  <td>
                    <p>{track.name}</p>
                  </td>
                  <td>
                    <p>{track.artists[0].name}</p>
                  </td>
                  <td>
                    <p>{track.album.name}</p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Listado;
