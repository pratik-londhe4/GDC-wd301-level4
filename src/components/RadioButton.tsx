import { ChangeEvent, useEffect, useState } from "react";
import { setConstantValue } from "typescript";
import { Field, FormData } from "../types/formTypes";
import { getLocalForms } from "../utils/formUtils";
import { saveLocalForms } from "./Form";

export default function RadioButton(props: {
  id: number;
  kind: "radio";
  label: string;
  options: string[];
  value: string;
  formId: number;
  onChangeCB: (i: number, e: ChangeEvent) => void;
  removeFieldCB: (id: number) => void;
}) {
  const [options, setOptions] = useState(props.options);
  useEffect(() => {
    let timeout = setTimeout(() => {
      const currentFormOpened = getLocalForms().filter(
        (form: FormData) => form.id == props.formId
      )[0];

      const currentFormFields = currentFormOpened.formFields.map(
        (field: Field) =>
          field.id == props.id && field.kind == "radio"
            ? { ...field, options: options }
            : field
      );

      const updatedForm = {
        ...currentFormOpened,
        formFields: currentFormFields,
      };
      saveLocalForms(
        getLocalForms().map((form: FormData) =>
          form.id == props.formId ? updatedForm : form
        )
      );
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [options]);
  return (
    <div>
      <label key={props.id}>{props.label}</label>
      <div className="flex gap-2">
        <input
          className="border-2 border-gray-200 rounded-lg p-2 m-2 w-full"
          type="text"
          value={props.label}
          onChange={(e) => props.onChangeCB(props.id, e)}
        />
        <div className="flex flex-col gap-2">
          {options.map((opt, i) => {
            return (
              <input
                className="h-full border-2"
                type="text"
                value={options[i]}
                onChange={(e) => {
                  const opt = [...options];
                  const updatedOptions = opt.map((o, indx) =>
                    indx == i ? (o = e.target.value) : o
                  );
                  setOptions(updatedOptions);
                }}
              />
            );
          })}
        </div>
        <div>
          <button
            className="bg-blue-700 text-white font-bold rounded-xl py-2 px-4 my-4"
            onClick={() => {
              const opt = [...options];
              const updatedOptions = [...opt, "new"];
              setOptions(updatedOptions);
              const currentFormOpened = getLocalForms().filter(
                (form: FormData) => form.id == props.formId
              )[0];

              const currentFormFields = currentFormOpened.formFields.map(
                (field: Field) =>
                  field.id == props.id && field.kind == "radio"
                    ? { ...field, options: options }
                    : field
              );

              const updatedForm = {
                ...currentFormOpened,
                formFields: currentFormFields,
              };
              saveLocalForms(
                getLocalForms().map((form: FormData) =>
                  form.id == props.formId ? updatedForm : form
                )
              );
            }}
          >
            Add Option
          </button>
        </div>
        <button
          className="bg-blue-700 text-white font-bold rounded-xl py-2 px-4 my-4"
          onClick={(_) => props.removeFieldCB(props.id)}
        >
          Remove
        </button>
      </div>
    </div>
  );
}
