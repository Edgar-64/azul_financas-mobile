import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import DrawerNavigator from "./src/navigation/DrawerNavigator";
import SplashScreen from "./src/screens/SplashScreen";
import LoginScreen from "./src/screens/LoginScreen";
import CadastroScreen from "./src/screens/CadastroScreen"; // Importe aqui
import RecSenhaScreen from "./src/screens/RecSenhaScreen"; // Importe aqui
import OrcamentoScreen from "./src/screens/OrcamentoScreen";
import NovoLancamentoScreen from "./src/screens/NovoLancamentoScreen";
import DashboardScreen from "./src/screens/Dashboard";
import PerfilScreen from "./src/screens/PerfilScreen";
import EditarPerfilScreen from "./src/screens/EditarPerfilScreen";
import AlterarSenhaScreen from "./src/screens/AlterarSenhaScreen";
import ExcluirContaScreen from "./src/screens/ExcluirContaScreen";
import CaixinhasScreen from "./src/screens/CaixinhasScreen";
import ContaScreen from "./src/screens/ContaScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Cadastro" component={CadastroScreen} />
        <Stack.Screen name="RecSenha" component={RecSenhaScreen} />

        <Stack.Screen name="Home" component={DrawerNavigator} />

        <Stack.Screen name="Orcamento" component={OrcamentoScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="Caixinhas" component={CaixinhasScreen} />
        <Stack.Screen name="Conta" component={ContaScreen} />
        <Stack.Screen name="Perfil" component={PerfilScreen} />
        <Stack.Screen name="EditarPerfil" component={EditarPerfilScreen} />
        <Stack.Screen name="AlterarSenha" component={AlterarSenhaScreen} />
        <Stack.Screen name="ExcluirConta" component={ExcluirContaScreen} />

        <Stack.Screen
          name="NovoLancamento"
          component={NovoLancamentoScreen}
          options={{
            presentation: "transparentModal",
            cardStyle: { backgroundColor: "transparent" },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
