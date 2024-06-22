/* eslint-disable @typescript-eslint/no-unused-vars */
import "./css files/SplashScreen.css";
import { SplashAnimation } from "@reach-out/ui-library";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

function SplashScreen(): JSX.Element {
  const [playAnimation, setPlayAnimation] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setPlayAnimation(true);
    }, 400);
  }, []);

  return (
    <motion.div
      className="SplashScreen"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div className="SplashScreen_container">
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: "0%" }}
          transition={{ duration: 0.7 }}
          style={{
            display: "flex",
            placeItems: "center",
            placeContent: "center",
          }}
        >
          <SplashAnimation
            playAnimation={playAnimation}
            style={{ filter: "invert(1)" }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default SplashScreen;
