import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { PayPostPagar, PayPostReceber } from "../services/Users/post";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function NovoLancamentoScreen({ route, navigation }: any) {
  const [descricaoLaunch, setDescricaoLaunch] = useState("");
  const [tipoLaunch, setTipoLaunch] = useState<"ENTRADA" | "SAIDA" | null>(
    null,
  ); // Categoria
  const [valor, setValor] = useState("");

  const [loading, setLoading] = useState(false);

  const { idConta } = route.params;

  // Função responsável por processar o envio correto baseado na escolha do usuário
  const handleSalvar = async () => {
    if (!descricaoLaunch || !tipoLaunch || !valor || !tipoLaunch) {
      Alert.alert(
        "Atenção",
        "Por favor, preencha todos os campos e selecione Entrada ou Saída.",
      );
      return;
    }

    const userId = await AsyncStorage.getItem("@user_id");
    if (!userId) {
      Alert.alert("Erro", "Usuário não identificado. Faça login novamente.");
      return;
    }

    setLoading(true);

    const objetoParaEnvio = {
      contaId: Number(idConta),
      descricaoLaunch,
      statusLaunch: "PROCESSANDO",
      tipoLaunch, // Categoria já tratada em UPPERCASE pelo TextInput
      userId: Number(userId),
      valor: Number(valor.replace(",", ".")), // Garante o formato float correto
    };

    try {
      if (tipoLaunch === "ENTRADA") {
        // Se for Entrada, usa a API de Receber dinheiro
        await PayPostReceber(objetoParaEnvio);
        Alert.alert("Sucesso", "Entrada registrada com sucesso!");
      } else {
        // Se for Saída, usa a API de Pagar
        await PayPostPagar(objetoParaEnvio);
        Alert.alert("Sucesso", "Pagamento efetuado com sucesso!");
      }

      navigation.goBack(); // Fecha o modal e volta para a Home atualizada
    } catch (error: any) {
      console.error("Erro detectado ao lançar:", error.message);
      Alert.alert(
        "Erro",
        "Não foi possível concluir a transação. Tente novamente.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.overlay}>
      {/* FUNDO CLICÁVEL PRA FECHAR */}
      <TouchableOpacity
        style={{ flex: 1 }}
        onPress={() => navigation.goBack()}
        activeOpacity={1}
      />

      {/* MODAL */}
      <View style={styles.modal}>
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.title}>NOVO LANÇAMENTO</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="close" size={22} color="#333" />
          </TouchableOpacity>
        </View>

        {/* INPUTS */}
        <TextInput
          placeholder="Título da transação"
          style={styles.input}
          value={descricaoLaunch}
          onChangeText={setDescricaoLaunch}
          editable={!loading}
        />

        <TextInput
          placeholder="Valor (R$ 0,00)"
          style={styles.input}
          value={valor}
          keyboardType="numeric"
          onChangeText={setValor}
          editable={!loading}
        />

        {/* SELEÇÃO: ENTRADA OU SAÍDA */}
        <View style={styles.row}>
          <TouchableOpacity
            style={[
              styles.entrada,
              tipoLaunch === "ENTRADA" && styles.entradaAtiva,
            ]}
            onPress={() => setTipoLaunch("ENTRADA")}
            disabled={loading}
          >
            <Text
              style={[
                styles.txtEntrada,
                tipoLaunch === "ENTRADA" && styles.txtAtivo,
              ]}
            >
              Entrada ▲
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.saida,
              tipoLaunch === "SAIDA" && styles.saidaAtiva,
            ]}
            onPress={() => setTipoLaunch("SAIDA")}
            disabled={loading}
          >
            <Text
              style={[
                styles.txtSaida,
                tipoLaunch === "SAIDA" && styles.txtAtivo,
              ]}
            >
              Saída ▼
            </Text>
          </TouchableOpacity>
        </View>

        {/* DIVIDER */}
        <View style={styles.divider} />

        {/* BOTÃO SALVAR INTEGRADO */}
        <TouchableOpacity
          style={[styles.btnSalvar, loading && { opacity: 0.7 }]}
          onPress={handleSalvar}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFF" size="small" />
          ) : (
            <Text style={styles.textSalvar}>Salvar Lançamento</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modal: {
    backgroundColor: "#FFF",
    padding: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  input: {
    backgroundColor: "#F1F3F5",
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
    fontSize: 15,
    color: "#333",
  },
  row: {
    flexDirection: "row",
    marginTop: 5,
  },
  entrada: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: "#16A34A",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginRight: 6,
    backgroundColor: "transparent",
  },
  entradaAtiva: {
    backgroundColor: "#16A34A",
  },
  saida: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: "#DC2626",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginLeft: 6,
    backgroundColor: "transparent",
  },
  saidaAtiva: {
    backgroundColor: "#DC2626",
  },
  txtEntrada: { color: "#16A34A", fontWeight: "bold" },
  txtSaida: { color: "#DC2626", fontWeight: "bold" },
  txtAtivo: { color: "#FFF" },
  divider: {
    height: 1,
    backgroundColor: "#EEE",
    marginVertical: 20,
  },
  btnSalvar: {
    backgroundColor: "#1D355E",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    height: 52,
    justifyContent: "center",
  },
  textSalvar: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});
