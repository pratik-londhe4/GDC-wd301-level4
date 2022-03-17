export default function FormField(props: {
  label: string;
  type: string;
  id: number;
}) {
  return (
    <div>
      <label key={props.id}>{props.label}</label>
      <input
        className="border-2 border-gray-200 rounded-lg p-2 m-2 w-full"
        type={props.type}
      />
    </div>
  );
}
