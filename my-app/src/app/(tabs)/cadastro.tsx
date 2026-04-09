import React, { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform,
  ScrollView 
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from "expo-router";

export default function CadastroScreen() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  return (
    <LinearGradient
      colors={['#1a3a6d', '#2d548e', '#1a3a6d']}
      style={styles.background}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          {/* BOTÃO VOLTAR */}
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={28} color="white" />
          </TouchableOpacity>

          <Text style={styles.title}>Cadastro</Text>

          {/* LOGO CIRCULAR */}
          <View style={styles.logoContainer}>
            <View style={styles.logoCircle}>
              <Ionicons name="stats-chart" size={60} color="#1a3a6d" />
              <Text style={styles.logoText}>Azul Finanças</Text>
            </View>
          </View>

          <Text style={styles.descriptionText}>
            Crie sua conta em poucos segundos{"\n"}e comece a aproveitar todos os{"\n"}recursos do app agora mesmo!
          </Text>

          {/* CAMPOS DE INPUT */}
          <View style={styles.inputGroup}>
            <InputWithIcon 
              icon="person-outline" 
              placeholder="Nome" 
              value={nome} 
              onChangeText={setNome} 
            />
            <InputWithIcon 
              icon="mail-outline" 
              placeholder="Email" 
              value={email} 
              onChangeText={setEmail} 
              keyboardType="email-address"
            />
            <InputWithIcon 
              icon="call-outline" 
              placeholder="Telefone" 
              value={telefone} 
              onChangeText={setTelefone} 
              keyboardType="phone-pad"
            />
            <InputWithIcon 
              icon="lock-closed-outline" 
              placeholder="Senha" 
              value={password} 
              onChangeText={setPassword} 
              secureTextEntry 
            />
          </View>

          {/* BOTÃO CADASTRAR */}
          <TouchableOpacity style={styles.cadastrarButton}>
            <Text style={styles.cadastrarButtonText}>Cadastrar-se</Text>
          </TouchableOpacity>

          <View style={styles.dividerContainer}>
            <View style={styles.line} />
            <Text style={styles.dividerText}>ou</Text>
            <View style={styles.line} />
          </View>

          {/* BOTÃO GMAIL */}
          <TouchableOpacity style={styles.gmailButton}>
            <Ionicons name="logo-google" size={20} color="white" style={{marginRight: 10}} />
            <Text style={styles.gmailText}>Gmail</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/')}>
            <Text style={styles.footerText}>
              Já tem conta? <Text style={styles.linkText}>Faça login</Text>
            </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    </LinearGradient>
  );
}

// Componente de Input Reutilizável para manter o código limpo
function InputWithIcon({ icon, ...props }: any) {
  return (
    <View style={styles.inputWrapper}>
      <Ionicons name={icon} size={20} color="white" style={styles.inputIcon} />
      <TextInput
        style={styles.input}
        placeholderTextColor="rgba(255,255,255,0.7)"
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  container: { flex: 1, padding: 30, alignItems: 'center', paddingTop: 60 },
  backButton: { alignSelf: 'flex-start', marginBottom: 10 },
  title: { fontSize: 28, fontWeight: 'bold', color: 'white', marginBottom: 20 },
  logoContainer: { marginBottom: 25 },
  logoCircle: { 
    width: 160, 
    height: 160, 
    backgroundColor: 'white', 
    borderRadius: 80, 
    justifyContent: 'center', 
    alignItems: 'center',
    elevation: 8,
  },
  logoText: { color: '#1a3a6d', fontWeight: 'bold', fontSize: 16, marginTop: 5 },
  descriptionText: { color: 'white', textAlign: 'center', opacity: 0.7, marginBottom: 30, fontSize: 13 },
  inputGroup: { width: '100%', marginBottom: 25 },
  inputWrapper: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    borderBottomWidth: 1, 
    borderBottomColor: 'rgba(255,255,255,0.4)',
    marginBottom: 15,
    paddingBottom: 8
  },
  inputIcon: { marginRight: 12 },
  input: { flex: 1, color: 'white', fontSize: 15 },
  cadastrarButton: { 
    backgroundColor: 'white', 
    width: '100%', 
    padding: 16, 
    borderRadius: 30, 
    alignItems: 'center',
    marginBottom: 20
  },
  cadastrarButtonText: { color: '#1a3a6d', fontWeight: 'bold', fontSize: 16 },
  dividerContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 20, width: '100%' },
  line: { flex: 1, height: 1, backgroundColor: 'rgba(255,255,255,0.2)' },
  dividerText: { color: 'white', paddingHorizontal: 10, fontSize: 12 },
  gmailButton: { 
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.1)', 
    width: '100%', 
    padding: 14, 
    borderRadius: 30, 
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)'
  },
  gmailText: { color: 'white', fontWeight: 'bold' },
  footerText: { color: 'white', marginTop: 25, opacity: 0.8, fontSize: 13 },
  linkText: { color: '#53c0ff', fontWeight: 'bold' },
});