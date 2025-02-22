import { Outlet } from "react-router";
import NavBar from "./components/NavBar";
import ArticlesContextProvider from "./contextProviders/ArticlesContextProvider";
import UserContextProvider from "./contextProviders/UserContextProvider";

function App() {
  return (
    <div className="h-screen w-screen overflow-hidden bg-amber-50">
      <div className="absolute top-0 z-50 w-screen bg-amber-100 p-4">
        <NavBar />
      </div>
      <div className="relative mt-[100px] h-screen overflow-y-scroll pb-28">
        <UserContextProvider>
          <ArticlesContextProvider>
            <Outlet />
          </ArticlesContextProvider>
        </UserContextProvider>
      </div>
    </div>
  );
}

export default App;
