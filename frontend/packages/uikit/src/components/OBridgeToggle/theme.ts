import { darkColors, lightColors } from "../../theme/colors";
import { OBridgeToggleTheme } from "./types";

export const light: OBridgeToggleTheme = {
  handleBackground: lightColors.backgroundAlt,
  handleShadow: lightColors.textDisabled,
};

export const dark: OBridgeToggleTheme = {
  handleBackground: darkColors.backgroundAlt,
  handleShadow: darkColors.textDisabled,
};
