import React from "react";
import { getAuthUrl } from "./spotify";
import "./index.css";

const Login: React.FC = () => {
  const handleLogin = async () => {
    const url = await getAuthUrl();
    window.location.href = url;
  };

  return (
    <main
      className="relative flex flex-col justify-center items-center h-[100vh] w-[100vw] text-center bg-amber-200 gap-24 font-rubik
     bg-[url(./assets/music.svg)] bg-repeat bg-center bg-[length:85px_100px] bg-blend-overlay animate-rowMovement"
    >
      <h1 className="font-bold font-rubik text-black/90">TrackFlow</h1>
      <button
        className="rounded-full bg-gray-100 text-black/80 font-bold drop-shadow-lg hover:text-black hover:bg-white transition"
        onClick={handleLogin}
      >
        Login with Spotify
      </button>
      <p className="text-black/90 font-rubik font-bold">
        Discover your favorite Artists, Songs and Genres
      </p>
    </main>
  );
};

export default Login;
