import pageData from "./pagedata";
import { Route, Routes } from "react-router-dom";

const PageRoutes = () => {
  const pageRoutes = pageData.map((page) => {
    return (
      <Route
        key={page.title}
        element={page.element}
        path={`/${page.path}`}
      ></Route>
    );
  });

  return <Routes>{pageRoutes}</Routes>;
};


export default PageRoutes;
