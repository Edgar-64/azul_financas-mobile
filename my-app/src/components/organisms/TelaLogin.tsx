import React, { useState } from "react";
import {
  ImageBackground,
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity, // Importante para o clique
} from "react-native";
import Logo from "../atoms/Logo";
import { Link, useRouter } from "expo-router"; // Adicionei o useRouter aqui
import { LoginBut } from "../atoms/LoginBut";

export function TelaLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // 1. Inicializa o roteador
  const router = useRouter();

  // 2. Função que será chamada ao clicar
  const handleLogin = () => {
    // Aqui você pode colocar uma validação simples
    if (email !== "" && password !== "") {
      // 3. Navega para a tela de dashboard
      // Certifique-se de que o arquivo app/dashboard.tsx exista!
      router.replace("/dashboard"); 
    } else {
      alert("Por favor, preencha o email e a senha.");
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/images/Tela Splash.png")}
      style={styles.fixedBackground}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Logo />
          <Text style={styles.title}>Login</Text>

          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#555"
          />

          <TextInput
            style={styles.input}
            placeholder="Senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholderTextColor="#555"
          />

          {/* 4. Adicione o onPress aqui */}
          <TouchableOpacity onPress={handleLogin} activeOpacity={0.8}>
             <LoginBut>
                <Text style={styles.buttonText}>Entrar</Text>
             </LoginBut>
          </TouchableOpacity>

          <Text style={styles.footer}>
            Não tem uma conta?
            <Link href="/cadastro" style={styles.link}>
              {" "}
              Cadastre-se
            </Link>
          </Text>

          <Text style={styles.footer}>
            Esqueceu a senha?
            <Link href="/modal" style={styles.link}>
              {" "}
              Recuperar
            </Link>
          </Text>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
  fixedBackground: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
  link: {
    color: "#93e9ff",
    fontWeight: "bold",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
    color: "#53c0ff",
  },
  input: {
    backgroundColor: "#9cdbff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#000000",
    color: "#000", // Garante que o texto digitado apareça
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  footer: {
    marginTop: 15,
    textAlign: "center",
    color: "#adadad",
  },
});