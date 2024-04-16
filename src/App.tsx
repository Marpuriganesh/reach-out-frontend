import { BrowserRouter , Routes, Route } from "react-router-dom";
import PageMain from "./pages/PageMain";
import NotFound from "./pages/NotFound404";
import { useEffect } from "react";
import { initializeAuthState } from "./auth_state/authSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./auth_state/store";



function App(): JSX.Element {

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(initializeAuthState());
  })

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