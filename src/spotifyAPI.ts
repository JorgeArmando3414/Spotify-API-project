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

export const getTopTracks = async (token: string) => {
  const response = await axios.get(`${baseUrl}/me/top/tracks`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getFollowedArtists = async (token: string) => {
  const response = await axios.get(`${baseUrl}/me/following?type=artist`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getTopArtists = async (token: string) => {
  const response = await axios.get(`${baseUrl}/me/top/artists`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
