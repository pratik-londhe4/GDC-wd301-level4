import { useRoutes } from "raviger";
import About from "../About";
import App from "../App";
import AppContainer from "../components/AppContainer";
import { Form } from "../components/Form";

const routes = {
  "/": () => <App />,
  "/about": () => <About />,
  "/form/:id": ({ id }: { id: string }) => <Form id={+id}></Form>,
};
export default function AppRouter() {
  const routeResult = useRoutes(routes);
  return <AppContainer>{routeResult}</AppContainer>;
}
