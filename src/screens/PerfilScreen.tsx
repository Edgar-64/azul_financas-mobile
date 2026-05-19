import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserGet, CaixaGet } from "../services/Users/post";

export default function PerfilScreen() {
  const [user, setUser] = useState<any>(null);
  const [caixa, setCaixa] = useState<any[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<any>();

  const handleVerMais = () => {
    console.log("Botão Ver Mais clicado!");
    navigation.navigate("Caixinhas");
  };

  useEffect(() => {
    const buscarIdSalvo = async () => {
      try {
        const idSalvo = await AsyncStorage.getItem("@user_id");

        if (idSalvo !== null) {
          setUserId(idSalvo);
          setLoading(true);

          try {
            // Dispara as chamadas da API em paralelo
            const [resUser, resCaixa] = await Promise.all([
              UserGet(idSalvo),
              CaixaGet(idSalvo),
            ]);

            const dadosUsuario = resUser?.data ? resUser.data : resUser;
            setUser(dadosUsuario);
            setCaixa(Array.isArray(resCaixa) ? resCaixa : resCaixa?.data || []);
          } catch (error) {
            console.error("Erro ao carregar dados da Home:", error);
          } finally {
            setLoading(false);
          }
        }
      } catch (error) {
        console.error("Erro ao buscar o ID local", error);
      }
    };

    buscarIdSalvo();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Ionicons name="menu" size={28} color="#333" />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>MEU PERFIL</Text>
          <Text style={styles.headerSubtitle}>Gestão de Metas</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.replace("Login")}>
          <Ionicons name="log-out-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
          }}
          style={styles.avatar}
        />

        {loading ? (
          <ActivityIndicator
            size="small"
            color="#1D355E"
            style={{ marginTop: 20, marginBottom: 20 }}
          />
        ) : (
          <View style={styles.userInfoContainer}>
            <Text style={styles.userName}>
              {user?.name || user?.username || "Usuário AZUL"}
            </Text>
            <Text style={styles.userEmail}>
              {user?.email || "azul@email.com"}
            </Text>
          </View>
        )}

        {/* CARD DE CAIXINHAS NO PERFIL */}
        <View style={styles.caixinhasCard}>
          <View style={styles.caixinhasHeader}>
            <Text style={styles.caixinhasTitle}>RESUMO DAS CAIXINHAS</Text>
            <View style={styles.badge}>
              {/* Ajustado para mostrar o total real do banco */}
              <Text style={styles.badgeText}>{caixa.length}</Text>
            </View>
          </View>

          {loading ? (
            <ActivityIndicator
              size="small"
              color="#1D355E"
              style={{ marginVertical: 20 }}
            />
          ) : caixa.length === 0 ? (
            <Text style={styles.emptyText}>Nenhuma caixinha encontrada.</Text>
          ) : (
            // O loop mapeia cada caixinha criando uma estrutura vertical isolada
            caixa.map((item, index) => {
              const valorGuardado = Number(item.valor || 0);
              const valorMeta = Number(item.meta || 1); // Evita divisão por zero
              const progresso = (valorGuardado / valorMeta) * 100;

              return (
                <View key={item.id || index} style={styles.itemCaixinha}>
                  <View style={styles.infoCaixinha}>
                    <Text style={styles.nomeCaixinha}>{item.alvo || "Meta"}</Text>
                    <Text style={styles.valorCaixinha}>
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(valorGuardado)}
                    </Text>
                  </View>
                  
                  {/* Reintrodução da barra de progresso visual */}
                  <View style={styles.barBack}>
                    <View
                      style={[
                        styles.barFront,
                        { 
                          width: `${Math.min(progresso, 100)}%`, 
                          backgroundColor: progresso >= 100 ? "#16A34A" : "#2563EB" 
                        },
                      ]}
                    />
                  </View>
                </View>
              );
            })
          )}

          {/* BOTÃO VER MAIS */}
          <TouchableOpacity
            style={[
              styles.btnVerMais,
              Platform.OS === "web" && { cursor: "pointer" },
            ]}
            onPress={handleVerMais}
            activeOpacity={0.7}
          >
            <Text style={styles.txtVerMais}>Ver detalhes das caixinhas</Text>
            <Ionicons name="arrow-forward" size={18} color="#1D355E" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F6F8" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#FFF",
  },
  headerTitleContainer: { flex: 1, marginLeft: 15 },
  headerTitle: { fontWeight: "bold", fontSize: 14 },
  headerSubtitle: { fontSize: 11, color: "#777" },
  content: { alignItems: "center", paddingVertical: 20 },
  avatar: { width: 90, height: 90, borderRadius: 45, backgroundColor: "#DDD" },
  userInfoContainer: { alignItems: "center", marginVertical: 10 },
  userName: { fontSize: 18, fontWeight: "bold", marginTop: 5 },
  userEmail: { color: "#777", marginBottom: 15 },

  caixinhasCard: {
    backgroundColor: "#FFF",
    width: "90%",
    borderRadius: 20,
    padding: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    marginTop: 10,
  },
  caixinhasHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  caixinhasTitle: { fontSize: 11, fontWeight: "bold", color: "#999" },
  badge: {
    backgroundColor: "#E2E8F0",
    paddingHorizontal: 10,
    borderRadius: 10,
    justifyContent: "center",
  },
  badgeText: { fontSize: 12, color: "#64748B", fontWeight: "bold" },

  itemCaixinha: { marginBottom: 15, width: "100%" },
  infoCaixinha: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  nomeCaixinha: { fontSize: 14, fontWeight: "600", color: "#333" },
  valorCaixinha: { fontSize: 14, fontWeight: "bold", color: "#1D355E" },
  barBack: {
    height: 8,
    backgroundColor: "#F1F5F9",
    borderRadius: 4,
    overflow: "hidden",
    marginTop: 2,
  },
  barFront: { height: "100%" },
  emptyText: { textAlign: "center", color: "#999", marginVertical: 15, fontSize: 13 },

  btnVerMais: {
    marginTop: 10,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "#F5F5F5",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  txtVerMais: {
    color: "#1D355E",
    fontWeight: "bold",
    marginRight: 8,
    fontSize: 15,
  },
});