import * as dotenv from "dotenv";
dotenv.config();

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const redirectUri = "http://localhost:5173";

const authEndpoint = "https://accounts.spotify.com/authorize";
const tokenEndpoint = "https://accounts.spotify.com/api/token";

export const getAuthUrl = () => {
  const scope =
    "user-read-private user-read-email user-top-read user-follow-read";
  const responseType = "code";
  return `${authEndpoint}?client_id=${clientId}&response_type=${responseType}&redirect_uri=${redirectUri}&scope=${scope}`;
};

export const getAccessToken = async (code: string) => {
  const searchParams = new URLSearchParams({
    grant_type: "authorization_code",
    code: code,
    redirect_uri: redirectUri,
  });

  try {
    const authOptions = {
      method: "post",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
      },
      body: searchParams,
      json: true,
    };
    const response = await fetch(tokenEndpoint, authOptions);
    const resp = await response.json();
    return resp.access_token;
  } catch (error) {
    console.error("Error getting access token:", error);
    throw error;
  }
};
