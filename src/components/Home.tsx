import logo from "../logo.svg";

export default function Home(props: { viewAllFormsCB: () => void }) {
  return (
    <div className="flex flex-col justify-center">
      <div className="flex">
        <img className="h-48 flex-1" src={logo} />
        <div className="flex-1 flex items-center">
          <p>Welcome to the Home Page</p>
        </div>
      </div>

      <button
        className="bg-blue-700 text-white rounded-xl text-xl p-2 ml-2"
        onClick={props.viewAllFormsCB}
      >
        View Forms
      </button>
    </div>
  );
}
