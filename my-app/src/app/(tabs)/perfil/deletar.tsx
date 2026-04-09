import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function DeletarConta() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}><Ionicons name="arrow-back" size={26} color="white" /></TouchableOpacity>
        <Text style={styles.headerTitle}>Deletar Conta</Text>
        <View style={styles.miniLogo}><Ionicons name="stats-chart" size={12} color="#2d548e" /></View>
      </View>

      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Delete Account</Text>
          <Text style={styles.cardText}>
            Are You Sure You Want To Log Out?{"\n\n"}
            By deleting your account, you agree that you understand the consequences and this action cannot be undone.
          </Text>
        </View>

        <Text style={styles.inputLabel}>Insira Sua Senha Para Desativar Sua Conta</Text>
        <View style={styles.passWrapper}>
          <TextInput style={{ flex: 1 }} secureTextEntry placeholder="● ● ● ● ● ● ● ●" />
          <Ionicons name="eye-off-outline" size={20} color="#94a3b8" />
        </View>

        <TouchableOpacity style={styles.btnRed}>
          <Text style={styles.btnText}>Sim, Deletar Conta</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnCancel} onPress={() => router.back()}>
          <Text style={styles.cancelText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { backgroundColor: '#2d548e', height: 100, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingTop: 40 },
  headerTitle: { color: 'white', fontSize: 18, fontWeight: 'bold', flex: 1, textAlign: 'center' },
  miniLogo: { width: 24, height: 24, backgroundColor: 'white', borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  content: { flex: 1, padding: 25, alignItems: 'center' },
  card: { backgroundColor: '#fff', padding: 25, borderRadius: 20, elevation: 4, shadowOpacity: 0.1, marginBottom: 30, width: '100%' },
  cardTitle: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 15 },
  cardText: { textAlign: 'center', color: '#64748b', lineHeight: 20 },
  inputLabel: { fontWeight: 'bold', alignSelf: 'flex-start', marginBottom: 10 },
  passWrapper: { flexDirection: 'row', backgroundColor: '#f1f5f9', padding: 15, borderRadius: 15, width: '100%', marginBottom: 30 },
  btnRed: { backgroundColor: '#ef4444', width: '100%', padding: 16, borderRadius: 30, alignItems: 'center', marginBottom: 12 },
  btnCancel: { backgroundColor: '#f8fafc', width: '100%', padding: 16, borderRadius: 30, alignItems: 'center' },
  btnText: { color: 'white', fontWeight: 'bold' },
  cancelText: { color: '#94a3b8', fontWeight: 'bold' }
});