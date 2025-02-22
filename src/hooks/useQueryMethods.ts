import { useSearchParams } from "react-router";
import { AppQueryParams } from "../types";


export function useQueryMethods() {
    const [searchParams, setSearchParams] = useSearchParams();
    const getQueryValueFor = (param: AppQueryParams) => searchParams.get(param);
    const setParam = (param: AppQueryParams) => (value: string) => {
      searchParams.set(param, value);
      setSearchParams(searchParams);
    };
    const deleteParam = (param: AppQueryParams) => () => {
      searchParams.delete(param);
      setSearchParams(searchParams);
    };
  return {getQueryValueFor, setParam, deleteParam}
}

