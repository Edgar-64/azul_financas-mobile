import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";

// 1. VERIFIQUE ESTES IMPORTS (O erro está aqui!)
import TabNavigator from "./TabNavigator";
import DashboardScreen from "../screens/Dashboard";
import OrcamentoScreen from "../screens/OrcamentoScreen";
import PerfilScreen from "../screens/PerfilScreen";
import LoginScreen from "../screens/LoginScreen";

// ADICIONE ESTA LINHA ABAIXO:
import CaixinhasScreen from "../screens/CaixinhasScreen";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="HomeDrawer"
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: "#1D355E",
        drawerStyle: { backgroundColor: "#F5F6F8", width: 280 },
        drawerLabelStyle: { fontWeight: "600", marginLeft: -10 },
      }}
    >
      <Drawer.Screen
        name="HomeDrawer"
        component={TabNavigator}
        options={{
          drawerLabel: "Início",
          drawerIcon: ({ color }) => (
            <Ionicons name="home-outline" size={22} color={color} />
          ),
        }}
      />

      {/* ROTA DAS CAIXINHAS */}
      <Drawer.Screen
        name="MinhasCaixinhas"
        component={CaixinhasScreen} // Agora o computador sabe o que é isso!
        options={{
          drawerLabel: "Minhas Caixinhas",
          drawerIcon: ({ color }) => (
            <Ionicons name="archive-outline" size={22} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="PerfilMenu"
        component={PerfilScreen}
        options={{
          drawerLabel: "Meu Perfil",
          drawerIcon: ({ color }) => (
            <Ionicons name="person-outline" size={22} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="Planos"
        component={DashboardScreen}
        options={{
          drawerLabel: "Meus Planos",
          drawerIcon: ({ color }) => (
            <Ionicons name="pie-chart-outline" size={22} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="Sair"
        component={LoginScreen}
        options={{
          drawerLabel: "Sair",
          drawerIcon: () => (
            <Ionicons name="log-out-outline" size={22} color="#DC2626" />
          ),
          drawerLabelStyle: { color: "#DC2626" },
        }}
      />
    </Drawer.Navigator>
  );
}
