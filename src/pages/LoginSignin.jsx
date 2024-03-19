import { useState, useEffect } from "react";
import "./css files/LoginSignin.scss";
import SignIn from "../componets/assets/SignIn.svg";
import { AnimatedWave, CustomInput } from "@reach-out/ui-library";
import NavBar from "../componets/NavBar";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector,useDispatch } from "react-redux";
import { login,logout } from "../auth_state/authSlice";
import axios from "axios";
import {ScaleLoader} from 'react-spinners';

function LoginSignin() {
  const [scrollDisabled, setScrollDisabled] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const [path, setPath] = useState("/");
  const isLogined = useSelector((state) => state.auth.isLogined);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loadSpinner,setLoadSpinner] = useState(false);
  const dispatch = useDispatch();

  const handleInputUsername = (value) => {
    setUsername(value);
  };

  const handleInputPassword = (value) => {
    setPassword(value);
  };

  const handleSubmit = (e) => {

          e.preventDefault();

          setLoadSpinner(true);

          const requestData = {
            client_id: import.meta.env.VITE_CLIENT_ID,
            client_secret: import.meta.env.VITE_CLIENT_SECRET,
            grant_type: "password",
            username: username,
            password: password
        };

        axios.post('https://api.reach-out.in/auth/token', requestData, {
          headers: {
              'Content-Type': 'application/json'
          }
        })
        .then(response => {
            console.log('Response:', response.data);
            console.log('Access Token:', response.data.access_token);
            console.log('Refresh Token:', response.data.refresh_token);
            const login_data = {
              user:username,
              auth_token:response.data.access_token,
              refresh_token:response.data.refresh_token,
              expires_in:response.data.expires_in
            }
            setLoadSpinner(false)
            dispatch(login(login_data))
        })
        .catch(error => {
            setLoadSpinner(false)
            console.error('Error:', error.response.data);
        });

  }

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

  function buttonClicked() {
    setIsActive(!isActive);
    setScrollDisabled(!scrollDisabled);
  }

  const formSingup = (
    <>
      <div className="signin" onClick={() => setPath("/")}>
        test
      </div>
    </>
  );

  const formLogin = (
    <>
      <motion.div
        className="logo-container"
        initial={{ y: -250, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        exit={{ y: -250, opacity: 0, transition: { duration: 0.4 } }}
      >
        <img id="sign-in" src={SignIn} alt="" onClick={buttonClicked}></img>
      </motion.div>

      <motion.div
        className="line"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        exit={{ scaleX: 0, transition: { duration: 0.4, delay: 0.4 } }}
      ></motion.div>
      
      
        {(loadSpinner&&(<motion.div className="loading-spinner" >
          <ScaleLoader color="#ffffff" />
        </motion.div>))}

      <motion.form
        initial={{ y: -250, opacity: 0 }}
        animate={{ y: 0, opacity: [1] }}
        transition={{ delay: 0.2, duration: 0.6 }}
        exit={{
          y: -250,
          opacity: 0,
          transition: { duration: 0.6, delay: 0.2 },
        }}

        className={(loadSpinner?'form':'')}
        
        onSubmit={handleSubmit}
      >
        
        <CustomInput
          type="text"
          placeholder="Username"
          className="input_text"
          exportInputValue={handleInputUsername}
        />
        <CustomInput
          type="password"
          placeholder="Password"
          className="input_text"
          exportInputValue={handleInputPassword}
        />
        <motion.button
          initial={{ scale: 1.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
        >
          Log in
        </motion.button>
        <span className="a" onClick={() => setPath("/signin")}>
          Sign in
        </span>
      </motion.form>
    </>
  );

  const login_sigin = (
    <>
    <motion.div
      initial={{ y: "-100%" }}
      animate={{ y: "0%" }}
      transition={{ duration: 0.5 }}
      exit={{ y: "-100%", transition: { duration: 0.4 } }}
    >
      <NavBar className="nav-bar" />
    <div className={`page-container ${isActive ? "transition" : ""}`}>
      <div className={`container ${path === "/signin" ? "flip" : ""}`}>
        <AnimatePresence>
          <motion.div key={path} className="motion-div">
            {path === "/signin" ? formSingup : formLogin}
          </motion.div>
        </AnimatePresence>
      </div>
      {/* Map over the waveConfigs array and render AnimatedWave component with respective attributes */}
      {waveConfigs.map((config, index) => (
        <AnimatedWave
          key={index} // Remember to provide a unique key for each component in the array
          phase={config.phase}
          amplitude={config.amplitude}
          speed={config.speed}
          frequency={config.frequency}
          className={`wave${index + 1}`} // Append index value to "wave"
        />
      ))}
    </div>
    </motion.div>
    </>
  );

  return (
    <>
    {isLogined ? (
        <>
        <div>dasbord | </div>
        <button onClick={()=>dispatch(logout())}>Sign_out</button>
        </>
      ) : login_sigin}
    </>
  );
}

export default LoginSignin;
