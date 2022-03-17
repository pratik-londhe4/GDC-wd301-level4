import AppContainer from "./components/AppContainer";
import FormField from "./components/FormField";
import Headers from "./components/Headers";

function App() {
  const formFields = [
    { id: 1, label: "First Name", type: "text" },
    { id: 2, label: "Last Name", type: "text" },
    { id: 3, label: "Email", type: "email" },
    { id: 4, label: "Date of Birth", type: "date" },
  ];

  return (
    <AppContainer>
      <div className=" p-4 mx-auto bg-white shadow-lg rounded-xl">
        <Headers title="Welcome to React-Typescript with Tailwind-css" />
        {formFields.map((f) => {
          return (
            <FormField label={f.label} id={f.id} type={f.type}></FormField>
          );
        })}
        <button
          type="submit"
          className="bg-blue-700 text-white rounded-xl text-xl p-2"
        >
          Submit
        </button>
      </div>
    </AppContainer>
  );
}

export default App;
