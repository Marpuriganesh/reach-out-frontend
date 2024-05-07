/* eslint-disable @typescript-eslint/no-unused-vars */
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageMain from "./pages/PageMain";
import NotFound from "./pages/NotFound404";
import { useEffect } from "react";
import { initializeAuthState } from "./auth_state/authSlice";
import { useDispatch,useSelector } from "react-redux";
import { AppDispatch, RootState } from "./auth_state/store";
import Reddit from "./pages/Reddit";


function App(): JSX.Element {

  const reddit = useSelector((state: RootState) => state.reddit.reddit);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(initializeAuthState());
  });

  return (
    
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/home" element={<PageMain />} />
          {reddit && <Route path="/reddit" element={<Reddit />} />}
          <Route path="/" element={<PageMain />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    
  );
}

export default App;
