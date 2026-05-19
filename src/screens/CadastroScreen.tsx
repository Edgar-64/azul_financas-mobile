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
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { UserCadastro } from "../services/Users/post";

export default function CadastroScreen({ navigation }: any) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [senha, setSenha] = useState("");
  const [email, setEmail] = useState("");

  async function cadastrar() {
    try {
<<<<<<< HEAD
      // Montamos o objeto e enviamos para a função do outro arquivo
      const objetoParaEnvio = { name, email, password };
      const resultado = await UserCadastro(objetoParaEnvio);

      alert("Cadastro realizado com sucesso");
      navigation.navigate("Login");
    } catch (error) {
      alert("Falha no login. Verifique seus dados ou o servidor.");
      console.error(error);
=======
      const dados = await UserCadastro({
        name,
        email,
        password
      });
      console.log(dados);
      
    navigation.navigate("Login");
    console.log(userId);
    } catch(error){
      Alert.alert("Erro", "E-mail ou senha inválidos");
>>>>>>> a39ec1c5be201af8a2a9b7efebb0c503ab940978
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
          />
          <TextInput
            style={styles.input}
            placeholder="E-mail"
            placeholderTextColor="#999"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />

          <View style={styles.inputContainer}>
            <TextInput
              style={{ flex: 1 }}
              placeholder="Senha"
              secureTextEntry
              placeholderTextColor="#999"
              value={password}
              onChangeText={setPassword}
            />
            <Ionicons name="eye-off-outline" size={20} color="#666" />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={{ flex: 1 }}
              placeholder="Confirme sua Senha"
              secureTextEntry
              placeholderTextColor="#999"
              value={senha}
              onChangeText={setSenha}
            />
            <Ionicons name="eye-off-outline" size={20} color="#666" />
          </View>

          {/* Botão Cadastrar - Nome da rota: Home */}
          <TouchableOpacity
            style={styles.btnPrimary}
            onPress={(cadastrar)}
            activeOpacity={0.8}
          >
            <Text style={styles.btnText}>Cadastre-se</Text>
          </TouchableOpacity>

          {/* Botão Voltar - Nome da rota: Login */}
          <TouchableOpacity
            onPress={() => navigation.navigate("Login")}
            style={styles.footer}
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
  },
  btnText: { color: "#FFF", fontWeight: "bold", fontSize: 16 },
  footer: { marginTop: 25, paddingVertical: 10 },
  linkCenter: { textAlign: "center", color: "#666" },
  boldText: { fontWeight: "bold", color: "#1D355E" },
});
