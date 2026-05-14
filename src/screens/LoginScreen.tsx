import React, { use, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { UserLogin } from "../services/Users/post";

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Preencha todos os campos!");
      return;
    }
    
    // Adicione um estado de loading no topo do componente:
// const [loading, setLoading] = useState(false);

const handleLogin = async () => {
  if (!email || !password) {
    alert("Preencha todos os campos!");
    return;
  }

  // Evita que o usuário clique várias vezes enquanto a requisição viaja
  setLoading(true); 

  try {
    const objetoParaEnvio = { email, password };
    
    // O await trava a execução aqui. Se o servidor responder 401, 
    // ele pula direto para o catch.
    const resultado = await UserLogin(objetoParaEnvio);

    // Se chegou aqui, o resultado é positivo (200 OK)
    alert("Login realizado com sucesso!");
    
    // IMPORTANTE: Use replace para que o usuário não consiga "voltar" para o login
    navigation.replace("Home");

  } catch (error: any) {
    // Aqui tratamos o erro 401 (Unauthorized)
    console.error("Erro detectado:", error.message);
    alert("E-mail ou senha incorretos. Tente novamente.");
  } finally {
    setLoading(false); // Libera o botão novamente
  }
};

    try {
      const objetoParaEnvio = { email, password };

      // ADICIONADO O AWAIT: Agora o código para aqui até o servidor responder
      const resultado = await UserLogin(objetoParaEnvio);

      // Se o servidor retornar erro (401, 500, etc), o 'post.ts' vai lançar um erro
      // e o código pulará direto para o 'catch', impedindo o código abaixo:

      alert("Login realizado com sucesso");
      navigation.replace("Home");
    } catch (error: any) {
      // Aqui tratamos o erro 401 que você estava recebendo
      console.error("Erro no login:", error);
      alert(error.message || "Falha no login. Verifique seus dados.");
    }
  };

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
            style={{ flex: 1, color: "#333" }} // Adicionado cor para visibilidade
            placeholder="Senha"
            secureTextEntry
            placeholderTextColor="#999"
            value={password}
            onChangeText={setPassword}
          />
          <Ionicons name="eye-off-outline" size={20} color="#666" />
        </View>

        {/* Link para Recuperar Senha - Nome da rota: RecSenha */}
        <TouchableOpacity onPress={() => navigation.navigate("RecSenha")}>
          <Text style={styles.linkRight}>Esqueceu sua senha?</Text>
        </TouchableOpacity>

        {/* Botão Entrar - Nome da rota: Home */}
        <TouchableOpacity
          style={styles.btnPrimary}
          onPress={handleLogin}
          activeOpacity={0.8}
        >
          <Text style={styles.btnText}>Entrar</Text>
        </TouchableOpacity>

        {/* Link para Cadastro - Nome da rota: Cadastro */}
        <TouchableOpacity
          onPress={() => navigation.navigate("Cadastro")}
          style={styles.footer}
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
  },
  btnText: { color: "#FFF", fontWeight: "bold", fontSize: 16 },
  footer: { marginTop: 30, paddingVertical: 10 },
  linkCenter: { textAlign: "center", color: "#666", fontSize: 14 },
  boldText: { fontWeight: "bold", color: "#1D355E" },
});
