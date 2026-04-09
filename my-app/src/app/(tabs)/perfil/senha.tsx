import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function UpdatePassword() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.headerBlue}>
        <TouchableOpacity onPress={() => router.back()}><Ionicons name="arrow-back" size={28} color="white" /></TouchableOpacity>
        <Text style={styles.headerTitle}>Atualizar Senha</Text>
        <View style={styles.logoSmall}><Ionicons name="stats-chart" size={12} color="#2d548e" /></View>
      </View>

      <View style={styles.content}>
        {['Senha Atual', 'Nova Senha', 'Confirmar Nova Senha'].map((label) => (
          <View key={label} style={styles.inputGroup}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.inputWrapper}>
              <TextInput style={styles.input} secureTextEntry placeholder="● ● ● ● ● ● ● ●" placeholderTextColor="#cbd5e0" />
              <Ionicons name="eye-off-outline" size={20} color="#a0aec0" />
            </View>
          </View>
        ))}

        <TouchableOpacity style={styles.btnSave}>
          <Text style={styles.btnText}>Atualizar Senha</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  headerBlue: { backgroundColor: '#2d548e', height: 100, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingTop: 40 },
  headerTitle: { color: 'white', fontSize: 18, fontWeight: 'bold', flex: 1, textAlign: 'center' },
  logoSmall: { width: 24, height: 24, backgroundColor: 'white', borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  content: { padding: 30 },
  inputGroup: { marginBottom: 25 },
  label: { fontWeight: 'bold', color: '#4a5568', marginBottom: 10 },
  inputWrapper: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f1f5f9', borderRadius: 15, paddingHorizontal: 20 },
  input: { flex: 1, paddingVertical: 15, fontSize: 16 },
  btnSave: { backgroundColor: '#2d548e', padding: 18, borderRadius: 30, alignItems: 'center', marginTop: 30 },
  btnText: { color: 'white', fontWeight: 'bold', fontSize: 16 }
});