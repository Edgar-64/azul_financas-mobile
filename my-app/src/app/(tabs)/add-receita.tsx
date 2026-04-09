import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function AddReceita() {
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

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Renda</Text>

        {/* SELETOR DE DATA */}
        <View style={styles.datePicker}>
          <TouchableOpacity><Ionicons name="chevron-back" size={24} color="#718096" /></TouchableOpacity>
          <Text style={styles.dateText}>Abril 2026</Text>
          <TouchableOpacity><Ionicons name="chevron-forward" size={24} color="#718096" /></TouchableOpacity>
        </View>

        {/* CARD DE RENDIMENTOS */}
        <View style={styles.incomeCard}>
          <Text style={styles.cardTitle}>Renda</Text>
          
          <View style={styles.incomeRow}>
            <View style={styles.dot} />
            <Text style={styles.incomeLabel}>Salário</Text>
            <Text style={styles.incomeValue}>R$ 0</Text>
          </View>

          <TouchableOpacity style={styles.addCategory}>
            <Ionicons name="add-circle" size={24} color="#cbd5e0" />
            <Text style={styles.addText}>Adicionar Categoria</Text>
          </TouchableOpacity>
        </View>
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
  title: { fontSize: 24, fontWeight: 'bold', marginVertical: 20, color: '#2d3748' },
  
  datePicker: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#edf2f7', 
    paddingVertical: 10, 
    paddingHorizontal: 40, 
    borderRadius: 30,
    marginBottom: 30
  },
  dateText: { fontSize: 18, fontWeight: 'bold', marginHorizontal: 20, color: '#2d3748' },

  incomeCard: { 
    width: '100%', 
    backgroundColor: '#f8fafc', 
    borderRadius: 15, 
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2
  },
  cardTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  incomeRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 20 
  },
  dot: { width: 12, height: 12, borderRadius: 6, backgroundColor: '#cbd5e0', marginRight: 15 },
  incomeLabel: { flex: 1, fontSize: 16, color: '#4a5568' },
  incomeValue: { fontSize: 16, fontWeight: 'bold' },
  
  addCategory: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#edf2f7',
    paddingTop: 15
  },
  addText: { color: '#a0aec0', marginLeft: 10, fontSize: 14 }
});