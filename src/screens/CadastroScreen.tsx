import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  Alert,
  Platform,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { UserCadastro } from "../services/Users/post";

export default function CadastroScreen({ navigation }: any) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [senha, setSenha] = useState(""); // Campo de confirmação
  const [loading, setLoading] = useState(false);

async function cadastrar() {
  if (!name || !email || !password || !senha) {
    Alert.alert("Aviso", "Por favor, preencha todos os campos!");
    return;
  }

  if (password !== senha) {
    Alert.alert("Erro", "As senhas não coincidem. Tente novamente.");
    return;
  }

  setLoading(true);

  try {
    const objetoParaEnvio = { name, email, password };
    await UserCadastro(objetoParaEnvio);

    // CORREÇÃO AQUI: Verifica se está rodando no Navegador ou no Celular
    if (Platform.OS === "web") {
      // No navegador usamos o alert padrão do ecossistema web
      window.alert("Cadastro realizado com sucesso!");
      navigation.replace("Login");
    } else {
      // No celular (Android/iOS) usamos o Alert nativo do React Native
      Alert.alert(
        "Sucesso", 
        "Cadastro realizado com sucesso!",
        [{ text: "OK", onPress: () => navigation.replace("Login") }],
        { cancelable: false }
      );
    }

  } catch (error: any) {
    console.error("Erro no cadastro:", error);
    
    if (Platform.OS === "web") {
      window.alert("Falha no cadastro. Verifique seus dados.");
    } else {
      Alert.alert("Erro", "Falha no cadastro. Verifique seus dados.");
    }
  } finally {
    setLoading(false);
  }
}

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={styles.header}>
          <Image
            source={require("../assets/logo2.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <View style={styles.form}>
          <Text style={styles.title}>BOAS VINDAS!</Text>
          <Text style={styles.subtitle}>
            Pronto para organizar suas finanças? Cadastre-se
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Nome"
            placeholderTextColor="#999"
            value={name}
            onChangeText={setName}
            editable={!loading}
          />
          <TextInput
            style={styles.input}
            placeholder="E-mail"
            placeholderTextColor="#999"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
            editable={!loading}
          />

          <View style={styles.inputContainer}>
            <TextInput
              style={{ flex: 1, color: "#333" }}
              placeholder="Senha"
              secureTextEntry
              placeholderTextColor="#999"
              value={password}
              onChangeText={setPassword}
              editable={!loading}
            />
            <Ionicons name="eye-off-outline" size={20} color="#666" />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={{ flex: 1, color: "#333" }}
              placeholder="Confirme sua Senha"
              secureTextEntry
              placeholderTextColor="#999"
              value={senha}
              onChangeText={setSenha}
              editable={!loading}
            />
            <Ionicons name="eye-off-outline" size={20} color="#666" />
          </View>

          <TouchableOpacity
            style={styles.btnPrimary}
            onPress={cadastrar}
            activeOpacity={0.8}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Text style={styles.btnText}>Cadastre-se</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("Login")}
            style={styles.footer}
            disabled={loading}
          >
            <Text style={styles.linkCenter}>
              Já tem conta? <Text style={styles.boldText}>Faça Login</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },
  header: { height: 220, justifyContent: "center", alignItems: "center" },
  logo: { width: "80%", height: 140 },
  form: { paddingHorizontal: 30, paddingBottom: 40 },
  title: { fontSize: 14, fontWeight: "bold", color: "#000" },
  subtitle: { color: "#666", fontSize: 13, marginBottom: 20 },
  input: {
    backgroundColor: "#F1F1F1",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    color: "#333",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F1F1",
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  btnPrimary: {
    backgroundColor: "#1D355E",
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
    height: 58,
    justifyContent: "center",
  },
  btnText: { color: "#FFF", fontWeight: "bold", fontSize: 16 },
  footer: { marginTop: 25, paddingVertical: 10 },
  linkCenter: { textAlign: "center", color: "#666" },
  boldText: { fontWeight: "bold", color: "#1D355E" },
});
