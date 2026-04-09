import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

function CustomDrawerContent(props: any) {
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: '#2d548e' }}>
      <DrawerContentScrollView {...props}>
        {/* CABEÇALHO */}
        <View style={styles.drawerHeader}>
          <TouchableOpacity style={styles.menuButtonClose}>
            <Ionicons name="menu" size={32} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Azul Finanças</Text>
          <View style={styles.logoCircleSmall}>
             <Ionicons name="stats-chart" size={15} color="#2d548e" />
          </View>
        </View>

        {/* ITENS DO MENU COM ESPAÇAMENTO AJUSTADO */}
        <View style={styles.menuItemsContainer}>
          <DrawerItem
            label="Home"
            labelStyle={styles.drawerLabel}
            style={styles.drawerItem}
            icon={() => <Ionicons name="home-outline" size={22} color="white" />}
            onPress={() => router.push('/(tabs)')}
          />
          <DrawerItem
            label="Planos"
            labelStyle={styles.drawerLabel}
            style={styles.drawerItem}
            icon={() => <MaterialCommunityIcons name="layers-outline" size={22} color="white" />}
            onPress={() => {}}
          />
          <DrawerItem
            label="Sobre Nós"
            labelStyle={styles.drawerLabel}
            style={styles.drawerItem}
            icon={() => <Ionicons name="book-outline" size={22} color="white" />}
            onPress={() => {}}
          />
          <DrawerItem
            label="Dashboard"
            labelStyle={styles.drawerLabel}
            style={styles.drawerItem}
            icon={() => <MaterialCommunityIcons name="view-dashboard-outline" size={22} color="white" />}
            onPress={() => router.push('/(tabs)')}
          />
          <DrawerItem
            label="Configurações"
            labelStyle={styles.drawerLabel}
            style={styles.drawerItem}
            icon={() => <Ionicons name="settings-outline" size={22} color="white" />}
            onPress={() => {}}
          />
        </View>
      </DrawerContentScrollView>

      {/* ÍCONE DE RELÓGIO */}
      <View style={styles.footerIconContainer}>
        <View style={styles.clockButton}>
          <Ionicons name="time-outline" size={24} color="#2d548e" />
        </View>
      </View>
    </View>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerShown: false,
          drawerStyle: { width: 280 },
        }}
      >
        <Drawer.Screen name="(tabs)" />
      </Drawer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  drawerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    marginTop: 10,
  },
  menuButtonClose: { marginRight: 15 },
  headerTitle: { color: 'white', fontSize: 18, fontWeight: 'bold', flex: 1 },
  logoCircleSmall: {
    width: 30, height: 30, backgroundColor: 'white', borderRadius: 15,
    justifyContent: 'center', alignItems: 'center',
  },
  menuItemsContainer: { marginTop: 10, paddingHorizontal: 5 },
  drawerItem: {
    marginVertical: 0, // Diminui o espaço vertical entre as linhas se necessário
  },
  drawerLabel: {
    color: 'white',
    fontSize: 18,
    marginLeft: 15, // <--- ESTE É O ESPAÇO QUE ESTAVA A FALTAR
  },
  footerIconContainer: { padding: 20, alignItems: 'flex-end' },
  clockButton: {
    width: 45, height: 45, backgroundColor: 'white', borderRadius: 10,
    justifyContent: 'center', alignItems: 'center',
  }
});