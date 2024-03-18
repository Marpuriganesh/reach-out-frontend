import { BrowserRouter , Routes, Route } from "react-router-dom";
import PageMain from "./pages/PageMain";
import NotFound from "./pages/NotFound404";


function App(): JSX.Element {
  
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<PageMain path={'/'} />} />
        <Route
          path="/login"
          element={<PageMain path={'/login'} />}
        />
        <Route path="*" element={<NotFound />}/>

  
      </Routes>
    </BrowserRouter>
  );
}

export default App;
