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
  Alert,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from "@expo/vector-icons";
import { PayGet, UserLogin } from "../services/Users/post";
import { ContaGet } from "../services/Users/post";
import { UserGet } from "../services/Users/post";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ContaPost } from "../services/Users/post";

export default function HomeScreen({ navigation }: any) {
<<<<<<< HEAD
  // 1. Inicialize como array vazio para evitar erro de .map is not a function
  const [pay, setPay] = useState<any[]>([]);
  const [conta, setConta] = useState<any[]>([]);
  const [user, setUser] = useState<any[]>([]);
  const [userId, setuserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const handleLogin = async () => {
    const saldo = Number(0.01);
    const userId = Number(await AsyncStorage.getItem("@user_id"));

    // Evita que o usuário clique várias vezes enquanto a requisição viaja
    setLoading(true);

    try {
      const objetoParaEnvio = { saldo, userId };

      // O await trava a execução aqui. Se o servidor responder 401,
      // ele pula direto para o catch.
      const resposta = await ContaPost(objetoParaEnvio);
      alert("Conta criada, Porfavor reinicie o App");
      
    } catch (error: any) {
      // Aqui tratamos o erro 401 (Unauthorized)
      console.error("Erro detectado:", error.message);
      alert("Tente novamente.");
    } finally {
      setLoading(false); // Libera o botão novamente
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem("@user_id");
    navigation.replace("Login"); // Manda de volta para o Login
  };

  useEffect(() => {
    const buscarIdSalvo = async () => {
      try {
        const userId = await AsyncStorage.getItem("@user_id");
        const query = "";
        if (userId !== null) {
          setuserId(userId);
          const carregarDadosIniciais = async () => {
            setLoading(true);
            try {
              // Dispara as 3 chamadas ao mesmo tempo (mais rápido)
              const [resPay, resConta, resUser] = await Promise.all([
                PayGet(userId, query || ""),
                ContaGet(userId || ""),
                UserGet(userId || ""),
              ]);

              console.log("RESCONTA ORIGINAL:", resConta);

              setPay(Array.isArray(resPay) ? resPay : resPay.data || []);
              setUser(Array.isArray(resUser) ? resUser : resUser.data || []);
              if (Array.isArray(resConta)) {
                setConta(resConta);
              } else if (resConta && resConta.data) {
                // Se vier dentro de .data e for array, ou se for objeto envelopa num array
                setConta(
                  Array.isArray(resConta.data)
                    ? resConta.data
                    : [resConta.data],
                );
              } else if (resConta) {
                // Se o 'resConta' for o objeto direto da conta, envelopa ele em um array
                setConta([resConta]);
              } else {
                setConta([]);
              }
            } catch (error) {
              console.error("Erro ao carregar dados da Home:", error);
            } finally {
              setLoading(false);
            }
          };

          carregarDadosIniciais();
        }
      } catch (error) {
        console.error("Erro ao buscar o ID local", error);
=======
  const handleLogout = async () => {
  await AsyncStorage.removeItem('@user_id');
  navigation.replace("Login");
  };
  
  const [pay, setPay] = useState([]);
  const [conta, setConta] = useState([]);
  const [user, setUser] = useState([]);
  const [id, setId] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const carregarTudo = async () => {
    setLoading(true);
    try {
      const Uid = await AsyncStorage.getItem('@user_id');
      
      if (Uid) {
        setId(Uid);

        const [resPay, resConta, resUser] = await Promise.all([
          PayGet(Uid),
          ContaGet(Uid),
          UserGet(Uid),
        ]);
        setPay(Array.isArray(resPay) ? resPay : resPay.data || []);
        setConta(Array.isArray(resConta) ? resConta : resConta.data || []);
        setUser(Array.isArray(resUser) ? resUser : resUser.data || []);
>>>>>>> a39ec1c5be201af8a2a9b7efebb0c503ab940978
      }
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    } finally {
      setLoading(false);
    }
  };

<<<<<<< HEAD
    buscarIdSalvo();
  }, []);
=======
  carregarTudo();
}, []);
>>>>>>> a39ec1c5be201af8a2a9b7efebb0c503ab940978

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 130 }}
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

<<<<<<< HEAD
        <View style={styles.card}>
=======
        {/* SELETOR DE MESES */}
        <View style={styles.months}>
          {["MAR", "ABR", "MAI", "JUN", "JUL"].map((m, i) => (
            <TouchableOpacity key={i} style={styles.monthButton}>
              <Text style={[styles.month, m === "MAI" && styles.activeMonth]}>
                {m}
              </Text>
              {m === "MAI" && <View style={styles.activeIndicator} />}
            </TouchableOpacity>
          ))}
        </View>

        {/* CARD PRINCIPAL */}
        loading ? (
          <ActivityIndicator
            size="small"
            color="#1D355E"
            style={{ marginTop: 20 }}
          />
        ) : (
        conta
        .filter(c => String(c.userId) === String(id))
        .map((c, index) => (
        <View style={styles.card} key={c.contaId  || index}>
>>>>>>> a39ec1c5be201af8a2a9b7efebb0c503ab940978
          <View style={styles.cardHeader}>
            <Text style={styles.cardMonth}>MAIO / 2026</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Conta")}>
              <Ionicons name="settings-outline" size={20} color="#FFF" />
            </TouchableOpacity>
          </View>
<<<<<<< HEAD

          <Text style={styles.cardLabel}>Saldo disponível</Text>

          {loading ? (
            <ActivityIndicator
              size="small"
              color="#1D355E"
              style={{ marginTop: 20 }}
            />
          ) : conta && conta.length > 0 ? (
            conta.map((item, index) => (
              <View key={item.userId || item.idConta || index}>
                {/* Exibe o Saldo formatado */}
                <Text style={styles.cardValue}>
                  {typeof item.saldo === "number"
                    ? `R$ ${item.saldo.toFixed(2)}`
                    : item.saldo || "R$ 0,00"}
                </Text>
                <TouchableOpacity
                  style={styles.monthButton}
                  onPress={() =>
                    navigation.navigate("NovoLancamento", {
                      idConta: item.idConta,
                    })
                  }
                >
                  <Text style={{ color: "#FFF", fontWeight: "bold" }}>
                    Novo Pagamento
                  </Text>
                </TouchableOpacity>
              </View>
            ))
          ) : (
            /* Caso a API retorne um array vazio [] */
=======
          <Text style={styles.cardLabel}>Orçamento disponível</Text>
          <Text style={styles.cardValue}>{c.saldo}</Text>
          <View style={styles.progressBar}>
            <View style={styles.progress} />
          </View>
          <View style={styles.rowInfo}>
>>>>>>> a39ec1c5be201af8a2a9b7efebb0c503ab940978
            <View>
              <Text style={styles.cardValue}>R$ 0,00</Text>
              <Text style={{ color: "rgba(255, 255, 255, 0.7)", fontSize: 12 }}>
                Nenhuma conta vinculada. 
                <TouchableOpacity onPress={handleLogin}>
                  <Text> Faça já a sua!</Text>
                </TouchableOpacity>
              </Text>
            </View>
          )}

          {/*<View style={styles.rowInfo}>
            <View style={{ alignItems: "flex-end" }}>
              <Text style={styles.infoLabel}>Limite</Text>
              {loading ? (
                <ActivityIndicator
                  size="small"
                  color="#1D355E"
                  style={{ marginTop: 20 }}
                />
              ) : caixa && caixa.length > 0 ? (
                caixa.map((caixa, index) => (
                  <View key={caixa.userId || caixa.idCaixa || index}>
                    {/* Exibe o Saldo formatado 
                    <Text style={styles.infoValue}>
                      {typeof caixa.valorMove === "number"
                        ? `R$ ${caixa.valorMove.toFixed(2)}`
                        : caixa.valorMove || "R$ 0,00"}
                    </Text>
                  </View>
                ))
              ) : (
                /* Caso a API retorne um array vazio [] 
                <View>
                  <Text style={styles.cardValue}>R$ 0,00</Text>
                  <Text
                    style={{ color: "rgba(255, 255, 255, 0.7)", fontSize: 12 }}
                  >
                    Nenhuma conta vinculada
                  </Text>
                </View>
              )}
            </View>
          </View>*/}
        </View>
<<<<<<< HEAD
=======
        ))
        )}
>>>>>>> a39ec1c5be201af8a2a9b7efebb0c503ab940978

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
          pay.map((p, index) => (
            <View key={p.id || index} style={styles.item}>
              <View style={styles.iconBox}>
                <Ionicons name="cash-outline" size={20} color="#1D355E" />
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.itemName}>
                  {p.descricaoLaunch || "Sem descrição"}
                </Text>
                <Text style={styles.itemDate}>ID Usuário: {p.userId}</Text>
                <Text style={styles.itemDate}>{p.data}</Text>
              </View>

              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={[styles.itemValue, { color: "#DC2626" }]}>
                  R$ {p.valor || "0,00"}
                </Text>
              </View>
            </View>
          ))
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
    backgroundColor: "#1D355E", // Alterado para o azul do tema
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
  progressBar: {
    height: 6,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 5,
    overflow: "hidden",
    marginTop: 10,
  },
  progress: {
    width: "65%",
    height: "100%",
    backgroundColor: "#FFF",
  },
  rowInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  infoLabel: { color: "#CCC", fontSize: 11, textTransform: "uppercase" },
  infoValue: { color: "#FFF", fontWeight: "bold", fontSize: 14, marginTop: 2 },
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
