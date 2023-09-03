import { useEffect, useState } from "react";

import { AuthContextProps, useAuth } from "react-oidc-context";
import AuthBar from "./AuthBar";
import { Typography, Layout } from "antd";
import { getToDos } from "./lib/todoapi";
const { Header } = Layout;
const { Title } = Typography;

function Home() {
  const [todos, setTodos] = useState([]);
  const auth: AuthContextProps = useAuth();
  const access_token = auth?.user?.access_token;

  useEffect(() => {
    const handleToDos = async () => {
      try {
        const response = await getToDos(access_token!);
        setTodos(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    handleToDos();
  }, [access_token]);

  // const onFinish = async (addToDoRequest) => {
  //     try {
  //         await myToDoListApi.addToDo(addToDoRequest, access_token)
  //         await handleToDos()
  //     } catch (error) {
  //         handleLogError(error)
  //     }
  // }

  // const onComplete = async (key) => {
  //     try {
  //         await myToDoListApi.updateToDo(key, true, access_token)
  //         await handleToDos()
  //     } catch (error) {
  //         handleLogError(error)
  //     }
  // }

  // const onDelete = async (key) => {
  //     try {
  //         await myToDoListApi.deleteToDo(key, access_token)
  //         await handleToDos()
  //     } catch (error) {
  //         handleLogError(error)
  //     }
  // }

  const isUser = () => {
    const { profile } = auth.user;
    const hasClientRole = profile?.claim_roles?.includes("user");
    return profile && hasClientRole;
  };

  return (
    <Layout>
      <Header>MyToDoList</Header>
      <AuthBar />
      {isUser() ? (
        <div>
          <div>{JSON.stringify(todos)}</div>
        </div>
      ) : (
        <div style={{ textAlign: "center" }}>
          <Title>Oops ...</Title>
          <Title level={2} style={{ color: "grey" }}>
            It looks like you do not have the MY-TODO-LIST-USER role!
          </Title>
        </div>
      )}
    </Layout>
  );
}

export default Home;
