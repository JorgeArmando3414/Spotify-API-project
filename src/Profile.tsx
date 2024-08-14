import React, { useEffect, useState } from "react";
import Card from "./Card";
import Circle from "./Circle";
import {
  getProfileInfo,
  getTopTracksLT,
  getTopTracksMT,
  getTopTracksST,
  getTopArtistsLT,
  getTopArtistsMT,
  getTopArtistsST,
} from "./spotifyAPI";

const Profile: React.FC<{
  token: string;
}> = ({ token }) => {
  const [profileInfo, setProfileInfo] = useState<any>(null);
  const [topTracks, setTopTracks] = useState<any[]>([]);
  const [topArtists, setTopArtists] = useState<any[]>([]);

  const [topArtistLT, setTopArtistsLT] = useState<any[]>([]);
  const [topArtistMT, setTopArtistsMT] = useState<any[]>([]);
  const [topArtistST, setTopArtistsST] = useState<any[]>([]);

  const [topTracksLT, setTopTracksLT] = useState<any[]>([]);
  const [topTracksMT, setTopTracksMT] = useState<any[]>([]);
  const [topTracksST, setTopTracksST] = useState<any[]>([]);

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

      const tracksDataLT = await getTopTracksLT(token);
      const tracksDataMT = await getTopTracksMT(token);
      const tracksDataST = await getTopTracksST(token);
      setTopTracksLT(tracksDataLT.items);
      setTopTracksMT(tracksDataMT.items);
      setTopTracksST(tracksDataST.items);
      setTopTracks(tracksDataMT.items);

      try {
        const topArtistsDataLT = await getTopArtistsLT(token);
        const topArtistsDataMT = await getTopArtistsMT(token);
        const topArtistsDataST = await getTopArtistsST(token);
        setTopArtistsLT(topArtistsDataLT.items);
        setTopArtistsMT(topArtistsDataMT.items);
        setTopArtistsST(topArtistsDataST.items);
        setTopArtists(topArtistsDataMT.items);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [token]);

  const artisthandler = (time: string) => {
    switch (time) {
      case "ST":
        setTopArtists(topArtistST);
        break;
      case "MT":
        setTopArtists(topArtistMT);
        break;
      case "LT":
        setTopArtists(topArtistLT);
        break;
    }
  };

  const trackhandler = (time: string) => {
    switch (time) {
      case "ST":
        setTopTracks(topTracksST);
        break;
      case "MT":
        setTopTracks(topTracksMT);
        break;
      case "LT":
        setTopTracks(topTracksLT);
        break;
    }
  };

  if (!profileInfo || !topArtists[0] || !topTracks[0]) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="bg-amber-200 min-h-[100vh] max-h-fit min-w-[99vw] flex flex-col pt-10 gap-16 px-12 font-rubik">
        <div className="flex flex-row justify-between w-full items-center">
          <h2 className="font-bold text-black text-3xl">Spotify API Project</h2>
          <header className="bg-transparent text-black rounded-full flex flex-row w-fit gap-8 p-2 pr-6 items-center absolute top-6 left-[50%] -translate-x-[50%]">
            <img
              className="w-auto rounded-full"
              src={profileInfo.images[0].url}
              alt="foto de perfil"
            />
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-xl">
                {profileInfo.display_name}
              </p>
              <p className=" [&_strong]:text-red-600">
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
        <section className="flex flex-col text-center">
          <h2 className="my-24 text-4xl text-black font-bold">
            Top 10 Artists
          </h2>
          <nav className="w-full flex flex-row justify-center gap-12">
            <button onClick={() => artisthandler("ST")}>Last 4 weeks</button>
            <button onClick={() => artisthandler("MT")}>Last 6 Months</button>
            <button onClick={() => artisthandler("LT")}>Last Year</button>
          </nav>
          <div className="md:px-16 grid artists-grid">
            {topArtists.map((artist, ind) => (
              <Circle
                index={ind}
                nombre={artist.name}
                imagen={artist.images[0].url}
              />
            ))}
          </div>
        </section>
        <section className="flex flex-col text-center">
          <h2 className="my-24 text-4xl text-black font-bold">
            Top 20 Songs 😎
          </h2>
          <nav className="w-full flex flex-row justify-center gap-12">
            <button onClick={() => trackhandler("ST")}>Last 4 weeks</button>
            <button onClick={() => trackhandler("MT")}>Last 6 Months</button>
            <button onClick={() => trackhandler("LT")}>Last Year</button>
          </nav>
          <div className="h-fit container-grid px-16">
            {topTracks.map((track, index) => (
              <Card
                key={index}
                nombre={track.name}
                imagen={track.album.images[0].url}
                artista={track.artists[0].name}
              />
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default Profile;
