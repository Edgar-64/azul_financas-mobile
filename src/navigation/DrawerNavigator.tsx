import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

import TabNavigator from './TabNavigator';
import DashboardScreen from '../screens/Dashboard'; 
import PerfilScreen from '../screens/PerfilScreen';
import LoginScreen from '../screens/LoginScreen';
import CaixinhasScreen from '../screens/CaixinhasScreen'; 

// 🚨 1. IMPORTE A TELA DE EDIÇÃO AQUI EM CIMA
import EditarPerfilScreen from '../screens/EditarPerfilScreen'; 

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator 
      initialRouteName="HomeDrawer"
      screenOptions={{ 
        headerShown: false,
        drawerActiveTintColor: '#1D355E',
        drawerStyle: { backgroundColor: '#F5F6F8', width: 280 },
        drawerLabelStyle: { fontWeight: '600', marginLeft: -10 }
      }}
    >
      <Drawer.Screen 
        name="HomeDrawer" 
        component={TabNavigator} 
        options={{
          drawerLabel: 'Início',
          drawerIcon: ({ color }) => <Ionicons name="home-outline" size={22} color={color} />
        }}
      />

      <Drawer.Screen 
        name="MinhasCaixinhas" 
        component={CaixinhasScreen}
        options={{
          drawerLabel: 'Minhas Caixinhas',
          drawerIcon: ({ color }) => <Ionicons name="archive-outline" size={22} color={color} />
        }}
      />

      <Drawer.Screen 
        name="PerfilMenu" 
        component={PerfilScreen} 
        options={{
          drawerLabel: 'Meu Perfil',
          drawerIcon: ({ color }) => <Ionicons name="person-outline" size={22} color={color} />
        }}
      />

      {/* 🚨 2. ADICIONE ESSA ROTA AQUI PARA O BOTÃO FUNCIONAR */}
      {/* O 'display: none' garante que ela não apareça na lista do menu lateral */}
      <Drawer.Screen 
        name="EditarPerfilScreen" 
        component={EditarPerfilScreen} 
        options={{
          drawerItemStyle: { display: 'none' } 
        }}
      />

      <Drawer.Screen 
        name="Planos" 
        component={DashboardScreen} 
        options={{
          drawerLabel: 'Meus Planos',
          drawerIcon: ({ color }) => <Ionicons name="pie-chart-outline" size={22} color={color} />
        }}
      />

      <Drawer.Screen 
        name="Sair" 
        component={LoginScreen} 
        options={{
          drawerLabel: 'Sair',
          drawerIcon: () => <Ionicons name="log-out-outline" size={22} color="#DC2626" />,
          drawerLabelStyle: { color: '#DC2626' }
        }}
      />
    </Drawer.Navigator>
  );
}