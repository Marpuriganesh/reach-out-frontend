import { Routes, Route, useLocation } from "react-router-dom";
import PageMain from "../../pages/PageMain";
import NotFound from "../../pages/NotFound404";
import Temp from "../../pages/Temp";

function RouterRoutes(): JSX.Element {
  const location = useLocation();

  return (
    <>
      <Routes>
        <Route path="/" element={<PageMain path={location.pathname} />} />
        <Route
          path="/login"
          element={<PageMain path={location.pathname} />}
        />
        <Route
          path="/signin"
          element={<PageMain path={location.pathname} />}
        />

        <Route path='/lo/lo' element={<Temp/>}/>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default RouterRoutes;
