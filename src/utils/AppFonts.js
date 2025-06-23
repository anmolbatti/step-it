import { useFonts } from 'expo-font';

const AppFonts = () => {
  const [fontsLoaded] = useFonts({
    "Bold": require("../assets/fonts/IBMPlexSans-Bold.ttf"),
    "BoldItalic": require("../assets/fonts/IBMPlexSans-BoldItalic.ttf"),
    "ExtraLight": require("../assets/fonts/IBMPlexSans-ExtraLight.ttf"),
    "ExtraLightItalic": require("../assets/fonts/IBMPlexSans-ExtraLightItalic.ttf"),
    "Italic": require("../assets/fonts/IBMPlexSans-Italic.ttf"),
    "Light": require("../assets/fonts/IBMPlexSans-Light.ttf"),
    "LightItalic": require("../assets/fonts/IBMPlexSans-LightItalic.ttf"),
    "SansMedium": require("../assets/fonts/IBMPlexSans-Medium.ttf"),
    "MediumItalic": require("../assets/fonts/IBMPlexSans-MediumItalic.ttf"),
    "Regular": require("../assets/fonts/IBMPlexSans-Regular.ttf"),
    "SemiBold": require("../assets/fonts/IBMPlexSans-SemiBold.ttf"),
    "SemiBoldItalic": require("../assets/fonts/IBMPlexSans-SemiBoldItalic.ttf"),
    "Thin": require("../assets/fonts/IBMPlexSans-Thin.ttf"),
    "ThinItalic": require("../assets/fonts/IBMPlexSans-ThinItalic.ttf")
  });

  return fontsLoaded;
};

export default AppFonts;
