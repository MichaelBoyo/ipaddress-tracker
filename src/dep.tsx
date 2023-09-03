import { useEffect, useState } from "react";
import axios from "axios";
export const App = () => {
  const [token, setToken] = useState("");

  const [data, setData] = useState("");

  const [username, setUsrname] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("http://localhost:8080/api/hello", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(result.data);
    };
    fetchData();
  }, [token]);

  const login = () => {
    window.location.href =
      "http://localhost:8080/realms/SpringBootKeycloak/protocol/openid-connect/auth?response_type=code&client_id=login-app&scope=openid&state=wEpV-dZEndbF8W7bAfDgbSFHdMCT4hNY_88IBeFHbbM%3D&redirect_uri=http://localhost:5173/login/oauth2/code/keycloak&nonce=gYgTiLios-bDtS9rDv2vvOHCST6xNbsS6SXRsqZ4NFs";
  };
  const params = new URLSearchParams(window.location.search);

  const getAccessToken = async () => {
    const result = await axios.get(
      "http://localhost:8080/realms/SpringBootKeycloak/protocol/openid-connect/token"
    );
    setToken(result.data.access_token);
    console.log("result", result.data);
  };
  useEffect(() => {
    if (params.get("code")) {
      getAccessToken();
    }
  }, [params]);
  return (
    <div>
      <h1>React App</h1>
      <p>{data}</p>
      <button onClick={login}>login</button>
    </div>
  );
};
