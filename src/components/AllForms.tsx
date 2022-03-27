import { useState } from "react";
import { Form, Field, saveLocalForms } from "./Form";
interface FormData {
  id: number;
  title: string;
  formFields: Field[];
}
const getLocalForms: () => FormData[] = () => {
  const savedFormsJSON = localStorage.getItem("savedForms");
  const persistentFormFields = savedFormsJSON ? JSON.parse(savedFormsJSON) : [];
  return persistentFormFields;
};

const initialState: () => FormData[] = () => {
  const localForms = getLocalForms();
  return localForms;
};

export function AllForms(props: { closeFormCB: () => void }) {
  const [newForm, setNewForm] = useState(false);
  const [state, setState] = useState(() => initialState());
  const [openedForm, setOpenedForm] = useState(-1);
  const deleteForm = (id: Number) => {
    const allForms = [...state];
    const modifiedForms = allForms.filter((form) => form.id != id);
    setState(modifiedForms);
    saveLocalForms(modifiedForms);
  };

  const saveForm = () => {
    setState(initialState());
  };
  return (
    <div>
      <div className="flex flex-row gap-2">
        <button
          className="bg-blue-700 text-white font-bold rounded-xl py-2 px-4 my-4"
          onClick={(_) => {
            setNewForm(true);
          }}
        >
          New Form
        </button>
        <button
          className="bg-blue-700 text-white font-bold rounded-xl py-2 px-4 my-4"
          onClick={(_) => {
            setOpenedForm(-1);
            setNewForm(false);
            saveForm();
          }}
        >
          Close Form
        </button>
      </div>
      <div>
        {newForm && <Form id={null}></Form>}
        {!newForm &&
          (openedForm !== -1 ? (
            <Form id={openedForm} />
          ) : (
            state.map((form) => {
              return (
                <div
                  key={form.id.toString()}
                  className="flex flex-row p-4 gap-4 m-3 shadow-xl rounded-xl hover:-translate-y-1 hover:scale-102 hover:bg-blue-200 duration-300"
                >
                  <div className="flex flex-col">
                    <p>{form.title}</p>
                    <p className="bg-gray-200">
                      {form.formFields.length} fields
                    </p>
                  </div>
                  <button
                    className="bg-blue-700 text-white font-bold rounded-xl p-2"
                    onClick={(_) => setOpenedForm(form.id)}
                  >
                    Open
                  </button>
                  <button
                    className="bg-blue-700 text-white font-bold rounded-xl p-2"
                    onClick={(_) => deleteForm(form.id)}
                  >
                    Delete
                  </button>
                </div>
              );
            })
          ))}
      </div>
    </div>
  );
}
