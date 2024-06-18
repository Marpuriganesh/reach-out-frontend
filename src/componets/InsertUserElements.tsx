/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useCallback, useEffect } from "react";
import "./css files/InsertUserElements.css";
import { CustomInput, Spinner } from "@reach-out/ui-library";
import { motion } from "framer-motion";
import axios from "axios";

interface InsertProps {
  provider_auth_token: string;
  provider: string;
  changePath: (provider: string) => void;
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

const spanVariants = {
  hidden: { opacity: 0, y: 0 },
  visible: {
    opacity: 1,
    y: "-100%",
    transition: { duration: 0.2, delay: 0.6 },
  },
  exit: {
    opacity: 0,
    y: 0,
    transition: {
      opacity: { duration: 0.1 },
      y: { duration: 0.3 },
    },
  },
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
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    if (errors.length > 0) {
      setError(true);
    } else {
      setError(false);
    }
  }, [errors]);

  // src/passwordValidators.ts

  // A list of common passwords
  const commonPasswords: string[] = [
    "password",
    "123456",
    "123456789",
    "12345678",
    "12345",
    "1234567",
    "1234567890",
    "qwerty",
    "abc123",
    "football",
    // Add more common passwords as needed
  ];

  // Function to check similarity to user attributes
  const isSimilarToUserAttributes = (
    password: string,
    userAttributes: string[]
  ): boolean => {
    return userAttributes.some(
      (attr) => attr && password.toLowerCase().includes(attr.toLowerCase())
    );
  };

  const validatePassword = (password: string, username: string): string[] => {
    const errors: string[] = [];

    // Minimum length validator (default is 8 characters)
    if (password.length < 8) {
      errors.push("Password must be at least 8 characters long.");
      // Common password validator
    }

    if (commonPasswords.includes(password)) {
      errors.push("Password is too common.");
    }
    // User attribute similarity validator
    const userAttributes = [username];
    if (isSimilarToUserAttributes(password, userAttributes)) {
      errors.push("Password is too similar to your personal information.");
    }

    // Numeric password validator
    if (/^\d+$/.test(password)) {
      errors.push("Password cannot be entirely numeric.");
    }

    return errors;
  };

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
    setLoading(true);
    console.log(
      username,
      pseudoUsername,
      password,
      retypePassword,
      // Props.provider_auth_token,
      Props.provider
    );
    const data = {
      username: username,
      password: password,
      pseudo_name: pseudoUsername,
    };

    axios
      .patch(import.meta.env.VITE_UPDATE_USER_URL, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Props.provider} ${Props.provider_auth_token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        Props.changePath("/loginafterinsert");
      })
      .catch((error) => {
        console.error(error);
      });
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
        <motion.form
          onSubmit={handleFormSubmit}
          className={loading ? "form" : ""}
        >
          <span>Fill in the details</span>

          <motion.div style={{ width: "70%" }} variants={inputVariants}>
            <CustomInput
              type="text"
              placeholder="Username"
              className="input_text"
              exportInputValue={handleInputUsername}
              autoComplete="username"
              name="username"
            />
          </motion.div>
          <motion.div style={{ width: "70%" }} variants={inputVariants}>
            <CustomInput
              type="text"
              placeholder="Nickname"
              className="input_text"
              exportInputValue={handleInputPseudoUsername}
              autoComplete="off"
              name="pseudo_name"
            />
          </motion.div>
          <motion.div style={{ width: "70%" }} variants={inputVariants}>
            <CustomInput
              type="password"
              placeholder="Password"
              className={`input_text ${error ? "input_error" : ""}`}
              exportInputValue={handleInputPassword}
              autoComplete="new-password"
              name="password"
              minlength={8}
              onChange={(e) => {
                setErrors(validatePassword(e.target.value, username));
              }}
            />
          </motion.div>
          <motion.div style={{ width: "70%" }} variants={inputVariants}>
            <CustomInput
              type="password"
              placeholder="Retype Password"
              className="input_text "
              exportInputValue={handleRetypePassword}
              autoComplete="new-password"
              name="retype_password"
              minlength={8}
            />
          </motion.div>

          <motion.div className="button_container">
            {error && (
              <motion.div className="line" variants={lineVariants}>
                <motion.span variants={spanVariants}>
                  <motion.ul layout>
                    {errors.map((err, key) => (
                      <motion.li key={key}>{err}</motion.li>
                    ))}
                  </motion.ul>
                </motion.span>
              </motion.div>
            )}
            <motion.button
              variants={buttonVariants}
              style={{ color: loading ? "transparent" : "" }}
            >
              Sign in
              {loading && (
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
          </motion.div>
        </motion.form>
      </motion.div>
    </motion.div>
  );
};

export default InsertUserElements;
