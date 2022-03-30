import { Link, navigate } from "raviger";
import { useEffect, useRef, useState } from "react";
import FormField from "./FormField";

export interface FormData {
  id: number;
  title: string;
  formFields: Field[];
}
export interface Field {
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
  const addField = () => {
    setState({
      ...state,
      formFields: [
        ...state.formFields,
        {
          id: Number(new Date()),
          label: newField,
          type: "text",
          value: "",
        },
      ],
    });

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
        field.id === id ? { ...field, value: e.target.value } : field
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
      s
    </div>
  );
}
