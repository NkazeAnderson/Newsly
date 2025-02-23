import { useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import Button from "./Button";
import { QueryComponentsProps } from "../../types";

function SearchInput({ setQueryValue }: QueryComponentsProps) {
  const [keyword, setKeyword] = useState("");
  const search = () => {
    if (!keyword) {
      return;
    }
    setQueryValue(keyword);
    setKeyword("");
  };
  return (
    <div>
      <div className="flex gap-2 rounded-2xl border border-gray-400 bg-amber-50 p-0.5">
        <input
          className="px-2 focus:outline-0"
          value={keyword}
          onChange={(e) => {
            setKeyword(e.currentTarget.value);
          }}
          onKeyDown={(e) => {
            if (e.key.toLocaleLowerCase() === "enter") {
              search();
            }
          }}
        />
        <Button icon={FaMagnifyingGlass} action={search} />
      </div>
    </div>
  );
}

export default SearchInput;
