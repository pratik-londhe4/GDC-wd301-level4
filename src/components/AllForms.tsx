import { Link } from "raviger";
import { useState } from "react";
import { saveLocalForms } from "./Form";
import { FormData } from "../types/formTypes";
const getLocalForms: () => FormData[] = () => {
  const savedFormsJSON = localStorage.getItem("savedForms");
  const persistentFormFields = savedFormsJSON ? JSON.parse(savedFormsJSON) : [];
  return persistentFormFields;
};

const initialState: () => FormData[] = () => {
  const localForms = getLocalForms();
  return localForms;
};

export function AllForms(props: { search: string }) {
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
        <Link
          href="/form/0"
          className="bg-blue-700 text-white font-bold rounded-xl py-2 px-4 my-4"
        >
          New Form
        </Link>
      </div>

      <div>
        {state
          .filter((form) =>
            form.title
              .toLocaleLowerCase()
              .includes(props.search?.toLocaleLowerCase() || "")
          )
          .map((form) => {
            return (
              <div
                key={form.id.toString()}
                className="flex flex-row p-4 gap-4 m-3 shadow-xl rounded-xl hover:-translate-y-1 hover:scale-102 hover:bg-blue-200 duration-300"
              >
                <div className="flex flex-col">
                  <p>{form.title}</p>
                  <p className="bg-gray-200">{form.formFields.length} fields</p>
                </div>
                <Link
                  href={`/form/${form.id}`}
                  className="bg-blue-700 text-white font-bold rounded-xl p-2"
                >
                  Open
                </Link>

                <Link
                  href={`/preview/${form.id}`}
                  className="bg-blue-700 text-white font-bold rounded-xl p-2"
                >
                  Preview
                </Link>
                <button
                  className="bg-blue-700 text-white font-bold rounded-xl p-2"
                  onClick={(_) => deleteForm(form.id)}
                >
                  Delete
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
}
