import { library } from "@fortawesome/fontawesome-svg-core";
import { faCheckSquare, faCoffee } from "@fortawesome/free-solid-svg-icons";
import MainPage from "./pages/MainPage.tsx";
// import Text1 from "./Text1";

library.add(faCheckSquare, faCoffee);

function App() {
  return (
    <>
      <MainPage />
      {/*<div className="">*/}
      {/*  <h1 className="text-3xl font-bold underline">*/}
      {/*    <Text1 />*/}
      {/*    Hello world!*/}
      {/*  </h1>*/}
      {/*</div>*/}
    </>
  );
}

export default App;
