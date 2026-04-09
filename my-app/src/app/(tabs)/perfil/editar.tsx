import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function EditarPerfil() {
  const router = useRouter();
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}><Ionicons name="menu" size={28} color="white" /></TouchableOpacity>
        <View style={styles.miniLogo}><Ionicons name="stats-chart" size={12} color="#2d548e" /></View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Image source={{ uri: 'https://i.pravatar.cc/150?u=user' }} style={styles.avatar} />
        <Text style={styles.name}>User</Text>
        <Text style={styles.userId}>ID: 25030024</Text>

        <View style={styles.form}>
          <Text style={styles.sectionTitle}>Perfil</Text>
          
          <Text style={styles.label}>Nome</Text>
          <TextInput style={styles.input} placeholder="Nome" />

          <Text style={styles.label}>Telefone</Text>
          <TextInput style={styles.input} placeholder="+44 555 5555 55" />

          <Text style={styles.label}>Email</Text>
          <TextInput style={styles.input} placeholder="example@example.com" />
        </View>

        <TouchableOpacity style={styles.btnBlue}>
          <Text style={styles.btnText}>Update Profile</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { backgroundColor: '#2d548e', height: 100, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 40 },
  miniLogo: { width: 24, height: 24, backgroundColor: 'white', borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  content: { alignItems: 'center', padding: 25 },
  avatar: { width: 90, height: 90, borderRadius: 45, marginBottom: 10 },
  name: { fontSize: 18, fontWeight: 'bold' },
  userId: { fontSize: 12, color: '#94a3b8', marginBottom: 20 },
  form: { width: '100%' },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  label: { fontWeight: '600', marginBottom: 5, color: '#475569' },
  input: { backgroundColor: '#f1f5f9', padding: 12, borderRadius: 10, marginBottom: 15 },
  btnBlue: { backgroundColor: '#2d548e', paddingVertical: 12, paddingHorizontal: 35, borderRadius: 20, marginTop: 20 },
  btnText: { color: 'white', fontWeight: 'bold' }
});