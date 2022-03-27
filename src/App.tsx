import { useState } from "react";
import Home from "./components/Home";
import { AllForms } from "./components/AllForms";
function App() {
  const [state, setState] = useState("Home");

  const viewAllForms = () => {
    setState("AllForms");
  };
  const closeForm = () => {
    setState("Home");
  };
  return state === "Home" ? (
    <Home viewAllFormsCB={viewAllForms} />
  ) : (
    <AllForms closeFormCB={closeForm} />
  );
}
export default App;
