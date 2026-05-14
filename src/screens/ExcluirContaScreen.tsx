import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';

export default function ExcluirContaScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.container}>
       <View style={styles.content}>
          <Text style={styles.title}>Deseja Excluir Conta Vamos lá!</Text>
          
          <Text style={styles.label}>Digite sua senha atual</Text>
          <TextInput style={styles.input} secureTextEntry value="**********" />

          <Text style={styles.label}>Digite sua senha novamente</Text>
          <TextInput style={styles.input} secureTextEntry value="**********" />

          <Text style={styles.warning}>Tem certeza disso?</Text>

          <TouchableOpacity style={styles.deleteButton} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.deleteButtonText}>Excluir</Text>
          </TouchableOpacity>
       </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  content: { padding: 25 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 40 },
  label: { color: '#666', marginBottom: 8 },
  input: { backgroundColor: '#F9F9F9', padding: 15, borderRadius: 10, marginBottom: 20, borderWidth: 1, borderColor: '#EEE' },
  warning: { color: '#333', marginBottom: 30 },
  deleteButton: { backgroundColor: '#1D355E', padding: 15, borderRadius: 10, alignItems: 'center' },
  deleteButtonText: { color: '#FFF', fontWeight: 'bold' }
});