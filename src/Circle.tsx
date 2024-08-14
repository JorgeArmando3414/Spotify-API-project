import React from "react";

const Circle: React.FC<{
  index: number;
  nombre: string;
  imagen: string;
}> = ({ index, nombre, imagen }) => {
  return (
    <div key={index} className="flex flex-col items-center gap-4 text-black">
      <h2 className="font-semibold text-xl">{index + 1}</h2>
      <div className="h-[70%]">
        <img
          className="rounded-full h-full aspect-square transition"
          src={imagen}
          alt={nombre}
        />
      </div>

      <p>{nombre}</p>
    </div>
  );
};

export default Circle;
