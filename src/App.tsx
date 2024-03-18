import { BrowserRouter , Routes, Route } from "react-router-dom";
import PageMain from "./pages/PageMain";
import NotFound from "./pages/NotFound404";


function App(): JSX.Element {
  
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/home" element={<PageMain />} />
        <Route
          path="/"
          element={<PageMain />}
        />
        <Route path="*" element={<NotFound />}/>

  
      </Routes>
    </BrowserRouter>
  );
}

export default App;
