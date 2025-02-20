import Button from "./ui/Button";

type Props = {
  categories: string[];
} & QueryComponentsProps;

function CategorySelect({
  categories,
  selected,
  setQueryValue,
  removeQuery,
}: Props) {
  return (
    <div className="flex flex-row flex-nowrap overflow-x-scroll capitalize">
      <Button
        text="For you"
        underlined={selected === null}
        action={removeQuery}
      />
      {categories.map((item) => (
        <Button
          key={item}
          text={item}
          underlined={selected === item}
          action={() => {
            setQueryValue(item);
          }}
        />
      ))}
    </div>
  );
}

export default CategorySelect;
