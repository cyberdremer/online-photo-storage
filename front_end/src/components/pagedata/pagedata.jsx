import SignUp from "../pages/signup";
import Landing from "../pages/landing";
import Login from "../pages/login";

const pageData = [
  {
    path: "",
    element: <Landing></Landing>,
    title: "Landing Page",
  },
  {
    path: "/signup",
    element: <SignUp></SignUp>,
    title: "Sign Up Page",
  },
  {
    path: "/login",
    element: <Login></Login>,
    title: "Log In Page",
  },
];

export default pageData;
