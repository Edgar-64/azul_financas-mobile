import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function AddCredito() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* HEADER AZUL PADRÃO */}
      <View style={styles.headerBlue}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="menu" size={30} color="white" />
        </TouchableOpacity>
        <View style={styles.logoSmall}>
          <Ionicons name="stats-chart" size={12} color="#2d548e" />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Crédito</Text>
        <Text style={styles.subtitle}>Adicione seu Gasto Recorrente de{"\n"}forma rápida.</Text>

        {/* INPUT DE VALOR */}
        <View style={styles.inputContainer}>
          <Text style={styles.currency}>R$</Text>
          <TextInput 
            style={styles.mainInput} 
            keyboardType="numeric" 
            placeholder="________" 
            placeholderTextColor="#cbd5e0"
          />
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Conta</Text>
          <Text style={styles.subLabel}>Conta X</Text>
        </View>

        <Text style={styles.label}>Categoria</Text>
        <View style={styles.categoryGrid}>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <View key={i} style={styles.circlePlaceholder} />
          ))}
        </View>

        {/* SEÇÃO DE FREQUÊNCIA */}
        <Text style={styles.label}>Frequência</Text>
        <View style={styles.frequencyContainer}>
          {['2x', '3x', '6x', '12x'].map((item) => (
            <TouchableOpacity key={item} style={styles.freqBadge}>
              <Text style={styles.freqText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.outroContainer}>
          <Text style={styles.label}>Outro:_________</Text>
        </View>

        {/* BOTÃO ADICIONAR */}
        <TouchableOpacity style={styles.btnAction}>
          <Text style={styles.btnText}>Adicionar Gasto</Text>
        </TouchableOpacity>
        
        {/* Espaço para a TabBar não cobrir o botão */}
        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  headerBlue: { 
    backgroundColor: '#2d548e', 
    height: 100, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 20, 
    paddingTop: 40 
  },
  logoSmall: { 
    width: 24, height: 24, backgroundColor: 'white', 
    borderRadius: 12, justifyContent: 'center', alignItems: 'center' 
  },
  content: { alignItems: 'center', padding: 25 },
  title: { fontSize: 24, fontWeight: 'bold', marginTop: 10, color: '#2d3748' },
  subtitle: { color: '#718096', fontSize: 12, textAlign: 'center', marginBottom: 30, lineHeight: 18 },
  
  inputContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center',
    marginBottom: 30 
  },
  currency: { fontSize: 24, fontWeight: 'bold', marginRight: 10 },
  mainInput: { fontSize: 32, width: 150, textAlign: 'center', borderBottomWidth: 1, borderBottomColor: '#000' },

  infoRow: { alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  label: { fontSize: 16, fontWeight: 'bold', color: '#2d3748', alignSelf: 'flex-start', marginBottom: 10 },
  subLabel: { fontSize: 14, color: '#718096', marginLeft: 10, marginBottom: 10 },

  categoryGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginBottom: 20 },
  circlePlaceholder: { width: 45, height: 45, borderRadius: 22.5, backgroundColor: '#e2e8f0', margin: 8 },

  frequencyContainer: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 20 },
  freqBadge: { backgroundColor: '#e2e8f0', paddingVertical: 8, paddingHorizontal: 15, borderRadius: 15, width: '22%', alignItems: 'center' },
  freqText: { fontWeight: 'bold', color: '#4a5568' },

  outroContainer: { alignSelf: 'flex-start', marginBottom: 30 },

  btnAction: { 
    backgroundColor: '#f56565', 
    width: '100%', 
    padding: 16, 
    borderRadius: 25, 
    alignItems: 'center',
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3
  },
  btnText: { color: 'white', fontWeight: 'bold', fontSize: 16 }
});