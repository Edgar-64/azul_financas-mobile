import React, { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  KeyboardAvoidingView, 
  Platform 
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    // Redireciona para a rota do dashboard. 
    // Certifique-se de que o arquivo existe em app/(tabs)/dashboard.tsx ou similar
    router.replace("/dashboard"); 
    
    // OBS: Se o seu dashboard for a tela principal das tabs, use:
    // router.replace("/(tabs)");
  };

  return (
    <LinearGradient
      colors={['#1a3a6d', '#2d548e', '#1a3a6d']} 
      style={styles.background}
    >
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <Text style={styles.title}>Login</Text>

        <View style={styles.logoContainer}>
          <View style={styles.logoCircle}>
            <Image 
              source={require("../../assets/images/logo.png")} 
              style={{ width: 120, height: 120, resizeMode: 'contain' }} 
            />
          </View>
        </View>

        <Text style={styles.welcomeText}>
          Bem-vindo(a) de volta, por{"\n"}favor, faça login novamente.
        </Text>

        <View style={styles.inputGroup}>
          <View style={styles.inputWrapper}>
            <Ionicons name="mail-outline" size={20} color="white" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="rgba(255,255,255,0.7)"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputWrapper}>
            <Ionicons name="lock-closed-outline" size={20} color="white" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Senha"
              placeholderTextColor="rgba(255,255,255,0.7)"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>
        </View>

        {/* Botão configurado para disparar a função handleLogin */}
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Entrar</Text>
        </TouchableOpacity>

        <View style={styles.dividerContainer}>
          <View style={styles.line} />
          <Text style={styles.dividerText}>ou</Text>
          <View style={styles.line} />
        </View>

        <TouchableOpacity style={styles.gmailButton} onPress={handleLogin}>
          <Ionicons name="logo-google" size={20} color="white" style={{marginRight: 10}} />
          <Text style={styles.gmailText}>Entrar com Gmail</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          Ainda não tem conta? <Text style={styles.linkText} onPress={() => router.push('/cadastro')}>Cadastre-se</Text>
        </Text>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

// ... (seus estilos permanecem os mesmos)
const styles = StyleSheet.create({
  background: { flex: 1 },
  container: { flex: 1, padding: 30, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 32, fontWeight: 'bold', color: 'white', marginBottom: 20 },
  logoContainer: { marginBottom: 30 },
  logoCircle: { 
    width: 180, 
    height: 180, 
    backgroundColor: 'white', 
    borderRadius: 90, 
    justifyContent: 'center', 
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  welcomeText: { color: 'white', textAlign: 'center', opacity: 0.8, marginBottom: 40, lineHeight: 22 },
  inputGroup: { width: '100%', marginBottom: 30 },
  inputWrapper: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    borderBottomWidth: 1, 
    borderBottomColor: 'rgba(255,255,255,0.5)',
    marginBottom: 20,
    paddingBottom: 5
  },
  inputIcon: { marginRight: 10 },
  input: { flex: 1, color: 'white', fontSize: 16 },
  loginButton: { 
    backgroundColor: 'white', 
    width: '100%', 
    padding: 15, 
    borderRadius: 30, 
    alignItems: 'center',
    marginBottom: 20
  },
  loginButtonText: { color: '#1a3a6d', fontWeight: 'bold', fontSize: 18 },
  dividerContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 20, width: '100%' },
  line: { flex: 1, height: 1, backgroundColor: 'rgba(255,255,255,0.3)' },
  dividerText: { color: 'white', paddingHorizontal: 10, fontWeight: 'bold' },
  gmailButton: { 
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.1)', 
    width: '100%', 
    padding: 15, 
    borderRadius: 30, 
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)'
  },
  gmailText: { color: 'white', fontWeight: 'bold' },
  footerText: { color: 'white', marginTop: 30, opacity: 0.8 },
  linkText: { color: '#53c0ff', fontWeight: 'bold' },
  forgotPass: { alignSelf: 'flex-end' },
  forgotText: { color: 'rgba(255,255,255,0.6)', fontSize: 12 },
});