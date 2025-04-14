import { Container, Flex } from "@chakra-ui/react";

import { BrowserRouter } from "react-router-dom";
import PageRoutes from "./components/pagedata/pageroutes";


const App = ({}) => {
  return (
    <Container minHeight="100vh" maxWidth="100%" padding="0" margin={"0"} backgroundColor="background">
        <BrowserRouter>
          <PageRoutes></PageRoutes>
        </BrowserRouter>
    </Container>
  );
};

export default App;
