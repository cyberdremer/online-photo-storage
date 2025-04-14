import { useColorModeValue } from "../ui/color-mode";

const ModeColors = () => {
  const primary = useColorModeValue("light.primary", "dark.primary");
  const secondary = useColorModeValue("light.secondary", "dark.secondary");
  const accent = useColorModeValue("light.accent", "dark.acccent");
  const primaryText = useColorModeValue("light.text", "dark.text");
  const secondaryText = useColorModeValue(
    "light.secondarytext",
    "dark.secondarytext"
  );

  const buttonText = useColorModeValue("light.buttontext", "dark.buttontext");
  const buttonBackground = useColorModeValue(
    "light.buttonbackground",
    "dark.buttonbackground"
  );
  const borders = useColorModeValue("light.borders", "dark.borders");
  const inputfieldColors = useColorModeValue(
    "light.inputfields",
    "dark.borders"
  );

  return {
    primary,
    secondary,
    accent,
    primary,
    primaryText,
    secondaryText,
    buttonText,
    buttonBackground,
    borders,
    inputfieldColors,
  };
};

export default ModeColors;
