type Props = {
  periods: [Period, ...Period[]];
} & QueryComponentsProps;

function PeriodSelect({
  periods,
  selected,
  setQueryValue,
  removeQuery,
}: Props) {
  return (
    <div className="flex gap-1 rounded-full bg-amber-50 p-2">
      <label htmlFor="period">Dates:</label>
      <select
        className=""
        defaultValue={selected ?? "all"}
        name="peroid"
        id="period"
        onChange={(e) => {
          if (e.currentTarget.value === "all") {
            return removeQuery();
          }
          setQueryValue(e.currentTarget.value);
        }}
      >
        <option value={"all"}>{"All"}</option>
        {periods.map((item) => (
          <option key={item.value} value={item.value}>
            {item.text}
          </option>
        ))}
      </select>
    </div>
  );
}

export default PeriodSelect;
