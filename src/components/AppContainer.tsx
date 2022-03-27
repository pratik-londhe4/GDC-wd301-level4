import { ReactNode } from "react";
import Headers from "../components/Headers";

export default function AppContainer(props: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-100 items-center">
      <div className=" p-4 mx-auto bg-white shadow-lg rounded-xl">
        <Headers title="Welcome" />
        <a
          className="bg-blue-700 text-white font-bold rounded-xl py-2 px-4 my-4"
          href="/"
        >
          Home
        </a>
        <a
          className="bg-blue-700 text-white font-bold rounded-xl py-2 px-4 my-4"
          href="/about"
        >
          About
        </a>
        {props.children}
      </div>
    </div>
  );
}
