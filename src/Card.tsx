import React from "react";

const Card: React.FC<{
  key: number;
  nombre: string;
  imagen: string;
  artista: string;
}> = ({ key, nombre, imagen, artista }) => {
  return (
    <div
      className="flex flex-row bg-black rounded-lg h-auto text-ellipsis drop-shadow-2xl shadow-black transition hover:scale-110"
      key={key}
    >
      <div className="w-[50%]">
        <img
          className="rounded-lg rounded-e-none w-full h-full object-cover"
          src={imagen}
          alt="album"
        />
      </div>
      <div className="flex flex-col gap-4 justify-between py-1 px-4 w-[50%]">
        <h3 className="text-xl line-clamp-3">{nombre}</h3>
        <h4 className="truncate text-gray-400 text-sm">{artista}</h4>
      </div>
    </div>
  );
};

export default Card;
