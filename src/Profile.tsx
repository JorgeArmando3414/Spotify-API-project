import React, { useEffect, useState } from "react";
import Card from "./Card";
import Circle from "./Circle";
import Graph from "./Graph";
import {
  getProfileInfo,
  getTopTracksLT,
  getTopTracksMT,
  getTopTracksST,
  getTopArtistsLT,
  getTopArtistsMT,
  getTopArtistsST,
  getTopArtistsMTGenres,
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

  const [topGenres, setTopGenres] = useState<
    { genre: string; percentage: number }[]
  >([]);

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

      const topArtistsDataLT = await getTopArtistsLT(token);
      const topArtistsDataMT = await getTopArtistsMT(token);
      const topArtistsDataST = await getTopArtistsST(token);
      const topArtistsDataMTGenres = await getTopArtistsMTGenres(token);
      setTopArtistsLT(topArtistsDataLT.items);
      setTopArtistsMT(topArtistsDataMT.items);
      setTopArtistsST(topArtistsDataST.items);
      setTopArtists(topArtistsDataMT.items);

      const genres: string[] = [];
      topArtistsDataMTGenres.items.map((artist: any) => {
        artist.genres.map((genre: string) => {
          genres.push(genre);
        });
      });

      // Calculate the frequency of each genre
      const genreCount: { [key: string]: number } = {};
      genres.forEach((genre) => {
        genreCount[genre] = (genreCount[genre] || 0) + 1;
      });

      // Calculate the percentage for each genre
      const totalGenresCount = genres.length;
      const genrePercentages = Object.keys(genreCount).map((genre) => {
        return {
          genre,
          percentage: (genreCount[genre] / totalGenresCount) * 100,
        };
      });

      const sortedGenres = genrePercentages.sort(
        (a, b) => b.percentage - a.percentage
      );

      // Get the top 10 genres
      const top10Genres = sortedGenres.slice(0, 10);
      setTopGenres(top10Genres);
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
      <div className="bg-black min-h-[100vh] max-h-fit w-[100%] flex flex-col pt-10 gap-0 px-0 font-rubik justify-center">
        <div className="flex flex-row justify-between w-full items-center pb-16 px-16">
          <h2 className="font-bold text-white text-3xl">Spotify API Project</h2>
          <header className="bg-transparent text-white rounded-full flex flex-row w-fit gap-8 p-2 pr-6 items-center absolute top-6 left-[50%] -translate-x-[50%]">
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
        <section className="flex flex-col text-center bg-amber-300 py-48">
          <h2 className="mb-24 text-5xl text-[#333333] font-bold">
            Your Top Artists
          </h2>
          <nav className="w-full flex flex-row justify-center gap-12 pb-24 font-bold text-[#333333]">
            <button
              className="hover:text-black  text-xl transition hover:before:scale-x-100 hover:before:origin-center relative before:rounded-full before:w-full before:h-1 before:origin-center before:transition-transform before:duration-300 before:scale-x-0 before:bg-black  before:absolute before:left-0 before:bottom-[-4px]"
              onClick={() => artisthandler("ST")}
            >
              <p>Last 4 weeks</p>
            </button>
            <button
              className="hover:text-black  text-xl transition hover:before:scale-x-100 hover:before:origin-center relative before:rounded-full before:w-full before:h-1 before:origin-center before:transition-transform before:duration-300 before:scale-x-0 before:bg-black  before:absolute before:left-0 before:bottom-[-4px]"
              onClick={() => artisthandler("MT")}
            >
              Last 6 Months
            </button>
            <button
              className="hover:text-black text-xl transition hover:before:scale-x-100 hover:before:origin-center relative before:rounded-full before:w-full before:h-1 before:origin-center before:transition-transform before:duration-300 before:scale-x-0 before:bg-black  before:absolute before:left-0 before:bottom-[-4px]"
              onClick={() => artisthandler("LT")}
            >
              Last Year
            </button>
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
        <section className="flex flex-col text-center bg-red-600 py-48">
          <h2 className="mb-24 text-5xl text-[#C2C8D0] font-bold">
            Your Top Songs
          </h2>
          <nav className="w-full flex flex-row justify-center gap-12 pb-24 text-xl">
            <button
              className="hover:text-white transition hover:before:scale-x-100 hover:before:origin-center relative before:rounded-full before:w-full before:h-1 before:origin-center before:transition-transform before:duration-300 before:scale-x-0 before:bg-[#C2C8D0]  before:absolute before:left-0 before:bottom-[-4px]"
              onClick={() => trackhandler("ST")}
            >
              Last 4 weeks
            </button>
            <button
              className="hover:text-white transition hover:before:scale-x-100 hover:before:origin-center relative before:rounded-full before:w-full before:h-1 before:origin-center before:transition-transform before:duration-300 before:scale-x-0 before:bg-[#C2C8D0]  before:absolute before:left-0 before:bottom-[-4px]"
              onClick={() => trackhandler("MT")}
            >
              Last 6 Months
            </button>
            <button
              className="hover:text-white transition hover:before:scale-x-100 hover:before:origin-center relative before:rounded-full before:w-full before:h-1 before:origin-center before:transition-transform before:duration-300 before:scale-x-0 before:bg-[#C2C8D0]  before:absolute before:left-0 before:bottom-[-4px]"
              onClick={() => trackhandler("LT")}
            >
              Last Year
            </button>
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
        <section className="w-full flex flex-col items-center bg-[#48ACF0] py-48">
          <h2 className="mb-24 text-5xl text-[#333333] font-bold">
            Your Top Genres
          </h2>
          <div className="w-full md:w-[80%] flex justify-center">
            <Graph genres={topGenres} />
          </div>
        </section>
      </div>
    </>
  );
};

export default Profile;
