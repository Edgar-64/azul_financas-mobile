import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, StyleSheet, TouchableOpacity, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

// Importações baseadas na sua pasta de telas
import HomeScreen from "../screens/HomeScreen";
import CaixinhasScreen from "../screens/CaixinhasScreen";
import PaginaPagamento from "../screens/PaginaPagamento";
import PerfilScreen from "../screens/PerfilScreen";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const navigation = useNavigation<any>();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: "#1D355E",
        tabBarInactiveTintColor: "#AAA",
      }}
    >
      {/* 1. HOME */}
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="home-outline" size={24} color={color} />
          ),
        }}
      />

      {/* 2. GRÁFICOS / CAIXINHAS */}
      <Tab.Screen
        name="CaixinhasTab"
        component={CaixinhasScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="bar-chart-outline" size={24} color={color} />
          ),
        }}
      />

      {/* 4. PAGAMENTO / CARTÃO */}
      <Tab.Screen
        name="PagamentoTab"
        component={PaginaPagamento}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="card-outline" size={24} color={color} />
          ),
        }}
      />

      {/* 5. PERFIL */}
      <Tab.Screen
        name="PerfilTab"
        component={PerfilScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-outline" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 75,
    backgroundColor: "#FFF",
    borderTopWidth: 0,
    elevation: 10,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    position: "absolute", // Importante para o design arredondado
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: Platform.OS === "ios" ? 20 : 0,
  },
  plusContainer: {
    top: -25,
    justifyContent: "center",
    alignItems: "center",
  },
  plusButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#1D355E",
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
});
