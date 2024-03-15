import { BrowserRouter } from "react-router-dom";
import RouterRoutes from "./componets/Routings/RouterRoutes";

function App(): JSX.Element {
  return (
    <BrowserRouter basename="/">
      <RouterRoutes/>
    </BrowserRouter>
  );
}

export default App;
