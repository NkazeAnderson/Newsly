import { Link } from "react-router";

function Logo() {
  return (
    <Link to={"/"}>
      <img className="size-[100px]" src="/logo.png" alt="logo" />
    </Link>
  );
}

export default Logo;
