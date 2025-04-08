import React from "react";

const Circle: React.FC<{
  index: number;
  nombre: string;
  imagen: string;
  url: string;
}> = ({ index, nombre, imagen, url }) => {
  return (
    <div key={index} className="flex flex-col items-center gap-4 text-black">
      <div className="h-[70%]">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block overflow-hidden rounded-full h-full hover:bg-black transition duration-300 relative"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="white"
            className="size-10 absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] link-animate"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
            />
          </svg>
          <img
            className="rounded-full h-full aspect-square transition hover:opacity-0 drop-shadow-lg duration-300"
            src={imagen}
            alt={nombre}
          />
        </a>
      </div>

      <p className="font-semibold">{nombre}</p>
    </div>
  );
};

export default Circle;
