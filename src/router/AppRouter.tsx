import { useRoutes } from "raviger";
import About from "../About";
import AppContainer from "../components/AppContainer";
import { Form } from "../components/Form";
import Home from "../components/Home";
import Quiz from "../components/Quiz";

const routes = {
  "/": () => <Home />,
  "/about": () => <About />,
  "/form/:formId": ({ formId }: { formId: string }) => (
    <Form id={+formId}></Form>
  ),
  "/preview/:formId": ({ formId }: { formId: string }) => (
    <Quiz id={+formId}></Quiz>
  ),
};
export default function AppRouter() {
  const routeResult = useRoutes(routes);
  return <AppContainer>{routeResult}</AppContainer>;
}
