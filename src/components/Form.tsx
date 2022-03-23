import { ChangeEvent, HtmlHTMLAttributes, useState } from "react";
import FormField from "./FormField";

interface Field {
  id: number;
  label: string;
  type: string;
  value: string;
}
const formFields: Field[] = [
  { id: 1, label: "First Name", type: "text", value: "" },
  { id: 2, label: "Last Name", type: "text", value: "" },
  { id: 3, label: "Email", type: "email", value: "" },
  { id: 4, label: "Date of Birth", type: "date", value: "" },
];

const initialState: () => Field[] = () => {
  const formFieldsJSON = localStorage.getItem("formFields");
  const persistentFormFields = formFieldsJSON
    ? JSON.parse(formFieldsJSON)
    : formFields;
  return persistentFormFields;
};
const saveFormData = (currentState: any[]) => {
  localStorage.setItem("formFields", JSON.stringify(currentState));
};
export function Form(props: { closeFormCB: () => void }) {
  const [newField, setNewField] = useState("");
  const [state, setState] = useState(initialState());

  const addField = () => {
    setState([
      ...state,
      {
        id: Number(new Date()),
        label: newField,
        type: "text",
        value: "",
      },
    ]);
    setNewField("");
  };

  const removeField = (id: number) => {
    setState(state.filter((field) => field.id !== id));
  };

  const onInputFieldChangeCB = (id: number, e: any) => {
    let elements = [...state];
    elements = elements.map((field) =>
      field.id === id ? { ...field, value: e.target.value } : field
    );

    setState(elements);
  };

  const clearForm = () => {
    let elements = [...state];
    elements = elements.map((field) =>
      field.value !== "" ? { ...field, value: "" } : field
    );

    setState(elements);
  };

  return (
    <div className="flex flex-col p-4 divide-y divide">
      <div>
        {state.map((f) => {
          return (
            <FormField
              label={f.label}
              id={f.id}
              key={f.id}
              type={f.type}
              value={f.value}
              removeFieldCB={removeField}
              onChangeCB={onInputFieldChangeCB}
            ></FormField>
          );
        })}
      </div>
      <div className="flex gap-2">
        <input
          value={newField}
          type="text"
          className="border-2 border-gray-200 rounded-lg p-2 my-2 flex-1"
          onChange={(e) => {
            e.preventDefault();
            setNewField(e.target.value);
          }}
        />
        <button
          className="bg-blue-700 text-white font-bold rounded-xl py-2 px-4 my-4"
          onClick={addField}
        >
          Add Field
        </button>
      </div>

      <div className="flex gap-4">
        <button
          onClick={(_) => saveFormData(state)}
          className="bg-blue-700 text-white rounded-xl text-xl p-2"
        >
          Save
        </button>
        <button
          className="bg-blue-700 text-white rounded-xl text-xl p-2 ml-2"
          onClick={props.closeFormCB}
        >
          Close Form
        </button>
        <button
          onClick={clearForm}
          className="bg-blue-700 text-white rounded-xl text-xl p-2 ml-2"
        >
          Clear Form
        </button>
      </div>
    </div>
  );
}
