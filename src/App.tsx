import { library } from "@fortawesome/fontawesome-svg-core";
import { faCheckSquare, faCoffee } from "@fortawesome/free-solid-svg-icons";
import MainPage from "./pages/MainPage.tsx";

library.add(faCheckSquare, faCoffee);

function App() {
  return (
    <>
      <MainPage />
    </>
  );
}

export default App;
