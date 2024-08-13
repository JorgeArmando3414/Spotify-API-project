import React from "react";

const Card: React.FC<{
  index: number;
  nombre: string;
  imagen: string;
  artista: string;
}> = ({ index, nombre, imagen, artista }) => {
  return (
    <div
      className="flex flex-row bg-black rounded-lg w-[22rem] text-ellipsis"
      key={index}
    >
      <div className="h-full w-[40%]">
        <img
          className="rounded-lg h-full rounded-e-none"
          src={imagen}
          alt="album"
        />
      </div>
      <div className="flex flex-col gap-4 justify-between py-1 px-4 w-[50%]">
        <h3 className="text-xl text-ellipsis h-[50%] text-wrap">{nombre}</h3>
        <h4 className="truncate text-gray-400 h-[20%] text-sm">{artista}</h4>
      </div>
    </div>
  );
};

export default Card;
