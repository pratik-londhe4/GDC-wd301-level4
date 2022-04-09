import { Link, navigate } from "raviger";
import { useEffect, useRef, useState } from "react";
import FormField from "./FormField";
import { FormData, Field } from "../types/formTypes";
import RadioButton from "./RadioButton";

const fieldKinds: string[] = ["text", "dropdown", "radio"];
const formFields: Field[] = [
  { kind: "text", id: 1, label: "First Name", type: "text", value: "" },
  {
    kind: "radio",
    id: 2,
    label: "When You like your coffee?",
    options: ["Morning", "Night"],
    value: "",
  },
  {
    kind: "text",
    id: 3,
    label: "Tell us About Yourself",
    type: "textArea",
    value: "",
  },
  {
    kind: "dropdown",
    id: 4,
    label: "Priority of this",
    options: ["High", "Low"],
    selected: [""],
    value: "",
  },
];

const getLocalForms: () => FormData[] = () => {
  const savedFormsJSON = localStorage.getItem("savedForms");
  const persistentFormFields = savedFormsJSON ? JSON.parse(savedFormsJSON) : [];

  return persistentFormFields;
};

export const saveLocalForms = (localForms: FormData[]) => {
  localStorage.setItem("savedForms", JSON.stringify(localForms));
};
const saveFormData = (currentState: FormData) => {
  const localForms = getLocalForms();
  const updatedLocalForms = localForms.map((form) =>
    form.id === currentState.id ? currentState : form
  );

  saveLocalForms(updatedLocalForms);
};

const getNewField = (kind: string, label: string) => {
  switch (kind) {
    case "text": {
      const textField: Field = {
        id: Number(new Date()),
        label: label,
        kind: "text",
        type: "text",
        value: "",
      };

      return textField;
    }

    case "dropdown": {
      const dropdownField: Field = {
        id: Number(new Date()),
        kind: "dropdown",
        label: label,
        options: [""],
        selected: [""],
        value: "",
      };

      return dropdownField;
    }

    case "radio": {
      const radioField: Field = {
        id: Number(new Date()),
        kind: "radio",
        label: label,
        options: [""],
        value: "",
      };

      return radioField;
    }
  }
};
export function Form(props: { id: any }) {
  const initialState: () => FormData = () => {
    const localForms = getLocalForms();

    if (props.id !== 0) {
      return localForms.filter((form) => form.id === props.id)[0];
    }

    const newForm: FormData = {
      id: Number(new Date()),
      title: "Untitled Form",
      formFields: formFields,
    };

    saveLocalForms([...localForms, newForm]);
    return newForm;
  };
  const [newField, setNewField] = useState("");
  const [state, setState] = useState(() => initialState());
  const [selectedType, setSelectedType] = useState("text");

  const titleRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    state.id !== props.id && navigate(`/form/${state.id}`);
  }, [state.id, props.id]);
  useEffect(() => {
    const oldTitle = document.title;
    document.title = "Form Editor";
    titleRef.current?.focus();

    return () => {
      document.title = oldTitle;
    };
  }, []);

  useEffect(() => {
    let timeout = setTimeout(() => {
      saveFormData(state);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [state]);
  const addField = (kind: string) => {
    const emptyField = getNewField(kind, newField);
    const newState = emptyField
      ? { ...state, formFields: [...state.formFields, emptyField] }
      : { ...state };

    setState(newState);

    setNewField("");
  };

  const removeField = (id: number) => {
    setState({
      ...state,
      formFields: state.formFields.filter((field) => field.id !== id),
    });
  };

  const onInputFieldChangeCB = (id: number, e: any) => {
    setState({
      ...state,
      formFields: state.formFields.map((field) =>
        field.id === id ? { ...field, label: e.target.value } : field
      ),
    });
  };

  const clearForm = () => {
    setState({
      ...state,
      formFields: state.formFields.map((field) =>
        field.value !== "" ? { ...field, value: "" } : field
      ),
    });
  };

  return (
    <div className="flex flex-col p-4 divide-y divide">
      <input
        value={state.title}
        type="text"
        className="border-2 border-gray-200 rounded-lg p-2 my-2 flex-1"
        onChange={(e) => {
          e.preventDefault();
          setState({ ...state, title: e.target.value });
        }}
        ref={titleRef}
      />
      <div>
        {state.formFields.map((f) => {
          switch (f.kind) {
            case "text":
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
            case "dropdown":
              return (
                <div key={f.id}>
                  <select>
                    <option>Select</option>
                    {f.options.map((option) => {
                      return (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      );
                    })}
                  </select>
                  <button
                    className="bg-blue-700 text-white font-bold rounded-xl py-2 px-4 my-4"
                    onClick={(_) => removeField(f.id)}
                  >
                    Remove
                  </button>
                </div>
              );

            case "radio":
              return (
                <div>
                  <RadioButton
                    label={f.label}
                    id={f.id}
                    kind="radio"
                    options={f.options}
                    value={f.value}
                    formId={state.id}
                    onChangeCB={onInputFieldChangeCB}
                    removeFieldCB={removeField}
                  />
                </div>
              );
          }
        })}
      </div>
      <div className="flex gap-2">
        <div className="flex flex-row gap-2">
          <input
            value={newField}
            type="text"
            className="border-2 border-gray-200 rounded-lg p-2 my-2 flex-1"
            onChange={(e) => {
              e.preventDefault();
              setNewField(e.target.value);
            }}
          />
          <select
            value={selectedType}
            onChange={(e) => {
              setSelectedType(e.target.value);
            }}
          >
            <option>Select Kind</option>
            {fieldKinds.map((kind) => (
              <option value={kind}>{kind}</option>
            ))}
          </select>
          <button
            className="bg-blue-700 text-white font-bold rounded-xl py-2 px-4 my-4"
            onClick={(_) => addField(selectedType)}
          >
            Add Field
          </button>
        </div>
      </div>
      <div className="flex gap-4">
        <button
          onClick={(_) => saveFormData(state)}
          className="bg-blue-700 text-white rounded-xl text-xl p-2"
        >
          Save
        </button>

        <button
          onClick={clearForm}
          className="bg-blue-700 text-white rounded-xl text-xl p-2 ml-2"
        >
          Clear Form
        </button>
        <Link
          href="/"
          className="bg-blue-700 text-white rounded-xl text-xl p-2 ml-2"
        >
          Close Form
        </Link>
      </div>
    </div>
  );
}
