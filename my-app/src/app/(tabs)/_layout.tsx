import { Tabs, usePathname } from 'expo-router';
import { View, StyleSheet, Platform } from 'react-native';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';

export default function TabLayout() {
  const pathname = usePathname();

  // Definimos em quais telas a TabBar deve ficar ESCONDIDA
  const hiddenRoutes = ['/', '/cadastro']; 
  const isTabBarHidden = hiddenRoutes.includes(pathname);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        // Se a rota for index ou cadastro, a altura vira 0 e ela some
        tabBarStyle: isTabBarHidden ? { display: 'none' } : styles.tabBar,
      }}
    >
      {/* 1. LOGIN / INDEX (Barra escondida) */}
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <Feather name="home" size={24} color={focused ? "#2d548e" : "#94a3b8"} />
          ),
        }}
      />
      
      {/* 2. DASHBOARD */}
      <Tabs.Screen
        name="dashboard" 
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons name="stats-chart-outline" size={22} color={focused ? "#2d548e" : "#94a3b8"} />
          ),
        }}
      />

      {/* 3. BOTÃO CENTRAL (+) */}
      <Tabs.Screen
        name="adicionar"
        options={{
          tabBarIcon: () => (
            <View style={styles.centerButton}>
              <Ionicons name="add" size={35} color="white" />
            </View>
          ),
        }}
      />

      {/* 4. CARTÕES */}
      <Tabs.Screen
        name="add-credito"
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons name="credit-card-outline" size={26} color={focused ? "#2d548e" : "#94a3b8"} />
          ),
        }}
      />

      {/* 5. PERFIL */}
      <Tabs.Screen
        name="perfil/editar"
        options={{
          tabBarIcon: ({ focused }) => (
            <Feather name="user" size={24} color={focused ? "#2d548e" : "#94a3b8"} />
          ),
        }}
      />

      {/* TELAS QUE NÃO DEVEM TER ÍCONE E NEM APARECER NA BARRA */}
      <Tabs.Screen name="cadastro" options={{ href: null }} />
      <Tabs.Screen name="add-gasto" options={{ href: null }} />
      <Tabs.Screen name="add-receita" options={{ href: null }} />
      <Tabs.Screen name="perfil/configuracao" options={{ href: null }} />
      <Tabs.Screen name="perfil/deletar" options={{ href: null }} />
      <Tabs.Screen name="perfil/senha" options={{ href: null }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 25,
    left: 20,
    right: 20,
    backgroundColor: '#ffffff',
    borderRadius: 40,
    height: 70,
    elevation: 8,
    borderTopWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 15,
  },
  centerButton: {
    width: 60,
    height: 60,
    backgroundColor: '#2d548e',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: -25, 
    borderWidth: 6,
    borderColor: '#ffffff',
    elevation: 5,
  },
});