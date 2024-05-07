/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { HashLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { clearRedditState } from "../auth_state/reddit";
import { AppDispatch } from "../auth_state/store";

function Reddit() {
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const stateParam = searchParams.get("state");
    const codeParam = searchParams.get("code");
    console.log(stateParam, codeParam);
    window.opener.postMessage(
      { state: stateParam, code: codeParam },
      "https://www.reach-out.in/"
    );

    return () => {
      dispatch(clearRedditState());
      window.close();
    };
  }, [location.search, dispatch]);

  return (
    <div>
      <HashLoader
        color="#ffffff"
        speedMultiplier={0.8}
        onClick={() => window.close()}
      />
    </div>
  );
}

export default Reddit;
