import tinycolor from "tinycolor2";
import invert from "invert-color";

export default function invertBgColorToTextColor(bgColor: string) {
  const defaultColor = "#fff";
  if (!bgColor) {
    return defaultColor;
  }
  const color = tinycolor(bgColor);
  if (color.isValid()) {
    const hexColor = color.toHexString();
    return invert(hexColor, {
      black: "#333",
      white: "#fff",
      threshold: 0.25,
    });
  }
  return defaultColor;
}
