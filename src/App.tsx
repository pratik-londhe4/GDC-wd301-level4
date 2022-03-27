import AppContainer from "./components/AppContainer";
import FormField from "./components/FormField";
import Headers from "./components/Headers";
import { useState } from "react";
import Home from "./components/Home";
import { Form } from "./components/Form";
import { AllForms } from "./components/AllForms";
function App() {
  const [state, setState] = useState("Home");

  const viewAllForms = () => {
    setState("AllForms");
  };
  const closeForm = () => {
    setState("Home");
  };
  return (
    <AppContainer>
      <div className=" p-4 mx-auto bg-white shadow-lg rounded-xl">
        <Headers title="Welcome to React-Typescript with Tailwind-css" />

        {state === "Home" ? (
          <Home viewAllFormsCB={viewAllForms} />
        ) : (
          <AllForms closeFormCB={closeForm} />
        )}
      </div>
    </AppContainer>
  );
}

export default App;
