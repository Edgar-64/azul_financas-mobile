import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Dimensions,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CameraView, useCameraPermissions } from "expo-camera";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserGetById } from "../services/Users/post"; 

const { width } = Dimensions.get("window");

export default function PaginaPagamento({ navigation }: any) {
  const [abaAtiva, setAbaAtiva] = useState<"scan" | "myqr">("scan");
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [meuId, setMeuId] = useState<string>("");

  // Busca o ID do usuário logado de forma assíncrona assim que a tela abre
  useEffect(() => {
    const obterMeuId = async () => {
      try {
        const idSalvo = await AsyncStorage.getItem("@user_id");
        if (idSalvo) {
          setMeuId(idSalvo);
        }
      } catch (error) {
        console.error("Erro ao buscar @user_id do AsyncStorage:", error);
      }
    };
    obterMeuId();
  }, []);

  // FUNÇÃO DE LEITURA: Disparada ao ler o QR Code
  const handleBarCodeScanned = async ({
    type,
    data,
  }: {
    type: string;
    data: string;
  }) => {
    setScanned(true); // Pausa a câmera para evitar loops de leitura

    try {
      // Supondo que o QR Code lido contenha o formato "receber:ID" ou apenas o "ID" puro
      // Vamos tentar quebrar a string caso use o padrão de prefixo explicativo
      const partes = data.split(":");
      const idString = partes.length > 1 ? partes[1] : partes[0];
      const idDoUsuarioLido = Number(idString);

      if (isNaN(idDoUsuarioLido)) {
        Alert.alert("Erro", "Formato de QR Code inválido para pagamentos.");
        setScanned(false);
        return;
      }

      // Evita que o usuário tente pagar a si mesmo
      if (meuId && idDoUsuarioLido === Number(meuId)) {
        Alert.alert("Aviso", "Você não pode realizar uma operação para você mesmo.");
        setScanned(false);
        return;
      }

      // Busca os dados do outro usuário no seu Back-end
      const outroUsuario = await UserGetById(idDoUsuarioLido);

      // Se encontrou, mostra os dados dele para confirmação
      Alert.alert(
        "Confirmar Pagamento",
        `Deseja pagar para:\n\nNome: ${outroUsuario.name}\nEmail: ${outroUsuario.email}`,
        [
          {
            text: "Cancelar",
            onPress: () => setScanned(false), // Reativa a câmera
            style: "cancel",
          },
          {
            text: "Confirmar e Avançar",
            onPress: () => {
              // Navega para a tela de digitar o valor passando o objeto do recebedor
              navigation.navigate("EnviarValorScreen", {
                recebedor: outroUsuario,
              });
              setScanned(false);
            },
          },
        ],
      );
    } catch (error) {
      Alert.alert("Erro", "Não foi possível encontrar os dados deste usuário.");
      setScanned(false); // Reativa a câmera caso dê erro no back-end
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#1D355E" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          Pay With <Text style={{ fontWeight: "bold" }}>CHILDPAY</Text>
        </Text>
        <View style={{ width: 24 }} />
      </View>

      {/* TABS */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, abaAtiva === "scan" && styles.tabAtiva]}
          onPress={() => setAbaAtiva("scan")}
        >
          <Text
            style={[styles.tabText, abaAtiva === "scan" && styles.tabTextAtivo]}
          >
            Scan QR
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, abaAtiva === "myqr" && styles.tabAtiva]}
          onPress={() => setAbaAtiva("myqr")}
        >
          <Text
            style={[styles.tabText, abaAtiva === "myqr" && styles.tabTextAtivo]}
          >
            My QR
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {abaAtiva === "scan" ? (
          <View style={styles.scanContainer}>
            {permission?.granted === false ? (
              <View style={styles.noPermissionBox}>
                <Text style={styles.noPermissionText}>
                  Precisamos da sua permissão para abrir a câmera
                </Text>
                <TouchableOpacity
                  style={styles.btnPermissao}
                  onPress={requestPermission}
                >
                  <Text style={{ color: "#FFF", fontWeight: "bold" }}>
                    Ativar Câmera
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.scannerFrame}>
                <CameraView
                  style={styles.camera}
                  facing="back"
                  barcodeScannerSettings={{
                    barcodeTypes: ["qr"],
                  }}
                  onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
                />

                {/* BORDAS DESIGN */}
                <View style={[styles.corner, styles.topLeft]} />
                <View style={[styles.corner, styles.topRight]} />
                <View style={[styles.corner, styles.bottomLeft]} />
                <View style={[styles.corner, styles.bottomRight]} />
              </View>
            )}

            {scanned ? (
              <TouchableOpacity
                style={styles.btnResetLeitura}
                onPress={() => setScanned(false)}
              >
                <Text style={{ color: "#1D355E", fontWeight: "bold" }}>
                  Toque para escanear novamente
                </Text>
              </TouchableOpacity>
            ) : (
              <Text style={styles.scanText}>Scan QR Code here</Text>
            )}
          </View>
        ) : (
          <View style={styles.myQrContainer}>
            <View style={styles.qrWrapper}>
              <Image
                source={{
                  // DINÂMICO: Passa a string 'receber:ID' para a API de geração
                  uri: `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=receber:${meuId || "0"}`,
                }}
                style={styles.qrImage}
              />
            </View>
            <Text style={styles.meuIdVisual}>Seu ID de recebimento: {meuId || "..."}</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  headerTitle: { fontSize: 16, color: "#1D355E" },
  tabContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  tab: { flex: 1, alignItems: "center", paddingVertical: 15 },
  tabAtiva: { borderBottomWidth: 3, borderBottomColor: "#1D355E" },
  tabText: { color: "#AAA", fontWeight: "500" },
  tabTextAtivo: { color: "#1D355E", fontWeight: "bold" },
  content: { flex: 1, alignItems: "center", justifyContent: "center" },
  scanContainer: { alignItems: "center" },
  scannerFrame: {
    width: width * 0.7,
    height: width * 0.7,
    backgroundColor: "#000",
    borderRadius: 20,
    overflow: "hidden",
    position: "relative",
  },
  camera: { flex: 1 },
  noPermissionBox: {
    width: width * 0.7,
    height: width * 0.7,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  noPermissionText: { textAlign: "center", marginBottom: 20, color: "#666" },
  btnPermissao: { backgroundColor: "#1D355E", padding: 12, borderRadius: 10 },
  corner: {
    position: "absolute",
    width: 40,
    height: 40,
    borderColor: "#1D355E",
    borderWidth: 5,
    zIndex: 10,
  },
  topLeft: { top: 0, left: 0, borderRightWidth: 0, borderBottomWidth: 0 },
  topRight: { top: 0, right: 0, borderLeftWidth: 0, borderBottomWidth: 0 },
  bottomLeft: { bottom: 0, left: 0, borderRightWidth: 0, borderTopWidth: 0 },
  bottomRight: { bottom: 0, right: 0, borderLeftWidth: 0, borderTopWidth: 0 },
  scanText: {
    marginTop: 30,
    color: "#1D355E",
    fontSize: 14,
    fontWeight: "500",
  },
  btnResetLeitura: {
    marginTop: 30,
    backgroundColor: "#E0E7FF",
    padding: 12,
    borderRadius: 10,
  },
  myQrContainer: { alignItems: "center" },
  qrWrapper: {
    padding: 20,
    borderWidth: 10,
    borderColor: "#1D355E",
    borderRadius: 10,
    backgroundColor: "#FFF",
  },
  qrImage: { width: 220, height: 220 },
  meuIdVisual: {
    marginTop: 15,
    fontSize: 14,
    color: "#1D355E",
    fontWeight: "500"
  }
});