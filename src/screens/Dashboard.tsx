import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function DashboardScreen({ navigation }: any) {
  const planos = [
    { id: '1', nome: 'BÁSICO', preco: 'R$ 0,00' },
    { id: '2', nome: 'PRO', preco: 'R$ 9,99' },
    { id: '3', nome: 'PREMIUM', preco: 'R$ 16,99' },
  ];

  // FUNÇÃO PARA ADQUIRIR
  const handleAdquirir = (nomePlano: string) => {
    Alert.alert(
      "Sucesso!",
      `Você adquiriu o plano ${nomePlano}. Bem-vindo!`,
      [{ text: "OK", onPress: () => navigation.navigate('Home') }]
    );
  };

  // FUNÇÃO PARA SAIR (Resetando a pilha para o Login)
  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>

        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>PLANOS</Text>
          <Text style={styles.headerSubtitle}>Escolha um plano que seja melhor para você!</Text>
        </View>

        <TouchableOpacity onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        
        <Text style={styles.mainTitle}>Conheça Nossos Planos...</Text>

        {planos.map((plano) => (
          <View key={plano.id} style={styles.card}>
            <View style={styles.blueDetail} />

            <Text style={styles.planName}>{plano.nome}</Text>

            <View style={styles.infoRow}>
              <View>
                <Text style={styles.label}>Investimento</Text>
                <Text style={styles.value}>{plano.preco}</Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={styles.label}>Benefícios</Text>
                <Text style={styles.value}>Acesso Total</Text>
              </View>
            </View>

            {/* BOTÃO COM AÇÃO */}
            <TouchableOpacity 
              style={styles.buttonAdquirir} 
              onPress={() => handleAdquirir(plano.nome)}
            >
              <Text style={styles.buttonText}>Adquirir</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F6F8' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEE'
  },
  headerTitleContainer: { alignItems: 'center' },
  headerTitle: { fontSize: 14, fontWeight: 'bold', color: '#000' },
  headerSubtitle: { fontSize: 11, color: '#777' },
  mainTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111',
    marginHorizontal: 25,
    marginTop: 20,
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#1C1C1E',
    marginHorizontal: 20,
    marginTop: 15,
    borderRadius: 15,
    padding: 20,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  blueDetail: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '45%',
    height: 15,
    backgroundColor: '#2D5AA0',
    borderBottomLeftRadius: 15,
  },
  planName: { color: '#FFF', fontSize: 18, fontWeight: 'bold', marginBottom: 20 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  label: { color: '#777', fontSize: 11, marginBottom: 5 },
  value: { color: '#FFF', fontSize: 14, fontWeight: '600' },
  buttonAdquirir: {
    borderWidth: 1,
    borderColor: '#2D5AA0',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: 'rgba(45, 90, 160, 0.1)',
  },
  buttonText: { color: '#4A90E2', fontWeight: 'bold', fontSize: 15 },
});