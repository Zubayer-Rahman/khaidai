import * as Font from "expo-font";
import { useEffect, useState } from "react";
import { fontsToLoad } from "../constants/Fonts";

export default function useFonts() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync(fontsToLoad);
      setFontsLoaded(true);
    }

    loadFonts();
  }, []);

  return fontsLoaded;
}