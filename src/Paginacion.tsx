import React from "react";

const Paginacion: React.FC<{
  actual: number;
  total: number;
  siguiente: () => void;
  anterior: () => void;
  onSelectPage: (page: number) => void;
}> = ({ actual, total, siguiente, anterior, onSelectPage }) => {
  return (
    <div className="flex flex-row justify-around">
      <button
        onClick={anterior}
        disabled={actual === 1}
        className="btn btn-info"
      >
        Anterior
      </button>
      {Array.from({ length: total }).map((_, index) => (
        <button
          key={index + 1}
          onClick={() => onSelectPage(index + 1)}
          disabled={actual === index + 1}
          className="btn btn-info btn-circle"
        >
          {index + 1}
        </button>
      ))}
      <button
        onClick={siguiente}
        disabled={actual === total}
        className="btn btn-info"
      >
        Siguiente
      </button>
    </div>
  );
};

export default Paginacion;
