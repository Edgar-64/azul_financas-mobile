import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


// ================= HOME =================
function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20 }}>HOME</Text>

      <TouchableOpacity
        style={styles.plus}
        onPress={() => navigation.getParent().navigate('Add')}
      >
        <Ionicons name="add" size={30} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
}


// ================= MODAL =================
function NovoLancamento({ navigation }) {
  return (
    <View style={styles.overlay}>
      <TouchableOpacity style={{ flex: 1 }} onPress={() => navigation.goBack()} />

      <View style={styles.modal}>
        <Text>Novo Lançamento</Text>
      </View>
    </View>
  );
}


// ================= TABS =================
function Tabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeScreen} />
    </Tab.Navigator>
  );
}


// ================= STACK =================
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        
        <Stack.Screen
          name="Main"
          component={Tabs}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Add"
          component={NovoLancamento}
          options={{
            presentation: 'transparentModal',
            headerShown: false
          }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}


// ================= STYLE =================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  plus: {
    position: 'absolute',
    bottom: 40,
    backgroundColor: '#1D355E',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end'
  },

  modal: {
    backgroundColor: '#FFF',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  }
});