import React from "react";
import Logo from "./ui/Logo";
import SearchInput from "./ui/SearchInput";
import { useQueryMethods } from "../hooks/useQueryMethods";
import { AppQueryParams } from "../types";

function NavBar() {
  const { setParam } = useQueryMethods();
  return (
    <div className="z-50 flex items-center justify-between space-x-2">
      <Logo />
      <SearchInput
        selected={""}
        setQueryValue={setParam(AppQueryParams.keyword)}
        removeQuery={() => {}}
      />
    </div>
  );
}

export default NavBar;
