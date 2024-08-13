import React, { useEffect, useRef, useState } from "react";
import Login from "./Login.tsx";
import Profile from "./Profile.tsx";

import { getAccessToken } from "./spotify";

const App: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);
  const hasFetchedToken = useRef(false);

  useEffect(() => {
    console.log("carga componente");
    const code = new URLSearchParams(window.location.search).get("code");
    const fetchToken = async (code: string) => {
      if (hasFetchedToken.current) return;
      hasFetchedToken.current = true;
      console.log("carga fetchToken");
      try {
        const token = await getAccessToken(code);
        setToken(token);
        window.history.pushState({}, "", "/");
      } catch (error) {
        console.error("Failed to fetch access token", error);
      }
    };
    if (code) {
      console.log("carga if code");
      fetchToken(code);
    }
  }, []);

  if (!token) {
    return <Login />;
  }

  return <Profile token={token} />;
};

export default App;
