/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";
import "./css files/SignInElements.css";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { setReddit, clearRedditState } from "../auth_state/reddit";
import axios from "axios";
import { AppDispatch } from "../auth_state/store";

const textLogoVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1 } },
  exit: { opacity: 0 },
};

const Reddit_logo = (
  <>
    <motion.svg
      width="800"
      height="800"
      viewBox="0 0 800 800"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      variants={textLogoVariants}
    >
      <g clipPath="url(#clip0_175_17)">
        <path
          d="M399.5 235.5C399.5 235.5 394.999 165.136 458 123.5C515.5 85.5001 570 106.5 570 106.5"
          stroke="white"
          strokeWidth="46"
        />
        <circle
          cx="644"
          cy="129"
          r="61"
          stroke="white"
          strokeWidth="43"
          id="fill"
        />
        <path
          d="M47.9997 308.5C9.93711 344.125 11.9991 409.5 74.9994 444.5C74.9994 444.5 89.9491 403.46 109.999 375.5C128.426 349.803 154.499 331.333 167.999 320.5C126.999 278.5 79.0779 279.412 47.9997 308.5Z"
          stroke="white"
          strokeWidth="46"
          id="fill"
        />
        <path
          d="M751.999 308.821C790.062 344.446 788 409.821 725 444.821C725 444.821 710.05 403.781 690 375.821C671.573 350.124 645.5 331.654 632 320.821C673 278.821 720.921 279.733 751.999 308.821Z"
          stroke="white"
          strokeWidth="46"
          id="fill"
        />
        <ellipse
          cx="400"
          cy="493"
          rx="332"
          ry="240"
          stroke="white"
          strokeWidth="46"
          id="fill"
        />
        <path
          d="M272.229 477.801C297.492 477.801 317.972 457.321 317.972 432.058C317.972 406.795 297.492 386.315 272.229 386.315C246.966 386.315 226.486 406.795 226.486 432.058C226.486 457.321 246.966 477.801 272.229 477.801Z"
          fill="white"
          id="mask"
        />
        <path
          d="M527.769 477.801C553.032 477.801 573.512 457.321 573.512 432.058C573.512 406.795 553.032 386.315 527.769 386.315C502.506 386.315 482.026 406.795 482.026 432.058C482.026 457.321 502.506 477.801 527.769 477.801Z"
          fill="white"
          id="mask"
        />
        <path
          d="M508.398 543.201C476.153 572.579 434.352 588.758 390.693 588.758C341.67 588.758 296.249 569.001 262.8 533.127C254.638 524.37 240.922 523.893 232.167 532.057C223.411 540.219 222.933 553.936 231.096 562.69C272.231 606.803 330.403 632.104 390.694 632.104C445.18 632.104 497.349 611.91 537.594 575.241C546.441 567.18 547.081 553.47 539.018 544.623C530.959 535.782 517.258 535.134 508.398 543.201Z"
          fill="white"
          id="mask"
        />
      </g>
      <defs>
        <clipPath id="clip0_175_17">
          <rect width="800" height="800" fill="white" />
        </clipPath>
      </defs>
    </motion.svg>
  </>
);

const Google_logo = (
  <>
    <motion.svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      variants={textLogoVariants}
    >
      <path
        d="M52.2708 50.6292C52.2708 55.0208 55.8333 58.5833 60.225 58.5833H74.9583C72.4292 66.8 66.2042 73.0292 57.2083 74.6917C42.9125 77.3375 28.6167 66.9208 27.25 52.4458C25.8333 37.4667 37.5792 24.8625 52.2708 24.8625C56.4458 24.8625 60.3792 25.8875 63.8417 27.6917C66.9958 29.3375 70.8542 28.675 73.3667 26.1583C77.3417 22.1833 76.2875 15.4792 71.2917 12.9125C64.3 9.32083 56.1625 7.64583 47.575 8.58749C28.4792 10.6792 12.95 26.1958 10.8583 45.2917C8.10416 70.4167 27.7042 91.6667 52.2708 91.6667C78.8042 91.6667 89.6542 72.8542 91.85 56.675C92.8583 49.2583 86.925 42.7083 79.4417 42.7L60.2333 42.675C55.8375 42.6667 52.2708 46.2292 52.2708 50.6292Z"
        stroke="white"
        strokeWidth="4"
        id="fill"
      />
    </motion.svg>
  </>
);

const Facebook_logo = (
  <>
    <motion.svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      variants={textLogoVariants}
    >
      <path
        d="M70.8333 12.5H29.1667C19.9625 12.5 12.5 19.9625 12.5 29.1667V70.8333C12.5 80.0375 19.9625 87.5 29.1667 87.5H52.5875V58.4958H42.825V47.1417H52.5875V38.7875C52.5875 29.1042 58.5083 23.825 67.15 23.825C70.0625 23.8167 72.9708 23.9667 75.8667 24.2625V34.3875H69.9167C65.2083 34.3875 64.2917 36.6125 64.2917 39.8958V47.125H75.5417L74.0792 58.4792H64.225V87.5H70.8333C80.0375 87.5 87.5 80.0375 87.5 70.8333V29.1667C87.5 19.9625 80.0375 12.5 70.8333 12.5Z"
        stroke="white"
        strokeWidth="4"
        id="fill"
      />
    </motion.svg>
  </>
);

