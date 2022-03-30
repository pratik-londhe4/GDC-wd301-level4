import { useRoutes } from "raviger";
import About from "../About";
import AppContainer from "../components/AppContainer";
import { Form } from "../components/Form";
import Home from "../components/Home";
import Quiz from "../components/Quiz";

const routes = {
  "/": () => <Home />,
  "/about": () => <About />,
  "/form/:id": ({ id }: { id: string }) => <Form id={+id}></Form>,
  "/preview/:id": ({ id }: { id: string }) => <Quiz id={+id}></Quiz>,
};
export default function AppRouter() {
  const routeResult = useRoutes(routes);
  return <AppContainer>{routeResult}</AppContainer>;
}
