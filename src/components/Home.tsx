import logo from "../logo.svg";
import { AllForms } from "./AllForms";
import { useQueryParams } from "raviger";
import { useState } from "react";
export default function Home() {
  const [{ search }, setQueryParams] = useQueryParams();
  const [searchString, setSearchString] = useState("");

  return (
    <div className="flex flex-col justify-center">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setQueryParams({ search: searchString });
        }}
      >
        <input
          value={searchString}
          type="text"
          name="search"
          className="border-2 w-full mt-6 border-gray-200 rounded-lg p-2 my-2 flex-1"
          onChange={(e) => {
            e.preventDefault();
            setSearchString(e.target.value);
          }}
        />
      </form>
      <AllForms search={search} />
    </div>
  );
}
