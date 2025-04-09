import React from "react";

const Load: React.FC<{}> = ({}) => {
  return (
    <div className="bg-amber-200 h-dvh w-[100%] flex items-center justify-center">
      <svg
        width="300"
        height="100"
        viewBox="0 0 300 100"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        <path fill="none" stroke="black" strokeWidth="12" strokeLinecap="round">
          <animate
            attributeName="d"
            dur="1.5s"
            repeatCount="indefinite"
            values="
              M0,50 C50,50 100,50 150,50 C200,50 250,50 300,50;
              M75,50 C100,50 100,-40 150,-40 C200,-40 200,50 225,50;
              M0,50 C50,50 100,50 150,50 C200,50 250,50 300,50"
          />
        </path>
      </svg>
    </div>
  );
};

export default Load;
