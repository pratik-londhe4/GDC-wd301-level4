import { useRoutes } from "raviger";
import About from "../About";
import App from "../App";
import AppContainer from "../components/AppContainer";

const routes = {
  "/": () => <App />,
  "/about": () => <About />,
};
export default function AppRouter() {
  const routeResult = useRoutes(routes);
  return <AppContainer>{routeResult}</AppContainer>;
}
