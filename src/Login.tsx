import React from "react";
import { getAuthUrl } from "./spotify";

const Login: React.FC = () => {
  const handleLogin = () => {
    window.location.href = getAuthUrl();
  };

  return (
    <main className="flex flex-col justify-center items-center h-[100vh] w-[100vw] text-center bg-amber-200 gap-24 font-rubik">
      <h1 className="font-bold font-rubik text-black/90">
        Spotify API Project
      </h1>
      <button
        className="rounded-full bg-gray-100 text-black/80 font-bold drop-shadow-lg hover:text-black hover:bg-white transition"
        onClick={handleLogin}
      >
        Login with Spotify
      </button>
    </main>
  );
};

export default Login;
