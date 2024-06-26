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

type disabling = {
  dis_username: boolean;
  dis_pseudoUsername: boolean;
  dis_password: boolean;
  dis_retypePassword: boolean;
};

type InputErrors = {
  username: string[];
  pseudoName: string[];
  password: string[];
  retypePassword: string[];
};

type inputLoadingType = {
  loading_username: boolean;
  loading_pseudoUsername: boolean;
  // loading_password: boolean;
  // loading_retypePassword: boolean;
};

const InsertUserElements: React.FC<InsertProps> = (Props) => {
  const [username, setUsername] = useState<string>("");
  const [pseudoUsername, setPseudoUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [retypePassword, setRetypePassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [inputLoading, setInputLoading] = useState<inputLoadingType>({
    loading_username: false,
    loading_pseudoUsername: false,
    // loading_password: false,
    // loading_retypePassword: false,
  });
  const [error, setError] = useState<boolean>(false);
  const [errors, setErrors] = useState<InputErrors>({
    username: [],
    pseudoName: [],
    password: [],
    retypePassword: [],
  });
  const [disabled, setDisabled] = useState<disabling>({
    dis_username: false,
    dis_pseudoUsername: true,
    dis_password: true,
    dis_retypePassword: true,
  });

  useEffect(() => {
    if (
      errors.password.length ||
      errors.username.length ||
      errors.retypePassword.length ||
      errors.pseudoName.length > 0
    ) {
      setError(true);
    } else {
      setError(false);
    }
  }, [errors]);

  // src/passwordValidators.ts

  // A list of common passwords
  const commonPasswords: string[] = [
    "123456",
    "password",
    "123456789",
    "12345678",
    "12345",
    "1234567",
    "1234567890",
    "qwerty",
    "abc123",
    "111111",
    "123123",
    "admin",
    "letmein",
    "welcome",
    "monkey",
    "login",
    "princess",
    "starwars",
    "dragon",
    "passw0rd",
    "trustno1",
    "123qwe",
    "iloveyou",
    "sunshine",
    "master",
    "hello",
    "freedom",
    "whatever",
    "qazwsx",
    "zaq1zaq1",
    "password1",
    "1234",
    "superman",
    "baseball",
    "football",
    "password123",
    "batman",
    "1qaz2wsx",
    "bailey",
    "shadow",
    "123321",
    "superman",
    "1qazxsw2",
    "qwertyuiop",
    "jordan23",
    "michael",
    "ninja",
    "mustang",
    "password!",
    "ashley",
    "charlie",
    "solo",
    "hottie",
    "loveme",
    "zaq12wsx",
    "1q2w3e4r",
    "123abc",
    "121212",
    "flower",
    "thomas",
    "tigger",
    "qwer1234",
    "p@ssw0rd",
    "mickey",
    "12345a",
    "letmein!",
    "123123123",
    "lol123",
    "freddy",
    "batman123",
    "pass",
    "trustme",
    "liverpool",
    "super",
    "blink182",
    "miller",
    "samantha",
    "maggie",
    "corvette",
    "qwe123",
    "werty",
    "mercedes",
    "tigger123",
    "pepper",
    "chelsea",
    "hello123",
    "lakers",
    "ranger",
    "chester",
    "midnight",
    "bubbles",
    "lucky",
    "thunder",
    "robert",
    "peanut",
    "test",
    "test123",
    "123654",
    "freddy123",
    "jackson",
    "joshua",
    "whatever1",
    "131313",
    "startrek",
    "12341234",
    "abcd1234",
    "qwerty123",
    "harley",
    "rangers",
    "george",
    "muffin",
    "1qaz2wsx3edc",
    "asdfghjkl",
    "dallas",
    "jennifer",
    "batman1",
    "pass123",
    "11111111",
    "hockey",
    "aaron431",
    "admin1",
    "admin123",
    "asdf",
    "azerty",
    "qwertz",
    "qwert",
    "zaqwsx",
    "asdfgh",
    "1234abcd",
    "passw0rd123",
    "helloworld",
    "zaq12wsx!",
    "asdf1234",
    "xyz123",
    "matrix",
    "purple",
    "sparky",
    "soccer",
    "hannah",
    "fuckyou",
    "buster",
    "buster123",
    "password2",
    "trump",
    "donald",
    "porsche",
    "spider",
    "winter",
    "jordan",
    "hunter",
    "jasmine",
    "peanut123",
    "taylor",
    "abc123456",
    "loveyou",
    "abcd123",
    "jason",
    "daniel",
    "hello1",
    "cameron",
    "poohbear",
    "zxcvbnm",
    "letmein1",
    "nathan",
    "bailey123",
    "1q2w3e4r5t",
    "qwerty1",
    "yankees",
    "123456a",
    "master123",
    "startrek123",
    "soccer123",
    "sunshine123",
    "carmen",
    "iloveyou2",
    "welcome123",
    "tigger1",
    "secret",
    "696969",
    "barney",
    "batman12",
    "charles",
    "david",
    "eric",
    "pass1234",
    "paul",
    "phoenix",
    "robin",
    "asdfasdf",
    "football1",
    "alexander",
    "scooby",
    "passw0rD",
    "zxcvbn",
    "passw0rD!",
    "abcdef",
    "1234567a",
    "batman1234",
    "soccer1",
    "babygirl",
    "letmein123",
    "pepper123",
    "puppy",
    "loveme123",
    "thunder123",
    "baseball123",
    "morgan",
    "1234abcd!",
    "purple123",
    "snowball",
    "starwars123",
    "sunshine1",
    "thunder1",
    "soccer1234",
    "hunter1",
    "iloveyou123",
    "mercedes123",
    "123123abc",
    "baseball12",
    "flower123",
    "happy123",
    "princess1",
    "letmein2",
    "1qaz",
    "12345678a",
    "asd123",
    "jason123",
    "banana",
    "cameron123",
    "freddy1",
    "guitar",
    "hannah1",
    "batman12345",
    "johnny",
    "julian",
    "alexandra",
    "martin",
    "monster",
    "pass1",
    "welcome1",
    "purple1",
    "sunshine12",
    "monkey123",
    "peanut1",
    "soccer12",
    "123asdf",
    "blue",
    "charles123",
    "dakota",
    "flower1",
    "george123",
    "hello12",
    "123asdfg",
    "loveyou1",
    "matrix123",
    "midnight1",
    "morgan123",
    "123456ab",
    "1234567ab",
    "football12",
    "sunshine1234",
    "welcome12",
    "winter123",
    "123ab",
    "1111",
    "123qaz",
    "hannah123",
    "passw",
    "shadow123",
    "yankees123",
    "lucky123",
    "qaz123",
    "flower1234",
    "winter1",
    "123asdzxc",
    "harley123",
    "1qazxsw23edc",
    "jackson123",
    "loveyou2",
    "123abc456",
    "happy1",
    "master1",
    "letmein12",
    "1q2w3e4r5t6y",
    "abcdefg",
    "jordan1",
    "purple1234",
    "spider123",
    "sunshine2",
    "hunter123",
    "iloveyou1",
    "iloveyou3",
    "monkey12",
    "nathan123",
    "qwertyuio",
    "qwertyui",
    "welcome1234",
    "password!",
    "letmein!",
    "baseball!",
    "football!",
    "superman123",
    "tigger12",
    "password123!",
    "tigger1234",
    "pepper1",
    "password!1",
    "password2!",
    "baseball1234",
    "qwerty12",
    "iloveyou!",
    "hello1234",
    "welcome!",
    "summer",
    "spring",
    "winter12",
    "password12345",
    "hunter12",
    "master12",
    "football!",
    "superman12",
    "iloveyou2",
    "monkey1234",
    "nathan12",
    "jordan12",
    "12345abc",
    "123456a!",
    "asdfasdf1",
    "zxcvbn123",
    "qwerty!1",
    "football123!",
    "soccer123!",
    "password12",
    "shadow12",
    "iloveyou!",
    "nathan1234",
    "password3",
    "superman1234",
    "monkey123!",
    "password!2",
    "football12!",
    "baseball12!",
    "tigger123!",
    "pepper12",
    "sunshine!",
    "123456789a",
    "summer123",
    "spring123",
    "winter123!",
    "football1234!",
    "superman!",
    "tigger12!",
    "monkey!",
    "password3!",
    "12345678!",
    "soccer12",
    "shadow!",
    "iloveyou3!",
    "monkey12!",
    "hunter1234",
    "football12!123",
    "sunshine1!",
    "baseball12!123",
    "tigger123!123",
    "soccer12!123",
    "shadow1",
    "iloveyou1!123",
    "hunter1!123",
    "baseball12!",
    "soccer123!123",
    "iloveyou!123",
    "hunter123!123",
    "password!1!",
    "password!2!",
    "football123!123",
    "football!123",
    "sunshine!123",
    "welcome12!123",
    "summer!123",
    "spring!123",
    "winter!123",
    "superman!123",
    "tigger12!123",
    "monkey!123",
    "hunter12!",
    "superman12!",
    "password123!123",
    "tigger123!123",
    "pepper1!",
    "password1!123",
    "football12!123",
    "baseball123!123",
    "soccer12!123",
    "shadow1!123",
    "iloveyou1!123",
    "hunter12!123",
    "summer!12",
    "spring!12",
    "winter!12",
    "superman!12",
    "tigger12!12",
    "monkey!12",
    "football1234!123",
    "baseball1234!123",
    "soccer1234!123",
    "shadow12!123",
    "iloveyou12!123",
    "hunter1234!123",
    "hunter12!12",
    "superman12!12",
    "baseball12!12",
    "soccer12!12",
    "shadow1!12",
    "iloveyou1!12",
    "hunter12!12",
    // Add more common passwords as needed
  ];

  const validatePassword = (password: string): string[] => {
    const errors: string[] = [];

    // Minimum length validator (default is 8 characters)
    if (password.length < 8) {
      errors.push("Password must be at least 8 characters long.");
    }

    // Common password validator
    if (commonPasswords.includes(password)) {
      errors.push("Password is too common.");
    }

    // Character type validators
    const missingRequirements: string[] = [];
    if (!/[a-z]/.test(password)) {
      missingRequirements.push("one lowercase letter");
    }
    if (!/[A-Z]/.test(password)) {
      missingRequirements.push("one uppercase letter");
    }
    if (!/[0-9]/.test(password)) {
      missingRequirements.push("one digit");
    }
    if (!/[^A-Za-z0-9]/.test(password)) {
      missingRequirements.push("one special character");
    }

    if (missingRequirements.length > 0) {
      errors.push(
        `Password must contain at least ${missingRequirements.join(", ")}.`
      );
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

  const checkUsername = () => {
    setInputLoading({ ...inputLoading, loading_username: true });
    if (username !== "") {
      setDisabled({
        ...disabled,
        dis_username: true,
        dis_pseudoUsername: true,
        dis_password: true,
        dis_retypePassword: true,
      });
    } else {
      setDisabled({ ...disabled, dis_username: false });
    }
    axios
      .get(import.meta.env.VITE_CHECK_USER_URL + username + "/")
      .then((response) => {
        console.log(response);
        setDisabled({
          ...disabled,
          dis_username: false,
          dis_pseudoUsername: true,
          dis_password: true,
          dis_retypePassword: true,
        });
        setErrors({
          ...errors,
          username: ["An user already exists with this username"],
        });
      })
      .catch((error) => {
        setDisabled({
          ...disabled,
          dis_username: false,
          dis_pseudoUsername: false,
          dis_password: true,
          dis_retypePassword: true,
        });
        console.error(error);
        setErrors({ ...errors, username: [] });
      });
    setInputLoading({ ...inputLoading, loading_username: false });
  };

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
              className={`input_text ${
                disabled.dis_username && !inputLoading.loading_username
                  ? "input_disabled"
                  : ""
              } ${errors.username.length > 0 ? "input_error" : ""}`}
              exportInputValue={handleInputUsername}
              autoComplete="username"
              name="username"
              onBlur={checkUsername}
              disabled={disabled.dis_username}
              loading={disabled.dis_username}
            />
          </motion.div>
          <motion.div style={{ width: "70%" }} variants={inputVariants}>
            <CustomInput
              type="text"
              placeholder="Nickname"
              className={`input_text ${
                disabled.dis_pseudoUsername &&
                !inputLoading.loading_pseudoUsername
                  ? "input_disabled"
                  : ""
              }`}
              exportInputValue={handleInputPseudoUsername}
              autoComplete="off"
              name="pseudo_name"
              disabled={disabled.dis_pseudoUsername}
            />
          </motion.div>
          <motion.div style={{ width: "70%" }} variants={inputVariants}>
            <CustomInput
              type="password"
              placeholder="Password"
              className={`input_text ${error ? "input_error" : ""} ${
                disabled.dis_password ? "input_disabled" : ""
              }`}
              exportInputValue={handleInputPassword}
              autoComplete="new-password"
              name="password"
              minlength={8}
              onChange={(e) => {
                setErrors((prevErrors) => ({
                  ...prevErrors,
                  password: validatePassword(e.target.value),
                }));
              }}
              disabled={disabled.dis_password}
            />
          </motion.div>
          <motion.div style={{ width: "70%" }} variants={inputVariants}>
            <CustomInput
              type="password"
              placeholder="Retype Password"
              className={`input_text ${
                disabled.dis_retypePassword ? "input_disabled" : ""
              }`}
              exportInputValue={handleRetypePassword}
              autoComplete="new-password"
              name="retype_password"
              minlength={8}
              disabled={disabled.dis_retypePassword}
            />
          </motion.div>

          <motion.div className="button_container">
            {error && (
              <motion.div className="line" variants={lineVariants}>
                <motion.span variants={spanVariants}>
                  <motion.ul layout>
                    {Object.entries(errors).map(([field, fieldErrors]) =>
                      fieldErrors.map((err: string, index: number) => (
                        <motion.li key={`${field}-${index}`}>{err}</motion.li>
                      ))
                    )}
                  </motion.ul>
                </motion.span>
              </motion.div>
            )}
            <motion.button
              variants={buttonVariants}
              style={{ color: loading ? "transparent" : "" }}
              disabled={error}
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
