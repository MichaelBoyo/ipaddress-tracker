import { useEffect, useState } from "react";

const App = () => {
  const [userIp, setUserIp] = useState("");
  useEffect(() => {
    fetch("https://api64.ipify.org?format=json")
      .then((response) => response.json())
      .then((data) => {
        const userIp = data.ip;
        setUserIp(userIp);
        console.log(`Your IP address is: ${userIp}`);
      })
      .catch((error) => {
        console.error("Error fetching IP address:", error);
      });
  }, []);
  return (
    <div>
      <h1>IP Address: {userIp}</h1>
    </div>
  );
};

export default App;
