/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useCallback } from "react";
import "./css files/InsertUserElements.css";
import { CustomInput } from "@reach-out/ui-library";
import { motion } from "framer-motion";

interface InsertProps {
  provider_auth_token: string;
  provider: string;
}

const containerVariants = {
  hidden: { y: -500, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { staggerChildren: 0.1 } },
  exit: { y: -500, opacity: 0, transition: { duration: 0.6, delay: 0.2 } },
};

const inputVariants = {
  hidden: { opacity: 0, y: -100 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  exit: { opacity: 0, y: -100, transition: { duration: 0.5 } },
};

const lineVariants = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { delay: 0.1, duration: 0.4 } },
  exit: { scaleX: 0, transition: { duration: 0.4, delay: 0.4 } },
};

const buttonVariants = {
  hidden: { scale: 1.5, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { delay: 0.3, type: "spring" } },
};

const InsertUserElements: React.FC<InsertProps> = (Props) => {
  const [username, setUsername] = useState<string>("");
  const [pseudoUsername, setPseudoUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [retypePassword, setRetypePassword] = useState<string>("");

  const handleInputUsername = useCallback((value: string) => {
    setUsername(value);
  }, []);
  const handleInputPseudoUsername = useCallback((value: string) => {
    setPseudoUsername(value);
  }, []);
  const handleInputPassword = useCallback((value: string) => {
    setPassword(value);
  }, []);
  const handleRetypePassword = useCallback((value: string) => {
    setRetypePassword(value);
  }, []);

  function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(
      username,
      pseudoUsername,
      password,
      retypePassword,
      Props.provider_auth_token,
      Props.provider
    );
  }

  return (
    <motion.div className="insert-container">
      {/* <span>provider auth token: | {Props.provider_auth_token}</span> */}
      <motion.div
        className="form-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <motion.form onSubmit={handleFormSubmit}>
          <span>Fill in the details</span>

          <motion.div style={{ width: "70%" }} variants={inputVariants}>
            <CustomInput
              type="text"
              placeholder="Username"
              className="input_text"
              exportInputValue={handleInputUsername}
            />
          </motion.div>
          <motion.div style={{ width: "70%" }} variants={inputVariants}>
            <CustomInput
              type="text"
              placeholder="Pseudo Username"
              className="input_text"
              exportInputValue={handleInputPseudoUsername}
            />
          </motion.div>
          <motion.div style={{ width: "70%" }} variants={inputVariants}>
            <CustomInput
              type="password"
              placeholder="Password"
              className="input_text"
              exportInputValue={handleInputPassword}
            />
          </motion.div>
          <motion.div style={{ width: "70%" }} variants={inputVariants}>
            <CustomInput
              type="password"
              placeholder="Retype Password"
              className="input_text"
              exportInputValue={handleRetypePassword}
            />
          </motion.div>

          <motion.div className="line" variants={lineVariants} />
          <motion.button variants={buttonVariants}>Sign in</motion.button>
        </motion.form>
      </motion.div>
    </motion.div>
  );
};

export default InsertUserElements;
