import Herosection from "./Herosection";
import Spacer from "../../components/ui/Spacer";
import SearchContent from "../../components/SearchContent";

function HomePage() {
  return (
    <>
      <Herosection />
      <Spacer space={10} />
      <SearchContent />
    </>
  );
}

export default HomePage;
