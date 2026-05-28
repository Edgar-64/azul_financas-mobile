import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import {
  PayGet,
  ContaGet,
  UserGet,
  ContaPost,
  PayDelete,
} from "../services/Users/post";
import { useAutoReload } from "../services/useFetch";

export default function HomeScreen({ navigation }: any) {
  const [pay, setPay] = useState<any[]>([]);
  const [conta, setConta] = useState<any[]>([]);
  const [user, setUser] = useState<any[]>([]);
  const [id, setId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  

  // Função para criar conta quando o usuário não tiver uma
  const handleCreateAccount = async () => {
    if (!id) return;
    const saldo = Number(0.01);
    const userId = Number(id);

    setLoading(true);
    try {
      const objetoParaEnvio = { saldo, userId };
      await ContaPost(objetoParaEnvio);
      alert("Conta criada com sucesso! Por favor, reinicie o aplicativo.");
    } catch (error: any) {
      console.error("Erro ao criar conta:", error.message);
      alert("Não foi possível criar a conta. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };
//
  const recarregarDados = async () => {
    try {
      const Uid = await AsyncStorage.getItem("@user_id");
      const query = "";
      if (Uid) {
        const [resPay, resConta] = await Promise.all([
          PayGet(Uid, query).catch(() => []),
          ContaGet(Uid).catch(() => []),
        ]);
        setPay(Array.isArray(resPay) ? resPay : resPay?.data || []);

        if (resConta && Array.isArray(resConta)) setConta(resConta);
        else if (resConta && resConta.data)
          setConta(
            Array.isArray(resConta.data) ? resConta.data : [resConta.data],
          );
        else if (resConta) setConta([resConta]);
        else setConta([]);
      }
    } catch (error) {
      console.error("Erro ao recarregar dados:", error);
    }
  };
  
  const { refreshing, onRefresh } = useAutoReload(recarregarDados);

  // Função de deletar atualizada recebendo o ID do lançamento
  const handleDelete = async (idLancamento: string | number) => {
    if (!idLancamento) return;

    setLoading(true);
    try {
      await PayDelete(idLancamento);
      alert("Lançamento deletado com sucesso!");

      // Recarrega os lançamentos e atualiza o saldo da conta na tela
      await recarregarDados();
    } catch (error: any) {
      console.error("Erro ao deletar lançamento:", error.message);
      alert("Não foi possível deletar o lançamento. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  // ... Mantém seu useEffect original e a função obterDataAtual

  const handleLogout = async () => {
    await AsyncStorage.removeItem("@user_id");
    navigation.replace("Login");
  };

  useEffect(() => {
    const carregarTudo = async () => {
      setLoading(true);
      try {
        const Uid = await AsyncStorage.getItem("@user_id");
        const query = "";

        if (Uid) {
          setId(Uid);

          // O catch individual impede que um erro 404/500 na rota de conta quebre o app inteiro
          const [resPay, resConta, resUser] = await Promise.all([
            PayGet(Uid, query).catch(() => []),
            ContaGet(Uid).catch(() => []),
            UserGet(Uid).catch(() => []),
          ]);

          setPay(Array.isArray(resPay) ? resPay : resPay?.data || []);
          setUser(Array.isArray(resUser) ? resUser : resUser?.data || []);

          // Garante a conversão correta da conta em estrutura de Array legível
          if (resConta && Array.isArray(resConta)) {
            setConta(resConta);
          } else if (resConta && resConta.data) {
            setConta(
              Array.isArray(resConta.data) ? resConta.data : [resConta.data],
            );
          } else if (resConta) {
            setConta([resConta]);
          } else {
            setConta([]);
          }
        }
      } catch (error) {
        console.error("Erro geral ao carregar dados:", error);
        setConta([]);
      } finally {
        setLoading(false);
      }
    };

    carregarTudo();
  }, []);

  const obterDataAtual = () => {
    const hoje = new Date();

    // Opção 1: Formato padrão brasileiro (DD/MM/AAAA) -> "21/05/2026"
    // return hoje.toLocaleDateString("pt-BR");

    // Opção 2: Formato do seu App (MÊS / ANO) -> "MAIO / 2026"
    const meses = [
      "JANEIRO",
      "FEVEREIRO",
      "MARÇO",
      "ABRIL",
      "MAIO",
      "JUNHO",
      "JULHO",
      "AGOSTO",
      "SETEMBRO",
      "OUTUBRO",
      "NOVEMBRO",
      "DEZEMBRO",
    ];

    const mesAtual = meses[hoje.getMonth()];
    const anoAtual = hoje.getFullYear();

    return `${mesAtual} / ${anoAtual}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 130 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        {/* HEADER */}
        <View style={styles.header}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Ionicons name="menu" size={28} color="#333" />
            </TouchableOpacity>
            <View style={{ marginLeft: 15 }}>
              <Text style={styles.title}>AZUL FINANÇAS</Text>
            </View>
          </View>

          <TouchableOpacity onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        <Text style={styles.subtitle}>Vamos organizar suas finanças?</Text>

        {/* CARD PRINCIPAL (CORRIGIDO) */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardMonth}>{obterDataAtual()}</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Conta")}>
              <Ionicons name="settings-outline" size={20} color="#FFF" />
            </TouchableOpacity>
          </View>

          {loading ? (
            <ActivityIndicator
              size="small"
              color="#FFF"
              style={{ marginTop: 20 }}
            />
          ) : conta && conta.length > 0 ? (
            // Se o usuário tem conta cadastrada, mapeia os dados dela aqui
            conta.map((item, index) => (
              <View key={item.idConta || index}>
                <Text style={styles.cardLabel}>Saldo disponível</Text>
                {item.saldo >= 0 ? (
                  <Text style={styles.cardValue}>
                    {typeof item.saldo === "number"
                      ? `R$ ${item.saldo.toFixed(2)}`
                      : item.saldo || "R$ 0,00"}
                  </Text>
                ) : (
                  <Text style={styles.cardValueNegative}>
                    {typeof item.saldo === "number"
                      ? `R$ ${item.saldo.toFixed(2)}`
                      : item.saldo || "R$ 0,00"}
                  </Text>
                )}
                <TouchableOpacity
                  style={[styles.actionButton, { marginTop: 10 }]}
                  onPress={() =>
                    navigation.navigate("NovoLancamento", {
                      idConta: item.idConta,
                    })
                  }
                >
                  <Text style={{ color: "#1D355E", fontWeight: "bold" }}>
                    Novo Pagamento
                  </Text>
                </TouchableOpacity>
              </View>
            ))
          ) : (
            // SE O ARRAY DE CONTA ESTIVER VAZIO, EXIBE O BOTÃO DE CRIAR AQUI
            <View style={{ alignItems: "center", marginTop: 15 }}>
              <Text style={styles.cardLabel}>Saldo disponível</Text>
              <Text style={styles.cardValue}>R$ 0,00</Text>
              <Text
                style={{
                  color: "rgba(255, 255, 255, 0.7)",
                  fontSize: 13,
                  marginBottom: 15,
                  textAlign: "center",
                }}
              >
                Você ainda não possui uma conta vinculada a este perfil.
              </Text>
              <TouchableOpacity
                onPress={handleCreateAccount}
                style={styles.actionButton}
              >
                <Text
                  style={{ color: "#1D355E", fontWeight: "bold", fontSize: 14 }}
                >
                  Criar minha conta agora
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* SEÇÃO DE LANÇAMENTOS */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>LANÇAMENTOS</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{pay.length}</Text>
          </View>
        </View>

        {loading ? (
          <ActivityIndicator
            size="small"
            color="#1D355E"
            style={{ marginTop: 20 }}
          />
        ) : (
          pay.map((p, index) => {
            // Captura o ID correto do lançamento retornado pelo seu Back-end
            const lancamentoId = p.id || p.idPay || p.idLaunch;

            return (
              <View key={lancamentoId || index} style={styles.item}>
                <View style={styles.iconBox}>
                  <Ionicons name="cash-outline" size={20} color="#1D355E" />
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={styles.itemName}>
                    {p.descricaoLaunch || "Sem descrição"}
                  </Text>
                  <Text style={styles.itemDate}>{p.data}</Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginRight: 10,
                  }}
                >
                  <Text
                    style={[
                      styles.itemValue,
                      {
                        color: p.tipoLaunch === "SAIDA" ? "#DC2626" : "#0da519",
                      },
                    ]}
                  >
                    R$ {p.valor || "0,00"}
                  </Text>
                </View>

                {/* BOTÃO DE DELETAR ATUALIZADO */}
                <TouchableOpacity
                  onPress={() => handleDelete(lancamentoId)}
                  style={styles.deleteButton}
                >
                  <Ionicons name="trash-outline" size={20} color="#DC2626" />
                </TouchableOpacity>
              </View>
            );
          })
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F6F8" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 10,
  },
  deleteButton: {
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 10,
  },
  title: { fontWeight: "bold", fontSize: 18, color: "#333" },
  subtitle: {
    marginHorizontal: 20,
    color: "#777",
    fontSize: 14,
    marginBottom: 15,
  },
  months: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  monthButton: { alignItems: "center" },
  month: { color: "#AAA", fontWeight: "600", fontSize: 13 },
  activeMonth: { color: "#1D355E", fontWeight: "bold" },
  activeIndicator: {
    height: 3,
    width: 15,
    backgroundColor: "#1D355E",
    marginTop: 4,
    borderRadius: 2,
  },
  card: {
    backgroundColor: "#1D355E",
    marginHorizontal: 20,
    borderRadius: 25,
    padding: 25,
    elevation: 8,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardMonth: { color: "#FFF", fontSize: 12, opacity: 0.8 },
  cardLabel: { color: "#CCC", marginTop: 15, fontSize: 13 },
  cardValue: {
    color: "#FFF",
    fontSize: 32,
    fontWeight: "bold",
    marginVertical: 10,
  },
  cardValueNegative: {
    color: "#b11b1b",
    fontSize: 32,
    fontWeight: "bold",
    marginVertical: 10,
  },
  actionButton: {
    backgroundColor: "#FFF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  sectionHeader: {
    flexDirection: "row",
    paddingHorizontal: 20,
    alignItems: "center",
    marginTop: 25,
    marginBottom: 10,
  },
  sectionTitle: { fontWeight: "bold", color: "#333", fontSize: 15 },
  badge: {
    backgroundColor: "#E2E8F0",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginLeft: 10,
  },
  badgeText: { fontSize: 12, color: "#64748B", fontWeight: "bold" },
  item: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    backgroundColor: "#FFF",
    padding: 16,
    borderRadius: 18,
    marginTop: 12,
    elevation: 2,
  },
  iconBox: {
    width: 44,
    height: 44,
    backgroundColor: "#F1F5F9",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  itemName: { fontWeight: "bold", fontSize: 15, color: "#333" },
  itemDate: { fontSize: 12, color: "#94A3B8", marginTop: 2 },
  itemValue: { fontWeight: "bold", fontSize: 15 },
});
