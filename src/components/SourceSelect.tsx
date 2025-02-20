import Spacer from "./ui/Spacer";
import Button from "./ui/Button";
import { FaX } from "react-icons/fa6";

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
    <>
      <h2>Filter by Source</h2>
      {selected && (
        <div className="flex items-center gap-2">
          <p className="font-light">{selected}</p>
          <Button icon={FaX} action={removeQuery} />
        </div>
      )}
      <Spacer space={10} />
      <div className="space-y-2">
        {sources.map((item) => (
          <p
            key={item}
            className="p-2 underline hover:cursor-pointer"
            onClick={() => {
              setQueryValue(item);
            }}
          >
            {item}
          </p>
        ))}
      </div>
    </>
  );
}

export default SourceSelect;
