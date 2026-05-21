import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
// IMPORTANTE: Substitua pelo caminho e nome correto da sua função de POST de conta
import { ContaPost } from "../services/Users/post"; 

export default function ContaScreen({ navigation }: any) {
  const [banco, setBanco] = useState(""); // Nome do banco/instituição
  const [saldoInicial, setSaldoInicial] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCriarConta = async () => {
    // Validação básica dos campos
    if (!banco || !saldoInicial) {
      Alert.alert("Atenção", "Por favor, preencha todos os campos.");
      return;
    }

    const userId = await AsyncStorage.getItem("@user_id");
    if (!userId) {
      Alert.alert("Erro", "Usuário não identificado. Faça login novamente.");
      return;
    }

    setLoading(true);

    // Monta o objeto no padrão que o seu backend costuma receber (convertendo os tipos)
    const objetoParaEnvio = {
      userId: Number(userId),
      banco: banco, // Vai em UPPERCASE devido ao TextInput
      saldo: Number(saldoInicial.replace(",", ".")), // Garante o formato float/decimal
    };

    try {
      // Executa a chamada para a API
      await ContaPost(objetoParaEnvio);
      
      Alert.alert("Sucesso", "Nova conta vinculada com sucesso!");
      navigation.goBack(); // Volta para a tela anterior (Home)
    } catch (error: any) {
      console.error("Erro ao criar conta:", error.message);
      Alert.alert("Erro", "Não foi possível criar a conta. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* HEADER DA TELA */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>ADICIONAR CONTA</Text>
        <View style={{ width: 24 }} /> {/* Espaçador para centralizar o título */}
      </View>

      <View style={styles.content}>
        <Text style={styles.subtitle}>
          Insira os dados abaixo para começar a monitorar seu saldo.
        </Text>

        {/* INPUTS */}
        <Text style={styles.label}>Instituição / Banco</Text>
        <TextInput
          placeholder="Ex: ITAÚ, NUBANK, CARTEIRA"
          style={styles.input}
          value={banco}
          autoCapitalize="characters" // Força o teclado a abrir em Caps Lock
          onChangeText={(text) => setBanco(text.toUpperCase())} // Garante a caixa alta no estado
          editable={!loading}
        />

        <Text style={styles.label}>Saldo Inicial</Text>
        <TextInput
          placeholder="R$ 0,00"
          style={styles.input}
          value={saldoInicial}
          keyboardType="numeric"
          onChangeText={setSaldoInicial}
          editable={!loading}
        />

        {/* BOTÃO SALVAR */}
        <TouchableOpacity
          style={[styles.btnSalvar, loading && { opacity: 0.7 }]}
          onPress={handleCriarConta}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFF" size="small" />
          ) : (
            <Text style={styles.textSalvar}>Cadastrar Conta</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F6F8",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: "#FFF",
    elevation: 2,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  subtitle: {
    color: "#777",
    fontSize: 14,
    marginBottom: 25,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#1D355E",
    marginBottom: 6,
    textTransform: "uppercase",
  },
  input: {
    backgroundColor: "#FFF",
    padding: 14,
    borderRadius: 10,
    marginBottom: 20,
    fontSize: 15,
    color: "#333",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  btnSalvar: {
    backgroundColor: "#1D355E", // Azul padrão do seu tema
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    height: 52,
    justifyContent: "center",
    marginTop: 10,
    elevation: 4,
  },
  textSalvar: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});