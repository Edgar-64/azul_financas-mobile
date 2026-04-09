import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AddGasto() {
  return (
    <View style={styles.container}>
      <View style={styles.headerBlue}>
        <Ionicons name="menu" size={30} color="white" />
        <View style={styles.logoSmall}><Ionicons name="stats-chart" size={12} color="#2d548e" /></View>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Despesas</Text>
        <Text style={styles.subtitle}>Adicione seu Gasto de forma rápida.</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.currency}>R$</Text>
          <TextInput style={styles.mainInput} keyboardType="numeric" placeholder="0,00" />
        </View>

        <Text style={styles.label}>Conta</Text>
        <Text style={styles.subLabel}>Conta X</Text>

        <Text style={styles.label}>Categoria</Text>
        <View style={styles.categoryGrid}>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <View key={i} style={styles.circlePlaceholder} />
          ))}
        </View>

        <TouchableOpacity style={styles.btnAction}>
          <Text style={styles.btnText}>Adicionar Gasto</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  headerBlue: { backgroundColor: '#2d548e', height: 100, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 40 },
  logoSmall: { width: 24, height: 24, backgroundColor: 'white', borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  content: { flex: 1, alignItems: 'center', padding: 25 },
  title: { fontSize: 24, fontWeight: 'bold', marginTop: 20 },
  subtitle: { color: '#718096', fontSize: 12, marginBottom: 40 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#ccc', width: '60%', marginBottom: 40 },
  currency: { fontSize: 24, fontWeight: 'bold' },
  mainInput: { flex: 1, fontSize: 32, textAlign: 'center' },
  label: { alignSelf: 'flex-start', fontWeight: 'bold', marginTop: 20 },
  subLabel: { alignSelf: 'flex-start', color: '#718096', marginBottom: 20 },
  categoryGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' },
  circlePlaceholder: { width: 45, height: 45, borderRadius: 22.5, backgroundColor: '#e2e8f0', margin: 10 },
  btnAction: { backgroundColor: '#f56565', width: '100%', padding: 15, borderRadius: 25, alignItems: 'center', marginTop: 40 },
  btnText: { color: 'white', fontWeight: 'bold', fontSize: 16 }
});