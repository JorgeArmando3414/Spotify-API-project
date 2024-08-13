import React from "react";
import Card from "./Card";

const Listado: React.FC<{
  listaCompleta: any[];
  lista: any[];
  actual: number;
  setBusqueda: (busqueda: string) => void;
}> = ({ listaCompleta, lista, actual, setBusqueda }) => {
  {
    listaCompleta[0].followers
      ? (lista[0].type = "artist")
      : (lista[0].type = "song");
  }
  return (
    <>
      {listaCompleta[0].type == "song" &&
        listaCompleta.map((track, index) => (
          <Card
            index={index}
            nombre={track.name}
            imagen={track.album.images[0].url}
            artista={track.artists[0].name}
          />
        ))}
    </>
  );
};

export default Listado;
