import { useState } from "react";
import { Form } from "./Form";

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

  return (
    <div>
      <div>
        <button
          className="bg-blue-700 rounder-xl"
          onClick={(_) => setNewForm(true)}
        >
          New Form
        </button>
      </div>
      <div>
        {newForm ? (
          <Form id={null}></Form>
        ) : (
          state.map((form) => {
            return (
              <div className="grid-cols-2 grid-flow-row">
                <Form id={(form as any).id}></Form>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
