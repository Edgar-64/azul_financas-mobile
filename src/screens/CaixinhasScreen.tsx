import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Modal,
  TextInput,
  Alert,
  Platform,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { DrawerActions } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  CaixaGet,
  CaixaPost,
  CaixaPostGuardar,
  CaixaPostRecuperar,
} from "../services/Users/post";
import { useAutoReload } from "../services/useFetch";

export default function CaixinhasScreen({ navigation }: any) {
  const [caixas, setCaixas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingEnvio, setLoadingEnvio] = useState(false);

  // Estados para os Modais de Ações (Depositar / Resgatar)
  const [modalAcaoVisible, setModalAcaoVisible] = useState(false);
  const [modalInputVisible, setModalInputVisible] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [tipoOperacao, setTipoOperacao] = useState<"guardar" | "resgatar">(
    "guardar",
  );
  const [valorInput, setValorInput] = useState("");

  // Estados para o Modal de Criar Nova Caixinha
  const [modalCriarVisible, setModalCriarVisible] = useState(false);
  const [novaMetaValor, setNovaMetaValor] = useState("");
  const [novoNomeObjetivo, setNovoNomeObjetivo] = useState("");

  const caixinhaSelecionada = caixas.find(
    (m) => (m.idCaixa?.toString() || m.id?.toString()) === selectedId,
  );

  // GET: Buscar dados da API
  const carregarCaixinhas = async () => {
    setLoading(true);
    try {
      const idSalvo = await AsyncStorage.getItem("@user_id");
      if (idSalvo !== null) {
        const resCaixa = await CaixaGet(idSalvo);
        setCaixas(Array.isArray(resCaixa) ? resCaixa : resCaixa?.data || []);
      }
    } catch (error) {
      console.error("Erro ao carregar caixinhas:", error);
      const msg = "Não foi possível carregar as caixinhas.";
      Platform.OS === "web" ? window.alert(msg) : Alert.alert("Erro", msg);
    } finally {
      setLoading(false);
    }
  };

  const { refreshing, onRefresh } = useAutoReload(carregarCaixinhas);

  useEffect(() => {
    carregarCaixinhas();
  }, []);

  const limparFormatacaoMoeda = (valor: string) => {
    return valor.replace(/\s/g, "").replace(",", ".");
  };

  // POST: Criar uma Nova Caixinha
  const handleCriarCaixinha = async () => {
    if (!novoNomeObjetivo || !novaMetaValor) {
      const msg = "Preencha todos os campos para criar uma caixinha!";
      Platform.OS === "web" ? window.alert(msg) : Alert.alert("Aviso", msg);
      return;
    }

    setLoadingEnvio(true);
    try {
      const idSalvo = await AsyncStorage.getItem("@user_id");

      const objetoParaEnvio = {
        meta: novoNomeObjetivo.toUpperCase(),
        alvo: parseFloat(limparFormatacaoMoeda(novaMetaValor)) || 0,
        caixa: "ABERTA",
        userId: Number(idSalvo),
      };

      await CaixaPost(objetoParaEnvio);

      const sucessoMsg = "Caixinha criada com sucesso!";
      Platform.OS === "web"
        ? window.alert(sucessoMsg)
        : Alert.alert("Sucesso", sucessoMsg);

      setNovoNomeObjetivo("");
      setNovaMetaValor("");
      setModalCriarVisible(false);

      await carregarCaixinhas();
    } catch (error: any) {
      console.error("Erro ao criar caixinha:", error.message);
      Alert.alert(
        "Erro",
        "Não foi possível criar a caixinha. Tente novamente.",
      );
    } finally {
      setLoadingEnvio(false);
    }
  };

  // POST: Confirmar Depósito ou Resgate
  const confirmarOperacao = async () => {
    const valorNum = parseFloat(limparFormatacaoMoeda(valorInput));

    if (isNaN(valorNum) || valorNum <= 0) {
      setModalInputVisible(false);
      return;
    }

    const saldoAtual = Number(caixinhaSelecionada?.valor || 0);
    const limiteMeta = Number(caixinhaSelecionada?.alvo || 0);

    if (tipoOperacao === "guardar" && saldoAtual + valorNum > limiteMeta) {
      const msg = `O valor excedeu a meta estipulada de R$ ${limiteMeta.toFixed(2)}`;
      Platform.OS === "web"
        ? window.alert(msg)
        : Alert.alert("Limite atingido", msg);
      return;
    }

    if (tipoOperacao === "resgatar" && valorNum > saldoAtual) {
      const msg = `Saldo disponível insuficiente: R$ ${saldoAtual.toFixed(2)}`;
      Platform.OS === "web"
        ? window.alert(msg)
        : Alert.alert("Saldo Insuficiente", msg);
      return;
    }

    setLoadingEnvio(true);
    try {
      const idSalvo = await AsyncStorage.getItem("@user_id");

      // Correção: Pega o ID que está salvo no estado 'selectedId'
      const payload = {
        idCaixa: Number(selectedId), // Usa o ID da caixinha selecionada
        userId: Number(idSalvo),
        valor: valorNum,
      };

      if (tipoOperacao === "guardar") {
        await CaixaPostGuardar(payload);
      } else {
        await CaixaPostRecuperar(payload);
      }

      setModalInputVisible(false);
      setValorInput("");

      await carregarCaixinhas();
    } catch (error: any) {
      console.error("Erro na operação financeira:", error.message);
      Alert.alert("Erro", "Erro ao processar movimentação. Tente novamente.");
    } finally {
      setLoadingEnvio(false);
    }
  };

  const abrirOpcoes = (id: string) => {
    setSelectedId(id);
    setModalAcaoVisible(true);
  };

  const prepararOperacao = (tipo: "guardar" | "resgatar") => {
    setTipoOperacao(tipo);
    setValorInput("");
    setModalAcaoVisible(false);
    setModalInputVisible(true);
  };

  const totalGeral = caixas.reduce(
    (acc, curr) => acc + Number(curr.valor || 0),
    0,
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.headerIcon}
        >
          <Ionicons name="chevron-back" size={28} color="#333" />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>CAIXINHAS</Text>
          <TouchableOpacity
            style={styles.btnAddHeader}
            onPress={() => setModalCriarVisible(true)}
          >
            <Ionicons name="add" size={20} color="#1D355E" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          style={styles.headerIcon}
        >
          <Ionicons name="menu" size={28} color="#333" />
        </TouchableOpacity>
      </View>

      {/* RENDERIZAÇÃO PRINCIPAL (ÚNICA ROOL SCROLLVIEW) */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 130 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.totalCard}>
          <Text style={styles.totalLabel}>Total guardado</Text>
          <Text style={styles.totalValue}>
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(totalGeral)}
          </Text>
        </View>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#1D355E" />
            <Text style={styles.loadingText}>Carregando suas metas...</Text>
          </View>
        ) : caixas.length === 0 ? (
          <Text style={styles.emptyText}>
            Nenhuma caixinha cadastrada no momento.
          </Text>
        ) : (
          caixas.map((item, index) => {
            const currentId = (item.idCaixa || item.id || index).toString();
            const guardado = Number(item.valor || 0);
            const objetivoValor = Number(item.alvo || 1);
            const progresso = (guardado / objetivoValor) * 100;
            const metaAtingida = guardado >= objetivoValor;

            let iconeDinamico = "cash-outline";
            const alvoLower = (item.meta || "").toLowerCase();
            if (alvoLower.includes("carro") || alvoLower.includes("moto"))
              iconeDinamico = "car";
            if (
              alvoLower.includes("viagem") ||
              alvoLower.includes("praia") ||
              alvoLower.includes("ferias")
            )
              iconeDinamico = "airplane";
            if (
              alvoLower.includes("reserva") ||
              alvoLower.includes("emerg") ||
              alvoLower.includes("seguranca")
            )
              iconeDinamico = "shield-checkmark";

            return (
              <View key={currentId} style={styles.metaItem}>
                <TouchableOpacity
                  onPress={() => abrirOpcoes(currentId)}
                  activeOpacity={0.7}
                >
                  <View style={styles.metaTop}>
                    <View style={styles.iconCircle}>
                      <Ionicons
                        name={iconeDinamico as any}
                        size={22}
                        color="#1D355E"
                      />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.metaNome}>
                        {item.meta || "Meta sem nome"}
                      </Text>
                      <Text
                        style={
                          metaAtingida
                            ? styles.metaAtingidaText
                            : styles.metaStatus
                        }
                      >
                        {metaAtingida
                          ? "Meta Atingida!"
                          : `${new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(guardado)} / ${new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(objetivoValor)}`}
                      </Text>
                    </View>
                    <Text style={styles.percentText}>
                      {progresso.toFixed(0)}%
                    </Text>
                  </View>

                  <View style={styles.progressContainer}>
                    <View
                      style={[
                        styles.progressBar,
                        {
                          width: `${progresso > 100 ? 100 : progresso}%`,
                          backgroundColor: metaAtingida ? "#16A34A" : "#2563EB",
                        },
                      ]}
                    />
                  </View>
                </TouchableOpacity>

                {/* BOTÕES DE AÇÃO DIRETA NO CARD */}
                <View style={styles.cardActions}>
                  <TouchableOpacity
                    style={[styles.cardActionBtn, styles.btnActionGuardar]}
                    onPress={() => {
                      setSelectedId(currentId);
                      prepararOperacao("guardar");
                    }}
                  >
                    <Ionicons
                      name="add-circle-outline"
                      size={16}
                      color="#1D355E"
                    />
                    <Text style={styles.txtActionGuardar}>Guardar</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.cardActionBtn, styles.btnActionResgatar]}
                    onPress={() => {
                      setSelectedId(currentId);
                      prepararOperacao("resgatar");
                    }}
                  >
                    <Ionicons
                      name="remove-circle-outline"
                      size={16}
                      color="#E63946"
                    />
                    <Text style={styles.txtActionResgatar}>Resgatar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })
        )}
      </ScrollView>

      {/* MENU DE OPÇÕES COMPLEMENTAR (BOTTOMSHEET MODAL) */}
      <Modal visible={modalAcaoVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <TouchableOpacity
            style={{ flex: 1, width: "100%" }}
            onPress={() => setModalAcaoVisible(false)}
          />
          <View style={styles.menuContent}>
            <Text style={styles.menuTitle}>
              Saldo atual:{" "}
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(Number(caixinhaSelecionada?.valor || 0))}
            </Text>
            <TouchableOpacity
              style={styles.menuBtn}
              onPress={() => prepararOperacao("guardar")}
            >
              <Ionicons name="add-circle-outline" size={22} color="#1D355E" />
              <Text style={styles.menuBtnText}>Guardar Dinheiro</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuBtn}
              onPress={() => prepararOperacao("resgatar")}
            >
              <Ionicons
                name="remove-circle-outline"
                size={22}
                color="#E63946"
              />
              <Text style={[styles.menuBtnText, { color: "#E63946" }]}>
                Resgatar Valor
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnClose}
              onPress={() => setModalAcaoVisible(false)}
            >
              <Text style={styles.btnCloseText}>Voltar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* MODAL DE VALOR INPUT (CONFIRMAÇÃO NUMÉRICA) */}
      <Modal visible={modalInputVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.inputCard}>
            <Text style={styles.modalTitle}>
              {tipoOperacao === "guardar"
                ? "Quanto quer guardar?"
                : "Quanto quer resgatar?"}
            </Text>
            <Text style={styles.infoSaldo}>
              {tipoOperacao === "resgatar"
                ? `Disponível: R$ ${Number(caixinhaSelecionada?.valor || 0)}`
                : `Meta: R$ ${Number(caixinhaSelecionada?.alvo || 0)}`}
            </Text>
            <TextInput
              style={styles.input}
              placeholder="0.00"
              keyboardType="numeric"
              value={valorInput}
              onChangeText={setValorInput}
              autoFocus
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.btnCancel}
                onPress={() => setModalInputVisible(false)}
              >
                <Text style={{ color: "#666" }}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btnSave}
                onPress={confirmarOperacao}
                disabled={loadingEnvio}
              >
                {loadingEnvio ? (
                  <ActivityIndicator color="#FFF" size="small" />
                ) : (
                  <Text style={{ color: "#FFF", fontWeight: "bold" }}>
                    Confirmar
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* MODAL POP-UP: CRIAR NOVA CAIXINHA */}
      <Modal
        visible={modalCriarVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalCriarVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.inputCard}>
            <Text
              style={[styles.modalTitle, { fontSize: 18, marginBottom: 20 }]}
            >
              Nova Caixinha
            </Text>

            <TextInput
              style={styles.formInput}
              placeholder="Nome do seu objetivo (Ex: Carro)"
              placeholderTextColor="#999"
              value={novoNomeObjetivo}
              onChangeText={setNovoNomeObjetivo}
              autoCapitalize="characters"
            />

            <TextInput
              style={styles.formInput}
              placeholder="Valor da Meta (Ex: 1500.00)"
              placeholderTextColor="#999"
              keyboardType="numeric"
              value={novaMetaValor}
              onChangeText={setNovaMetaValor}
            />

            <View style={[styles.modalButtons, { marginTop: 10 }]}>
              <TouchableOpacity
                style={styles.btnCancel}
                onPress={() => setModalCriarVisible(false)}
              >
                <Text style={{ color: "#666" }}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btnSave}
                onPress={handleCriarCaixinha}
                disabled={loadingEnvio}
              >
                {loadingEnvio ? (
                  <ActivityIndicator color="#FFF" size="small" />
                ) : (
                  <Text style={{ color: "#FFF", fontWeight: "bold" }}>
                    Criar
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F6F8" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
    paddingTop: Platform.OS === "ios" ? 40 : 12,
  },
  headerIcon: {
    width: 40,
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
  },
  headerCenter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  headerTitle: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#333",
    letterSpacing: 0.5,
  },
  btnAddHeader: {
    backgroundColor: "#F1F5F9",
    padding: 6,
    borderRadius: 8,
    marginLeft: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingContainer: {
    paddingVertical: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: { marginTop: 10, color: "#1D355E", fontWeight: "500" },
  emptyText: {
    textAlign: "center",
    marginTop: 40,
    color: "#666",
    fontSize: 14,
  },
  totalCard: {
    backgroundColor: "#111",
    margin: 20,
    borderRadius: 20,
    padding: 25,
  },
  totalLabel: { color: "#AAA" },
  totalValue: { color: "#FFF", fontSize: 32, fontWeight: "bold" },
  metaItem: {
    backgroundColor: "#FFF",
    marginHorizontal: 20,
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  metaTop: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  iconCircle: {
    width: 40,
    height: 40,
    backgroundColor: "#F1F5F9",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  metaNome: { fontWeight: "bold", fontSize: 15, color: "#1D355E" },
  metaStatus: { fontSize: 12, color: "#666", marginTop: 2 },
  metaAtingidaText: {
    fontSize: 12,
    color: "#16A34A",
    fontWeight: "bold",
    marginTop: 2,
  },
  percentText: { fontWeight: "bold", color: "#1D355E" },
  progressContainer: {
    height: 6,
    backgroundColor: "#EEE",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressBar: { height: "100%" },

  // ESTILOS DOS BOTÕES DE AÇÃO DIRETA
  cardActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
  },
  cardActionBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  btnActionGuardar: {
    backgroundColor: "#E0E7FF",
  },
  txtActionGuardar: {
    color: "#1D355E",
    fontWeight: "bold",
    fontSize: 13,
    marginLeft: 5,
  },
  btnActionResgatar: {
    backgroundColor: "#FEE2E2",
  },
  txtActionResgatar: {
    color: "#E63946",
    fontWeight: "bold",
    fontSize: 13,
    marginLeft: 5,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  menuContent: {
    backgroundColor: "#FFF",
    width: "100%",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 20,
    position: "absolute",
    bottom: 0,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#666",
  },
  menuBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F5",
  },
  menuBtnText: {
    marginLeft: 15,
    fontWeight: "bold",
    fontSize: 16,
    color: "#1D355E",
  },
  btnClose: { marginTop: 10, alignItems: "center", padding: 15 },
  btnCloseText: { color: "#999", fontWeight: "bold" },
  inputCard: {
    backgroundColor: "#FFF",
    width: "85%",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    elevation: 5,
  },
  modalTitle: { fontWeight: "bold", fontSize: 16, color: "#1D355E" },
  infoSaldo: { fontSize: 13, color: "#666", marginBottom: 20, marginTop: 5 },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: "#1D355E",
    width: "100%",
    fontSize: 24,
    textAlign: "center",
    marginBottom: 25,
  },
  formInput: {
    backgroundColor: "#F8FAFC",
    width: "100%",
    borderRadius: 12,
    padding: 15,
    fontSize: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    color: "#333",
  },
  modalButtons: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  btnCancel: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  btnSave: {
    flex: 1.3,
    backgroundColor: "#1D355E",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
  },
});