const Github_logo = (
  <>
    <motion.svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      variants={textLogoVariants}
    >
      <path
        d="M91.6663 49.9999C91.6663 68.6666 79.4163 84.4583 62.4997 89.7499V79.1666C62.4997 75.6041 60.9997 72.4166 58.6247 70.1249C69.5413 68.1457 74.9997 61.7916 74.9997 49.9999C74.9997 44.8958 73.958 40.8541 71.9163 37.7083C72.833 34.1458 73.3747 29.0833 70.833 24.9999C65.9163 24.9999 62.4788 27.8958 60.458 30.2708C57.4372 29.5416 53.958 29.1666 49.9997 29.1666C46.2497 29.1666 42.7913 29.5833 39.708 30.4374C37.708 28.0416 34.208 24.9999 29.1663 24.9999C26.208 29.7499 27.4163 34.8749 28.5413 37.7499C26.2913 40.8958 24.9997 44.9374 24.9997 49.9999C24.9997 61.7916 30.458 68.1457 41.3747 70.1249C39.9788 71.4791 38.8955 73.1249 38.2288 74.9999H33.333C30.333 74.9999 29.1663 73.6666 27.5622 71.4999C25.958 69.3332 24.2288 67.8749 22.1663 67.2708C21.0622 67.1458 20.3122 68.0416 21.2913 68.8333C24.5622 71.1874 24.7913 75.0416 26.1038 77.5624C27.2913 79.8332 29.7497 81.2499 32.5205 81.2499H37.4997V89.7499C20.583 84.4583 8.33301 68.6666 8.33301 49.9999C8.33301 26.9791 26.9788 8.33325 49.9997 8.33325C73.0205 8.33325 91.6663 26.9791 91.6663 49.9999Z"
        stroke="white"
        strokeWidth="4"
        id="fill"
      />
    </motion.svg>
  </>
);

const SignInElements: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const reddit_client_id = import.meta.env.VITE_REEDIT_CLIENT_ID;
  const reddit_client_secret = import.meta.env.VITE_REDDIT_CLIENT_SECRET;
  const reddit_redirect_uri = import.meta.env.VITE_REDDIT_REDIRECT_URL;

  type Data = {
    state: string;
    code: string;
  };
  const [data, setData] = useState<Data | null>(null);
  const [access_token, setAccessToken] = useState<string>("");

  useEffect(() => {
    const fetchAccessToken = async () => {
      console.log(`data: ${data?.state}, ${data?.code}`);
      const code = data?.code;
      const encodedHeader = btoa(`${reddit_client_id}:${reddit_client_secret}`);
      axios
        .post(
          "https://www.reddit.com/api/v1/access_token",
          `grant_type=authorization_code&code=${code}&redirect_uri=${reddit_redirect_uri}`,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization: `Basic ${encodedHeader}`,
            },
          }
        )
        .then((response) => {
          console.log("reddit date:", response.data);
          const accessToken = response.data.access_token;
          console.log("Reddit Access Token:", accessToken);
          setAccessToken(accessToken);
          setData(null);
        })
        .catch((error) => {
          console.error("Error exchanging code for token:", error);
        });
    };

    const handleMessage = (event: MessageEvent) => {
      // console.log(event.origin);
      // console.log(event.data);
      setData(event.data);
      dispatch(clearRedditState());
    };

    if (data?.state !== undefined && data?.code !== undefined) {
      fetchAccessToken();
    }

    window.addEventListener("message", handleMessage);
    console.log("access_token:", access_token);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [
    data,
    dispatch,
    access_token,
    reddit_client_id,
    reddit_client_secret,
    reddit_redirect_uri,
  ]);

  const redditLogin = () => {
    dispatch(setReddit(true));
    window.open(
      `https://www.reddit.com/api/v1/authorize?client_id=${reddit_client_id}&response_type=code&state=yolo&redirect_uri=${reddit_redirect_uri}&duration=temporary&scope=identity,account`,
      "reddit login",
      "width=1200,height=800,toolbar=no,location=no,menubar=no,scrollbars=no"
    );
  };

  const containerVariants = {
    hidden: { y: "-100%" },
    visible: { y: "0%", transition: { duration: 0.7, staggerChildren: 0.1 } },
    exit: { y: "-100%", transition: { duration: 0.7 } },
  };

  const buttonVariants = {
    hidden: { scale: 0 },
    visible: { scale: 1, transition: { delayChildren: 0.6 } },
    exit: { scale: 0 },
  };

  return (
    <motion.div
      className="elements_container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.button className="google" variants={buttonVariants}>
        {Google_logo}
        <motion.span variants={textLogoVariants}>Login with Google</motion.span>
      </motion.button>
      <motion.button className="facebook" variants={buttonVariants}>
        {Facebook_logo}
        <motion.span variants={textLogoVariants}>
          Login with Facebook
        </motion.span>
      </motion.button>
      <motion.button
        className="reddit"
        variants={buttonVariants}
        onClick={redditLogin}
      >
        {Reddit_logo}
        <motion.span variants={textLogoVariants}>Login with Reddit</motion.span>
      </motion.button>
      <motion.button className="github" variants={buttonVariants}>
        {Github_logo}
        <motion.span variants={textLogoVariants}>Login with Github</motion.span>
      </motion.button>
    </motion.div>
  );
};

export default SignInElements;
