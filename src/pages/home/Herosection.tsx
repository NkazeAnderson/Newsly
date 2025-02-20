import { AppInfo } from "../../constants";

function Herosection() {
  return (
    <div className="h-[70vh] w-full bg-black/35 bg-[url(/hero.jpg)] bg-center bg-blend-overlay">
      <div className="flex h-full flex-col items-center justify-center gap-4 pt-[100px]">
        <h1 className="text-white capitalize">{AppInfo.name}</h1>
        <p className="font-mono font-medium tracking-wider text-white">
          Worldwide news in your pocket.
        </p>
        <p className="text-white">
          {" "}
          Get the latest trends for business, politics and more...
        </p>
      </div>
    </div>
  );
}

export default Herosection;
