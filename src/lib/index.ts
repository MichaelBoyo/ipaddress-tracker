import "url-search-params-polyfill";

export type LoginRequest = {
  username: string;
  password: string;
};
export const userLogsInOptions = ({ username, password }: LoginRequest) => {
  const client_secret = "e29joFQQR1J1jBHS7oMoRvnJUgUppVsl";

  const formData = new URLSearchParams();
  formData.append("grant_type", "password");
  formData.append("client_id", "login-app");
  formData.append("client_secret", client_secret);
  formData.append("username", username);
  formData.append("password", password);

  return {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formData.toString(),
    json: true,
  };
};

export const getUserUnlockToken = async (data: LoginRequest) => {
  const scheme = "http";
  const host = "localhost:8080";
  const realm = "SpringBootKeycloak";
  const userLoginUri = `${scheme}://${host}/realms/${realm}/protocol/openid-connect/token`;
  const response = await fetch(userLoginUri, userLogsInOptions(data));
  const responseJson = await response.json();
  console.log("acces_token ", responseJson.access_token);
  if (responseJson.error) {
    console.error("error ", responseJson.error);
  }
  console.log("json ", responseJson);
  return responseJson.access_token;
};
