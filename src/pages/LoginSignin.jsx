/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect, useCallback } from "react";
import "./css files/LoginSignin.scss";
import SignIn from "../componets/assets/SignIn.svg";
import { AnimatedWave, CustomInput, Spinner } from "@reach-out/ui-library";
import NavBar from "../componets/NavBar";
import SignInElements from "../componets/SignInElements";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { login, logoutAsync } from "../auth_state/authSlice";
import axios from "axios";
import { ScaleLoader, BarLoader } from "react-spinners";
import InsertUserElements from "../componets/InsertUserElements";
import { useLocation, useNavigate } from "react-router-dom";
import { deviceType, osName, isMobile } from "react-device-detect";

function LoginSignin() {
  // MARK: - States
  const [scrollDisabled, setScrollDisabled] = useState(true);
  const [path, setPath] = useState("/");
  // const [path, setPath] = useState("/insert");
  const isLogined = useSelector((state) => state.auth.isLogined);
  const refresh_token = useSelector((state) => state.auth.refresh_token);
  const auth_token = useSelector((state) => state.auth.auth_token);
  const [provider_auth_token, setProvider_auth_token] = useState("");
  const [provider, setProvider] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loadSpinner, setLoadSpinner] = useState(false);
  const dispatch = useDispatch();
  const expires_in = useSelector((state) => state.auth.expires_in);
  const user = useSelector((state) => state.auth.user);
  const [error, setError] = useState(false);
  const [errorType, setErrorType] = useState("");
  const navigate = useNavigate();

  //debug
  const [currentTime, setCurrentTime] = useState(Date.now());

  const location = useLocation();
  useEffect(() => {
    // Handle search parameters
    const searchParams = new URLSearchParams(location.search);
    const stateParam = searchParams.get("state");
    const codeParam = searchParams.get("code");
    let error = searchParams.get("error");

    if (codeParam) {
      const channel = new BroadcastChannel("auth-communication");
      channel.postMessage({ state: stateParam, code: codeParam });
      window.close();
    }

    if (error) {
      const channel = new BroadcastChannel("auth-communication");
      channel.postMessage({ state: stateParam, error: error });
      window.close();
    }
  }, [location.search, location.hash]);

  useEffect(() => {
    console.log(
      "deviceType: ",
      deviceType,
      "osName: ",
      osName,
      "isMobile: ",
      isMobile
    );

    // console.log('Device Type:', getDeviceType());
    function detectDeviceType() {
      const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.screen.width <= 800;

      if (isTouch && isSmallScreen) {
        return "Mobile";
      } else {
        return "Desktop";
      }
    }

    console.log("Device Type(screen width): ", detectDeviceType());
    console.log(
      "device width:",
      window.screen.width,
      "device height:",
      window.screen.height
    );
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, []);

  const formattedTime = new Date(currentTime).toLocaleString();
  const expiresTime = new Date(expires_in).toLocaleString();

  // const changeInsertUser = (value) => {
  //   setInsertUser(value);
  // };

  const providerInfo = useCallback((auth_token, provider) => {
    setProvider_auth_token(auth_token);
    setProvider(provider);
    setPath("/insert");
  }, []);

  const changePath = useCallback((path) => {
    setPath(path);
  }, []);

  const handleInputUsername = useCallback((value) => {
    setUsername(value);
  }, []);

  const handleInputPassword = useCallback((value) => {
    setPassword(value);
  }, []);

  const getAuthorized = useCallback(
    (username, password) => {
      const requestData = {
        client_id: import.meta.env.VITE_CLIENT_ID,
        client_secret: import.meta.env.VITE_CLIENT_SECRET,
        grant_type: "password",
        username: username,
        password: password,
      };
      axios
        .post(import.meta.env.VITE_TOKEN_URL, requestData, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log("Response:", response.data);
          console.log("Access Token:", response.data.access_token);
          console.log("Refresh Token:", response.data.refresh_token);
          const login_data = {
            user: username,
            auth_token: response.data.access_token,
            refresh_token: response.data.refresh_token,
            expires_in: response.data.expires_in,
            expire_timestamp: response.data.expire_timestamp,
          };
          setLoadSpinner(false);
          dispatch(login(login_data));
          setPath("/");
        })
        .catch((error) => {
          setLoadSpinner(false);
          console.error("Error:", error.response.data);
          setErrorType(error.response.data.error_description);
          setError(true);
          setTimeout(() => {
            setError(false);
          }, 9000);
        });
    },
    [dispatch]
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoadSpinner(true);

    getAuthorized(username, password);
  };

  // const [isChecked, setIsChecked] = useState(false);

  // const handleChange = (event) => {
  //     setIsChecked(event.target.checked);
  // };
  // Array of configurations for each AnimatedWave component
  const waveConfigs = [
    { phase: 10, amplitude: 60, speed: 10, frequency: 0.0005 },
    { phase: 15, amplitude: 50, speed: 12, frequency: 0.0007 },
    { phase: 20, amplitude: 40, speed: 14, frequency: 0.001 },
    // { phase: 25, amplitude: 30, speed: 5, frequency: 0.002 },
    // { phase: 23, amplitude: 40, speed: 3, frequency: 0.001 },
    // Add more configurations as needed
  ];

  useEffect(() => {
    // Prevent scrolling when the component mounts
    if (scrollDisabled) {
      document.body.style.overflow = "hidden";
    }

    // Re-enable scrolling when the component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [scrollDisabled]);

  //MARK: SIGNUP

  const formSingup = (
    <>
      <div className="signin">
        <SignInElements providerInfo={providerInfo} />
        <motion.div
          className="login_back"
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text">Already have an account?</div>
          <span
            className="a"
            onClick={() => {
              setPath("/");
            }}
          >
            Log in
          </span>
        </motion.div>
      </div>
    </>
  );
  //MARK: LOGIN
  const formLogin = (
    <>
      <motion.div
        className="logo-container"
        initial={{ y: -250, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        exit={{ y: -250, opacity: 0, transition: { duration: 0.4 } }}
      >
        <img id="sign-in" src={SignIn} alt=""></img>
      </motion.div>
      <AnimatePresence>
        {error && (
          <motion.div
            className="line"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            exit={{ scaleX: 0, transition: { duration: 0.4, delay: 0.4 } }}
          >
            <motion.span
              initial={{ opacity: 0, y: 0 }}
              animate={{
                opacity: 1,
                y: -25,
                transition: { duration: 0.2, delay: 0.3 },
              }}
              exit={{
                opacity: 0,
                y: 0,
                transition: {
                  opacity: { duration: 0.1 },
                  y: { duration: 0.3 },
                },
              }}
            >
              {errorType === "Invalid credentials given."
                ? "Invalid username or password."
                : errorType}
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="form-container">
        <motion.form
          initial={{ y: -250, opacity: 0 }}
          animate={{ y: 0, opacity: [1] }}
          transition={{ delay: 0.2, duration: 0.6 }}
          exit={{
            y: -250,
            opacity: 0,
            transition: { duration: 0.6, delay: 0.2 },
          }}
          className={loadSpinner ? "form" : ""}
          onSubmit={handleSubmit}
        >
          <CustomInput
            type="text"
            placeholder="Username"
            className="input_text"
            exportInputValue={handleInputUsername}
            autoComplete="username"
            name="username"
          />
          <CustomInput
            type="password"
            placeholder="Password"
            className="input_text"
            exportInputValue={handleInputPassword}
            autoComplete="current-password"
            name="password"
          />
          <motion.button
            initial={{ scale: 1.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            style={{ color: loadSpinner ? "transparent" : "" }}
          >
            Log in
            {loadSpinner && (
              <motion.div
                style={{ position: "absolute" }}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.5, delay: 0.3 },
                }}
              >
                <Spinner
                  speed={1}
                  className="loading"
                  center_radius={14}
                  count={12}
                />
              </motion.div>
            )}
          </motion.button>
          {path === "/" && (
            <span
              className="a"
              onClick={() => {
                setError(false);
                setPath("/signin");
              }}
            >
              Sign in
            </span>
          )}
        </motion.form>
      </div>
    </>
  );

  //MARK: page varients

  const mainPageVarients = {
    hidden: {},
    visible: {},
    exit: {},
  };

  const baseHolderVarients = {
    hidden: { y: "-100%" },
    visible: { y: "0%", transition: { duration: 0.5 } },
    exit: { y: "-100%", transition: { duration: 0.5 } },
  };

  const waveVarients = {
    hidden: { y: "100%" },
    visible: { y: "0%", transition: { duration: 1 } },
    exit: { y: "100%", transition: { duration: 0.5 } },
  };

  //MARK: Total page holder
  const login_sigin = (
    <>
      <motion.div style={{ height: "100%", width: "100%" }}>
        <motion.div
          variants={baseHolderVarients}
          style={{ height: "100%", width: "100%", zIndex: 10 }}
        >
          <NavBar className="nav-bar" />
          <div className={`page-container `} style={{ zIndex: 10 }}>
            <motion.div
              className={`container ${error ? "blink" : ""}`}
              style={{
                rotateY:
                  path === "/signin"
                    ? "-180deg"
                    : path === "/insert"
                    ? "-360deg"
                    : path === "/loginafterinsert"
                    ? "-180deg"
                    : "0deg",
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={path}
                  className="motion-div"
                  style={{
                    transform: `${
                      path === "/loginafterinsert" ? "rotateY(180deg)" : "none"
                    }`,
                  }}
                >
                  {path === "/signin" ? (
                    formSingup
                  ) : path === "/insert" ? (
                    <>
                      <InsertUserElements
                        provider={provider}
                        provider_auth_token={provider_auth_token}
                        changePath={changePath}
                      />
                    </>
                  ) : (
                    formLogin
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </motion.div>
        <motion.div className="waves">
          {/* MARK: Map over the waveConfigs array and render AnimatedWave component with respective attributes */}
          {waveConfigs.map((config, index) => (
            <motion.div
              key={index} // Remember to provide a unique key for each component in the array
              className={`wave${index + 1}`}
              variants={waveVarients}
            >
              <AnimatedWave
                key={index} // Remember to provide a unique key for each component in the array
                phase={config.phase}
                amplitude={config.amplitude}
                speed={config.speed}
                frequency={config.frequency}
                className="innerWave"
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </>
  );
  //MARK: render
  return (
    <motion.div
      style={{ height: "100%", width: "100%" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={isLogined}
          style={{ height: "100%", width: "100%" }}
          variants={mainPageVarients}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {isLogined ? (
            <>
              <div>dashbord | </div>
              <button
                onClick={() => dispatch(logoutAsync(refresh_token, auth_token))}
              >
                Sign_out
              </button>
              <div>time: {formattedTime}</div>
              <div>expires in: {expiresTime}</div>
              <div>user: {user}</div>
            </>
          ) : (
            login_sigin
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

export default LoginSignin;
