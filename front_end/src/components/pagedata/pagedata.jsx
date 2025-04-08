import SignUp from "../pages/signup";
import Landing from "../pages/landing";
import Login from "../pages/login";
import AssetDashboard from "../pages/assetdashboard";
import RequireAuth from "../protection/protectedroute";
import LogOut from "../pages/logout";

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
  {
    path: "/view-assets",
    element: (
      <RequireAuth>
        <AssetDashboard></AssetDashboard>
      </RequireAuth>
    ),
    title: "Dave.Save",
  },
  {
    path: "/logout",
    element: <LogOut></LogOut>,
    title: "Log Out Page",
  },
];

export default pageData;
