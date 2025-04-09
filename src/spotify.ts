const clientId = "8e69d6069d0547b2a141f306f0b17268";
const redirectUri = "http://trackflow.netlify.app";

const authEndpoint = "https://accounts.spotify.com/authorize";
const tokenEndpoint = "https://accounts.spotify.com/api/token";

const generateRandomString = (length: number) => {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], "");
};

const sha256 = (plain: string) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return window.crypto.subtle.digest("SHA-256", data);
};

const base64encode = (input: ArrayBuffer): string => {
  const bytes = new Uint8Array(input);
  const charString = String.fromCharCode(...Array.from(bytes));
  return btoa(charString)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
};

const getCodeChallenge = async () => {
  const codeVerifier = generateRandomString(64);
  window.localStorage.setItem("code_verifier", codeVerifier);
  console.log("V:" + codeVerifier);
  const hashed = await sha256(codeVerifier);
  console.log("H:" + hashed);
  const codeChallenge = base64encode(hashed);
  console.log("C:" + codeChallenge);
  return codeChallenge;
};

export const getAuthUrl = async () => {
  const cc = await getCodeChallenge();
  const scope =
    "user-read-private user-read-email user-top-read user-follow-read";
  const responseType = "code";
  return `${authEndpoint}?client_id=${clientId}&response_type=${responseType}&redirect_uri=${redirectUri}&scope=${scope}&code_challenge_method=${"S256"}&code_challenge=${cc}`;
};

export const getAccessToken = async (code: string) => {
  const codeVerifier = localStorage.getItem("code_verifier") || "error";
  const payload = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: clientId,
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
      code_verifier: codeVerifier,
    }),
  };
  const body = await fetch(tokenEndpoint, payload);
  const response = await body.json();
  return response.access_token;
};
