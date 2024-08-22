import axios from "axios";

const baseUrl = "https://api.spotify.com/v1";

export const getProfileInfo = async (token: string) => {
  const response = await axios.get(`${baseUrl}/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getTopTracksLT = async (token: string) => {
  const response = await axios.get(
    `${baseUrl}/me/top/tracks?time_range=long_term`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const getTopTracksMT = async (token: string) => {
  const response = await axios.get(
    `${baseUrl}/me/top/tracks?time_range=medium_term`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const getTopTracksST = async (token: string) => {
  const response = await axios.get(
    `${baseUrl}/me/top/tracks?time_range=short_term`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const getTopArtistsLT = async (token: string) => {
  const response = await axios.get(
    `${baseUrl}/me/top/artists?time_range=long_term&limit=10`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const getTopArtistsMT = async (token: string) => {
  const response = await axios.get(
    `${baseUrl}/me/top/artists?time_range=medium_term&limit=10`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const getTopArtistsST = async (token: string) => {
  const response = await axios.get(
    `${baseUrl}/me/top/artists?time_range=short_term&limit=10`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const getTopArtistsMTGenres = async (token: string) => {
  const response = await axios.get(
    `${baseUrl}/me/top/artists?time_range=medium_term&limit=50`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
