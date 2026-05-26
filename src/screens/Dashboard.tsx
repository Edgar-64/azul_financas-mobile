import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Alert,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ServiceGet } from "../services/Users/post";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAutoReload } from "../services/useFetch";

export default function DashboardScreen({ navigation }: any) {
  const [services, setService] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // FUNÇÃO PARA ADQUIRIR
  const handleAdquirir = (nomePlano: string) => {
    Alert.alert("Sucesso!", `Você adquiriu o plano ${nomePlano}. Bem-vindo!`, [
      { text: "OK", onPress: () => navigation.navigate("Home") },
    ]);
  };

  // FUNÇÃO PARA SAIR (Resetando a pilha para o Login)
  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  const recarregarDadosPerfil = async () => {
    try {
      const Uid = await AsyncStorage.getItem("@user_id");

      if (Uid) {
        // Busca os dados em paralelo sem deixar uma rota travar a outra
        const [resService] = await Promise.all([
          ServiceGet(Number(Uid)).catch(() => []),
        ]);

        // Tratamento dos dados das Caixinhas (Garante que seja um Array)
        setService(
          Array.isArray(resService) ? resService : resService?.data || [],
        );
      }
    } catch (error) {
      console.error("Erro ao carregar dados do Perfil:", error);
    } finally {
      setLoading(false);
    }
  };

  // Aplicação da função coringa para atualizar quando o usuário entrar na tela
  const { refreshing, onRefresh } = useAutoReload(recarregarDadosPerfil);

  // Carregamento inicial da página
  useEffect(() => {
    setLoading(true);
    recarregarDadosPerfil();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>

        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>PLANOS</Text>
          <Text style={styles.headerSubtitle}>
            Escolha um plano que seja melhor para você!
          </Text>
        </View>

        <TouchableOpacity onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Text style={styles.mainTitle}>Conheça Nossos Planos...</Text>

        {loading ? (
                    <ActivityIndicator
                      size="small"
                      color="#FFF"
                      style={{ marginTop: 20 }}
                    />
                  ) : services && services.length > 0 ? (
                  services.map((item) => (
          <View key={item.id} style={styles.card}>
            <View style={styles.blueDetail} />

            <Text style={styles.planName}>{item.nameServ}</Text>

            <View style={styles.infoRow}>
              <View>
                <Text style={styles.label}>Investimento</Text>
                <Text style={styles.value}>{item.preco}</Text>
              </View>
              <View style={{ alignItems: "flex-end" }}>
                <Text style={styles.label}>{item.beneficios}</Text>
              </View>
            </View>

            {/* BOTÃO COM AÇÃO */}
            <TouchableOpacity
              style={styles.buttonAdquirir}
              onPress={() => handleAdquirir(item.nameServ)}
            >
              <Text style={styles.buttonText}>Adquirir</Text>
            </TouchableOpacity>
          </View>
          ))
        ) : (
          <View/>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F6F8" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  headerTitleContainer: { alignItems: "center" },
  headerTitle: { fontSize: 14, fontWeight: "bold", color: "#000" },
  headerSubtitle: { fontSize: 11, color: "#777" },
  mainTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111",
    marginHorizontal: 25,
    marginTop: 20,
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#1C1C1E",
    marginHorizontal: 20,
    marginTop: 15,
    borderRadius: 15,
    padding: 20,
    overflow: "hidden",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  blueDetail: {
    position: "absolute",
    top: 0,
    right: 0,
    width: "45%",
    height: 15,
    backgroundColor: "#2D5AA0",
    borderBottomLeftRadius: 15,
  },
  planName: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  label: { color: "#777", fontSize: 11, marginBottom: 5 },
  value: { color: "#FFF", fontSize: 14, fontWeight: "600" },
  buttonAdquirir: {
    borderWidth: 1,
    borderColor: "#2D5AA0",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    backgroundColor: "rgba(45, 90, 160, 0.1)",
  },
  buttonText: { color: "#4A90E2", fontWeight: "bold", fontSize: 15 },
});
