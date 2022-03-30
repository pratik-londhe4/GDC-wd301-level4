import { Link } from "raviger";
import { ReactNode } from "react";
import Headers from "../components/Headers";

export default function AppContainer(props: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-100 items-center">
      <div className=" p-4 mx-auto bg-white shadow-lg rounded-xl">
        <Headers title="Welcome" />
        <Link
          className="bg-blue-700 text-white font-bold rounded-xl py-2 px-4 my-4"
          href="/"
        >
          Home
        </Link>
        <Link
          className="bg-blue-700 text-white font-bold rounded-xl py-2 px-4 my-4"
          href="/about"
        >
          About
        </Link>
        {props.children}
      </div>
    </div>
  );
}
