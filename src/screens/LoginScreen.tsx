import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserLogin } from "../services/Users/post";

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Função unificada para tratar o login
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Aviso", "Preencha todos os campos!");
      return;
    }

    setLoading(true);

    try {
      const resposta = await UserLogin({ email, password });

      if (resposta && resposta.user && resposta.user.id) {
        const userId = resposta.user.id;

        // Salva o ID no AsyncStorage convertido para String
        await AsyncStorage.setItem("@user_id", String(userId));

        Alert.alert("Sucesso", "Login realizado com sucesso!");

        // Vai para a Home limpando o histórico de navegação
        navigation.replace("Home");
      } else {
        Alert.alert("Erro", "Erro ao processar dados de login do servidor.");
      }
    } catch (error: any) {
      console.error("Erro detectado:", error.message);
      Alert.alert("Erro", "E-mail ou senha incorretos. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  // Verifica se o usuário já está logado ao abrir o app
  useEffect(() => {
    const verificarLogin = async () => {
      try {
        const userId = await AsyncStorage.getItem("@user_id");
        if (userId !== null) {
          navigation.replace("Home");
        }
      } catch (error) {
        console.log("Erro ao ler o AsyncStorage", error);
      }
    };

    verificarLogin();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
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
          Pronto para organizar suas finanças? Acesse agora
        </Text>

        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <View style={styles.inputContainer}>
          <TextInput
            style={{ flex: 1, color: "#333" }}
            placeholder="Senha"
            secureTextEntry
            placeholderTextColor="#999"
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate("RecSenha")}
          disabled={loading}
        >
          <Text style={styles.linkRight}>Esqueceu sua senha?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnPrimary}
          onPress={handleLogin}
          activeOpacity={0.8}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.btnText}>Entrar</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Cadastro")}
          style={styles.footer}
          disabled={loading}
        >
          <Text style={styles.linkCenter}>
            Ainda não tem conta?{" "}
            <Text style={styles.boldText}>Cadastre-se!</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },
  header: { height: "35%", justifyContent: "center", alignItems: "center" },
  logo: { width: "80%", height: 150 },
  form: { flex: 1, paddingHorizontal: 30 },
  title: { fontSize: 14, fontWeight: "bold", color: "#000", marginBottom: 5 },
  subtitle: { color: "#666", fontSize: 13, marginBottom: 25 },
  input: {
    backgroundColor: "#F1F1F1",
    padding: 18,
    borderRadius: 12,
    marginBottom: 15,
    color: "#333",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F1F1",
    paddingHorizontal: 18,
    paddingVertical: 15,
    borderRadius: 12,
    marginBottom: 15,
  },
  linkRight: {
    textAlign: "right",
    color: "#666",
    marginBottom: 30,
    fontSize: 13,
  },
  btnPrimary: {
    backgroundColor: "#1D355E",
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
    elevation: 2,
    height: 58,
    justifyContent: "center",
  },
  btnText: { color: "#FFF", fontWeight: "bold", fontSize: 16 },
  footer: { marginTop: 30, paddingVertical: 10 },
  linkCenter: { textAlign: "center", color: "#666", fontSize: 14 },
  boldText: { fontWeight: "bold", color: "#1D355E" },
});
