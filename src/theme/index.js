import { createTheme } from "@material-ui/core/styles";

export const useGetTheme = () => {
  const themeObj = {
    palette: {
      type: "light",
      primary: { main: "#ac1e1e" },
      secondary: { main: "#190e4f" },
    },
    typography: {
      fontFamily: ["Segoe UI", "Tahoma", "Geneva", "Verdana", "sans-serif"],
      fontSize: 16,
    },
  };

  const theme = createTheme(themeObj);
  return theme;
};

export default useGetTheme;
