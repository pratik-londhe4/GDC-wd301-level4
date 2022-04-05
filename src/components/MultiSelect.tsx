import { Field } from "../types/formTypes";

export default function MultiSelect(props: {
  answers: any;
  setAnswers: any;
  field: Field;
  index: any;
}) {
  const answers = props.answers;
  const setAnswers = props.setAnswers;
  const field = props.field;
  const index = props.index;
  return (
    <div>
      {field.kind == "dropdown" ? (
        <select
          multiple
          value={answers[index]}
          onChange={(e) => {
            const selected = Array.from(e.target.selectedOptions).map(
              (option) => option.value
            );

            const ans = [...answers];
            const updatedAnswers = ans.map((field, i) => {
              return i == index ? selected : "";
            });
            setAnswers(updatedAnswers);
          }}
        >
          <option value="Select">Select</option>
          {field.options.map((option) => {
            return <option value={option}>{option}</option>;
          })}
        </select>
      ) : (
        ""
      )}
    </div>
  );
}
