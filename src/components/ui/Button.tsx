import { IconType } from "react-icons";

type Props = {
  text?: string;
  icon?: IconType;
  underlined?: boolean;
  action: VoidFunction;
  variant?: "ghosted" | "filled" | "outlined";
  round?: boolean;
};
function Button({
  text,
  icon: Icon,
  underlined,
  action,
  variant = "ghosted",
  round,
}: Props) {
  if (!text && !Icon) {
    return null;
  }
  return (
    <button
      className={`flex flex-nowrap items-center gap-2 rounded-md border-black p-2 text-nowrap ${underlined && "rounded-none border-b"} ${variant === "filled" ? "bg-black text-white" : variant === "outlined" ? "border text-black" : ""} ${round && "rounded-full"}`}
      onClick={(e) => {
        action();
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      {text && text}
      {Icon && <Icon className="size-4" />}
    </button>
  );
}

export default Button;
