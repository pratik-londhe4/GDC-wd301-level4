import { useState } from "react";
import { Field, FormData } from "./Form";
import FormField from "./FormField";
const getCurrentFormFields = (id: number) => {
  const savedFormsJSON = localStorage.getItem("savedForms");
  const savedForms = JSON.parse(savedFormsJSON || "");
  const form = savedForms.filter((form: FormData) => form.id == id)[0];
  return form.formFields;
};

const getCurrentQuizAnswers = (fields: Field[]) => {
  return fields.map((f) => (f.value = ""));
};

export default function Quiz(props: { id: number }) {
  const [fields, setFields] = useState(() => getCurrentFormFields(props.id));
  const [answers, setAnswers] = useState(() => getCurrentQuizAnswers(fields));

  const [index, setIndex] = useState(0);

  getCurrentFormFields(props.id);
  return (
    <div className="mt-4">
      <p className="p-2 float-right">{`${index + 1}/${fields.length}`}</p>

      <form onSubmit={(e) => e.preventDefault()}>
        <div className="p-2">
          {fields.map((field: Field, i: Number) => {
            return i === index ? (
              <div key={field.value}>
                <label key={field.label}>{field.label}</label>
                <div className="flex gap-2 flex-col">
                  <input
                    className="border-2 border-gray-200 rounded-lg p-2 m-2 w-full"
                    key={field.id.toString()}
                    value={answers[index]}
                    type={field.type}
                    onChange={(e) => {
                      const ans = [...answers];
                      ans[index] = e.target.value;
                      setAnswers(ans);
                    }}
                  ></input>
                </div>
              </div>
            ) : (
              ""
            );
          })}
          <div className="flex flex-col p-2">
            <p className="bg-red-200">
              {fields.length == 0 ? "This Form has no questions" : ""}
            </p>
            <p className="bg-red-200">
              {fields.length == index + 1 ? "Last Question" : ""}
            </p>
          </div>

          <div className="flex flex-row">
            <button
              className="bg-blue-700 text-white font-bold rounded-xl py-2 px-4 my-4 m-1 disabled:bg-blue-200"
              disabled={index + 1 == fields.length || fields.length == 0}
              onClick={(_) => {
                const i = index;
                setIndex(i + 1);
              }}
            >
              Next
            </button>
            <button
              className="bg-blue-700 text-white font-bold rounded-xl py-2 px-4 my-4 m-1 disabled:bg-blue-200"
              disabled={index == 0 || fields.length == 0}
              onClick={(_) => {
                const i = index;
                setIndex(i - 1);
              }}
            >
              Previous
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
