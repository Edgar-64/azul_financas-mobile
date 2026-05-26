import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";

export default function QRCodeScanner() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [qrContent, setQrContent] = useState("");

  // Solicita a permissão da câmera assim que o componente é montado
  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, [permission]);

  // Se a permissão ainda estiver carregando
  if (!permission) {
    return (
      <View style={styles.container}>
        <Text>Carregando permissões da câmera...</Text>
      </View>
    );
  }

  // Se a permissão foi negada
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.textText}>Precisamos de acesso à câmera para ler o QR Code.</Text>
        <Button onPress={requestPermission} title="Conceder Permissão" />
      </View>
    );
  }

  // Função disparada quando um QR Code é detectado
  const handleBarcodeScanned = ({ type, data }: { type: string; data: string }) => {
    setScanned(true);
    setQrContent(data);
    
    // Aqui você insere a sua lógica com o resultado do QR Code (ex: chamar API, navegar de tela, etc)
    console.log(`Código do tipo ${type} com o valor: ${data}`);
  };

  return (
    <View style={styles.container}>
      <CameraView
        style={StyleSheet.absoluteFillObject}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"], // Restringe a leitura apenas para QR Codes
        }}
        onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
      />

      {/* Máscara visual opcional para ajudar o usuário a centralizar o QR Code */}
      <View style={styles.overlay}>
        <View style={styles.unfocusedContainer}></View>
        <View style={styles.middleContainer}>
          <View style={styles.unfocusedContainer}></View>
          <View style={styles.focusedTarget} />
          <View style={styles.unfocusedContainer}></View>
        </View>
        <View style={styles.unfocusedContainer}></View>
      </View>

      {/* Interface de feedback abaixo da câmera */}
      {scanned && (
        <View style={styles.scanFeedbackCard}>
          <Text style={styles.feedbackTitle}>QR Code Lido!</Text>
          <Text style={styles.feedbackText} numberOfLines={2}>{qrContent}</Text>
          <TouchableOpacity
            style={styles.rescanBtn}
            onPress={() => setScanned(false)}
          >
            <Text style={styles.rescanBtnText}>Escanear Novamente</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#000",
  },
  textText: {
    textAlign: "center",
    marginBottom: 10,
    color: "#FFF",
  },
  // Estilos da máscara guia (Mira)
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  unfocusedContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  middleContainer: {
    flexDirection: "row",
    height: 260,
  },
  focusedTarget: {
    width: 260,
    height: 260,
    borderWidth: 3,
    borderColor: "#00E676",
    backgroundColor: "transparent",
    borderRadius: 16,
  },
  // Card de resultado
  scanFeedbackCard: {
    position: "absolute",
    bottom: 40,
    left: 20,
    right: 20,
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  feedbackTitle: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
  feedbackText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 15,
  },
  rescanBtn: {
    backgroundColor: "#1D355E",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },
  rescanBtnText: {
    color: "#FFF",
    fontWeight: "bold",
  },
});