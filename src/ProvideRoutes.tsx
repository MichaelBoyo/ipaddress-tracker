import { useAuth } from "react-oidc-context";
import { Spin, Typography } from "antd";
const { Title } = Typography;

type Props = {
  children: React.ReactNode;
};

function PrivateRoute({ children }: Props) {
  const auth = useAuth();

  const subTitleStyle = { color: "grey" };

  if (auth.isLoading) {
    return (
      <div
        style={{
          textAlign: "center",
        }}
      >
        <Title>Keycloak is loading</Title>
        <Title level={2} style={subTitleStyle}>
          or running authorization code flow with PKCE
        </Title>
        <Spin size="large"></Spin>
      </div>
    );
  }

  if (auth.error) {
    return (
      <div style={{ textAlign: "center" }}>
        <Title>Oops ...</Title>
        <Title level={2} style={subTitleStyle}>
          {auth.error.message}
        </Title>
      </div>
    );
  }

  if (!auth.isAuthenticated) {
    auth.signinRedirect();
    return null;
  }

  return children;
}

export default PrivateRoute;
