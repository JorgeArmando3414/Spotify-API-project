import React from "react";

const Circle: React.FC<{
  index: number;
  nombre: string;
  imagen: string;
}> = ({ index, nombre, imagen }) => {
  return (
    <div key={index} className="flex flex-col items-center gap-4 text-black">
      <div className="h-[70%]">
        <img
          className="rounded-full h-full aspect-square transition hover:scale-105"
          src={imagen}
          alt={nombre}
        />
      </div>

      <p className="font-semibold">{nombre}</p>
    </div>
  );
};

export default Circle;
