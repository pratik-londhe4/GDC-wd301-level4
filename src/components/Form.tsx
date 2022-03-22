import { ChangeEvent, HtmlHTMLAttributes, useState } from "react";
import FormField from "./FormField";
const formFields = [
  { id: 1, label: "First Name", type: "text", value: "" },
  { id: 2, label: "Last Name", type: "text", value: "" },
  { id: 3, label: "Email", type: "email", value: "" },
  { id: 4, label: "Date of Birth", type: "date", value: "" },
];
export function Form(props: { closeFormCB: () => void }) {
  const [newField, setNewField] = useState("");
  const [state, setState] = useState(formFields);

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

  const onInputFieldChangeCB = (i: number, e: any) => {
    let elements = [...state];
    let input = elements.filter((value, index) => {
      return elements[index].id === i;
    });

    const inputField = input[0];

    inputField.value = e.target.value;
    const index = elements.indexOf(inputField);

    elements[index] = inputField;
    setState(elements);
  };

  const clearForm = () => {
    let elements = [...state];
    elements = elements.map((value, index) => {
      elements[index].value = "";
      return value;
    });

    setState(elements);
  };

  return (
    <div className="flex flex-col p-4 divide-y divide-dotted">
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
          type="submit"
          className="bg-blue-700 text-white rounded-xl text-xl p-2"
        >
          Submit
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
