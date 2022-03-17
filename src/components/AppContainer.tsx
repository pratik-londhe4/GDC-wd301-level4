import { ReactNode } from "react";

export default function AppContainer(props: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-100 items-center">
      {props.children}
    </div>
  );
}
