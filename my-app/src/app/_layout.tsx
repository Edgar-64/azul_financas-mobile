import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

// Impede a splash de sumir sozinha
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [appIsReady, setAppIsReady] = useState(false);

  // Ajustado o caminho das fontes para sua pasta src/assets
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    async function prepare() {
      try {
        // Se as fontes carregarem, esperamos mais um pouco (ex: 2 segundos)
        // para a imagem da splash ser apreciada pelo usuário
        if (loaded) {
          await new Promise((resolve) => setTimeout(resolve, 2000));
          setAppIsReady(true);
        }
      } catch (e) {
        console.warn(e);
      }
    }

    prepare();
  }, [loaded]);

  useEffect(() => {
    if (appIsReady) {
      // Esconde a splash screen de fato
      SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  // Enquanto as fontes não carregam OU o tempo mínimo não passou, mantém a splash
  if (!appIsReady) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="info" options={{ presentation: "modal" }} />
    </Stack>
  );
}
