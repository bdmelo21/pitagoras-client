import { ReactComponent as YourSvg } from "../../images/svg-3.svg";
import { ReactComponent as YourSvg2 } from "../../images/svg-2.svg";
import Icon1 from "../../images/svg-1.svg";
export const homeObjOne = {
  id: "about",
  lightBg: false,
  lightText: true,
  lightTextDesc: true,
  topLine: "Anytime. Anywhere",
  headline: "This is a World App",
  description:
    "Get access to an app that is prepared to give Zoom teachings from all around the globe.",
  buttonLabel: "Get Started",
  imgStart: false,
  img: { Icon1 },
  alt: "Car",
  dark: true,
  primary: true,
  darkText: false,
};

export const homeObjTwo = {
  id: "discover",
  lightBg: true,
  lightText: false,
  lightTextDesc: false,
  topLine: "Automatic Payments",
  headline: "Lessons done, Payment up-to-date",
  description:
    "We have you covered no matter where you are located. All you need is a valid Credit/Debit Card Account",
  buttonLabel: "Learn More",
  imgStart: true,
  img: <YourSvg2></YourSvg2>,
  alt: "Piggybank",
  dark: false,
  primary: false,
  darkText: true,
};

export const homeObjThree = {
  id: "signup",
  lightBg: true,
  lightText: false,
  lightTextDesc: false,
  topLine: "Join our Team",
  headline: "Creating an account is extremely easy",
  description:
    "Get everything set up and ready in less than 5 minutes. All you need to do is add your information and you're ready to go.",
  buttonLabel: "Start Now",
  imgStart: false,
  img: { YourSvg },
  alt: "Papers",
  dark: false,
  primary: false,
  darkText: true,
};
