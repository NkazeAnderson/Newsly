import Spacer from "./ui/Spacer";
import Button from "./ui/Button";
import { FaX } from "react-icons/fa6";
import { QueryComponentsProps } from "../types";

type Props = {
  sources: string[];
} & QueryComponentsProps;
function SourceSelect({
  sources,
  selected,
  setQueryValue,
  removeQuery,
}: Props) {
  return (
    <div className="overflow-hidden">
      <h2>Filter by Source</h2>
      {selected && (
        <div className="flex items-center gap-2">
          <p className="font-light">{selected}</p>
          <Button icon={FaX} action={removeQuery} />
        </div>
      )}
      <Spacer space={10} />
      <div className="max-h-[60vh] space-y-2 overflow-y-scroll">
        {sources.map((item) => (
          <p
            key={item}
            className="underline hover:cursor-pointer"
            onClick={() => {
              setQueryValue(item);
            }}
          >
            {item}
          </p>
        ))}
      </div>
    </div>
  );
}

export default SourceSelect;
