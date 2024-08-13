import React, { useEffect, useState } from "react";
import Listado from "./Listado";
import Paginacion from "./Paginacion";
import { getProfileInfo, getTopTracks, getTopArtists } from "./spotifyAPI";

const VALOR_POR_PAGINA = 5;

const Profile: React.FC<{
  token: string;
}> = ({ token }) => {
  const [profileInfo, setProfileInfo] = useState<any>(null);

  const [topTracks, setTopTracks] = useState<any[]>([]);
  const [topArtists, setTopArtists] = useState<any[]>([]);

  const [busquedaTracks, setBusquedaTracks] = useState<string>("");
  const [busquedaArtists, setBusquedaArtists] = useState<string>("");

  const filteredTracks = topTracks.filter((track) =>
    track.name.toLowerCase().includes(busquedaTracks.toLowerCase())
  );
  const filteredArtists = topArtists.filter((artist) =>
    artist.name.toLowerCase().includes(busquedaArtists.toLowerCase())
  );

  const [actualTracks, setActualTracks] = useState<number>(1);
  const [actualArtists, setActualArtists] = useState<number>(1);

  const totalTracks = Math.ceil(filteredTracks.length / VALOR_POR_PAGINA);
  const totalArtists = Math.ceil(filteredArtists.length / VALOR_POR_PAGINA);

  const handlePageChange = (
    setPage: React.Dispatch<React.SetStateAction<number>>,
    page: number
  ) => {
    setPage(page);
  };

  const paginatedTracks = filteredTracks.slice(
    (actualTracks - 1) * VALOR_POR_PAGINA,
    actualTracks * VALOR_POR_PAGINA
  );
  const paginatedArtists = filteredArtists.slice(
    (actualArtists - 1) * VALOR_POR_PAGINA,
    actualArtists * VALOR_POR_PAGINA
  );

  const handleLogout = () => {
    const url = "https://www.spotify.com/logout/";
    const logout = window.open(
      url,
      "Spotify Logout",
      "width=700,height=500,top=40,left=40"
    );
    if (logout) {
      const salir = () => {
        logout.close();
        window.location.href = "http://localhost:5173/";
      };
      setTimeout(() => salir(), 1000);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const profileData = await getProfileInfo(token);
      setProfileInfo(profileData);

      const tracksData = await getTopTracks(token);
      setTopTracks(tracksData.items);

      try {
        const topArtistsData = await getTopArtists(token);
        setTopArtists(topArtistsData.items);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [token]);

  useEffect(() => {
    setActualTracks(1);
  }, [busquedaTracks]);

  useEffect(() => {
    setActualArtists(1);
  }, [busquedaArtists]);

  if (!profileInfo || !topArtists[0] || !topTracks[0].name) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="bg-amber-200 min-h-[100vh] min-w-[99vw] flex flex-col pt-10 gap-16 px-12">
        <div className="flex flex-row justify-between w-full items-center">
          <h2 className="font-bold text-black text-3xl">Spotify API Project</h2>
          <header className="bg-transparent text-black rounded-full flex flex-row w-fit gap-8 p-2 pr-6 items-center absolute top-6 left-[50%] -translate-x-[50%]">
            <img
              className="w-auto rounded-full"
              src={profileInfo.images[0].url}
              alt="foto de perfil"
            />
            <div className="flex flex-col gap-2">
              <p className="font-bold text-xl">{profileInfo.display_name}</p>
              <p className="font-bold [&_strong]:text-red-600">
                <strong>{profileInfo.followers.total}</strong> Followers
              </p>
            </div>
          </header>
          <button
            className="bg-white text-black font-bold rounded-md h-fit"
            onClick={() => handleLogout()}
          >
            Logout
          </button>
        </div>
        <div className="flex flex-row justify-center h-[70vh]">
          <div className="flex flex-col w-[65%] max-h-full justify-between">
            <div className="max-h-fit overflow-hidden">
              <Listado
                listaCompleta={topTracks}
                lista={paginatedTracks}
                actual={actualTracks}
                setBusqueda={setBusquedaTracks}
              />
            </div>
            <div className="max-h-[10%]">
              <Paginacion
                actual={actualTracks}
                total={totalTracks}
                siguiente={() =>
                  handlePageChange(setActualTracks, actualTracks + 1)
                }
                anterior={() =>
                  handlePageChange(setActualTracks, actualTracks - 1)
                }
                onSelectPage={(page) => handlePageChange(setActualTracks, page)}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-center h-[70vh]">
          <div className="flex flex-col w-[65%] max-h-full justify-between">
            <div className="max-h-fit overflow-hidden">
              <Listado
                listaCompleta={topArtists}
                lista={paginatedArtists}
                actual={actualArtists}
                setBusqueda={setBusquedaArtists}
              />
            </div>
            <div className="max-h-[10%]">
              <Paginacion
                actual={actualArtists}
                total={totalArtists}
                siguiente={() =>
                  handlePageChange(setActualArtists, actualArtists + 1)
                }
                anterior={() =>
                  handlePageChange(setActualArtists, actualArtists - 1)
                }
                onSelectPage={(page) =>
                  handlePageChange(setActualArtists, page)
                }
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
