import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AlterarSenhaScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="menu" size={28} color="#333" /> 
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>PERFIL</Text>
          <Text style={styles.headerSubtitle}>Vamos organizar suas finanças?</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Ionicons name="log-out-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.mainTitle}>Alterar senha?{"\n"}Vamos lá!</Text>
        
        <View style={styles.field}>
          <Text style={styles.label}>Digite sua senha atual</Text>
          <TextInput style={styles.input} secureTextEntry placeholder="**********" />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Digite sua senha nova</Text>
          <TextInput style={styles.input} secureTextEntry placeholder="**********" />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Digite sua senha nova</Text>
          <TextInput style={styles.input} secureTextEntry placeholder="**********" />
        </View>

        <TouchableOpacity><Text style={styles.forgot}>Não sabe sua senha?</Text></TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={() => navigation.goBack()}>
          <Text style={styles.btnText}>Salvar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingTop: 15 },
  headerTitleContainer: { flex: 1, marginLeft: 15 },
  headerTitle: { fontWeight: 'bold', fontSize: 14 },
  headerSubtitle: { fontSize: 11, color: '#777' },
  content: { padding: 30 },
  mainTitle: { fontSize: 32, fontWeight: 'bold', color: '#111', marginBottom: 40 },
  field: { marginBottom: 20 },
  label: { fontSize: 14, color: '#555', marginBottom: 8 },
  input: { backgroundColor: '#F9F9F9', height: 55, borderRadius: 12, paddingHorizontal: 15, borderWidth: 1, borderColor: '#EEE' },
  forgot: { color: '#888', textDecorationLine: 'underline', marginBottom: 30 },
  btn: { backgroundColor: '#1D355E', height: 55, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  btnText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 }
});