import { Button, HStack } from "@chakra-ui/react";
import { Provider } from "./components/ui/provider";

const App = ({}) => {
  return (
    <>
      <HStack>
        <Button>Click me</Button>
        <Button>Click me</Button>
      </HStack>
    </>
  );
};

export default App;
