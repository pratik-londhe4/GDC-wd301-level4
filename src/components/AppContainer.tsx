import { ReactNode } from "react";
import Headers from "../components/Headers";

export default function AppContainer(props: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-100 items-center">
      <div className=" p-4 mx-auto bg-white shadow-lg rounded-xl">
        <Headers title="Welcome to React-Typescript with Tailwind-css" />

        {props.children}
      </div>
    </div>
  );
}
