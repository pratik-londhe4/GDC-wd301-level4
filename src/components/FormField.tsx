import { ChangeEvent } from "react";

export default function FormField(props: {
  label: string;
  type: string;
  id: number;
  value: any;
  onChangeCB: (i: number, e: ChangeEvent) => void;
  removeFieldCB: (id: number) => void;
}) {
  return (
    <div>
      <label key={props.id}>{props.label}</label>
      <div className="flex gap-2">
        <input
          className="border-2 border-gray-200 rounded-lg p-2 m-2 w-full"
          type={props.type}
          value={props.value}
          onChange={(e) => props.onChangeCB(props.id, e)}
        />
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
