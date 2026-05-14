import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image, Dimensions, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from 'expo-camera';

const { width } = Dimensions.get('window');

export default function PaginaPagamento({ navigation }: any) {
  const [abaAtiva, setAbaAtiva] = useState<'scan' | 'myqr'>('scan');
  const [permission, requestPermission] = useCameraPermissions();

  // Se não tiver permissão, exibe botão para pedir
  if (abaAtiva === 'scan' && !permission) {
    return <View style={styles.container}><Text>Carregando câmera...</Text></View>;
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#1D355E" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pay With <Text style={{fontWeight: 'bold'}}>CHILDPAY</Text></Text>
        <View style={{width: 24}} /> 
      </View>

      {/* TABS */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, abaAtiva === 'scan' && styles.tabAtiva]} 
          onPress={() => setAbaAtiva('scan')}
        >
          <Text style={[styles.tabText, abaAtiva === 'scan' && styles.tabTextAtivo]}>Scan QR</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.tab, abaAtiva === 'myqr' && styles.tabAtiva]} 
          onPress={() => setAbaAtiva('myqr')}
        >
          <Text style={[styles.tabText, abaAtiva === 'myqr' && styles.tabTextAtivo]}>My QR</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {abaAtiva === 'scan' ? (
          <View style={styles.scanContainer}>
            {!permission?.granted ? (
              <View style={styles.noPermissionBox}>
                <Text style={styles.noPermissionText}>Precisamos da sua permissão para abrir a câmera</Text>
                <TouchableOpacity style={styles.btnPermissao} onPress={requestPermission}>
                  <Text style={{color: '#FFF', fontWeight: 'bold'}}>Ativar Câmera</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.scannerFrame}>
                <CameraView style={styles.camera} facing="back" />
                {/* BORDAS */}
                <View style={[styles.corner, styles.topLeft]} />
                <View style={[styles.corner, styles.topRight]} />
                <View style={[styles.corner, styles.bottomLeft]} />
                <View style={[styles.corner, styles.bottomRight]} />
              </View>
            )}
            <Text style={styles.scanText}>Scan QR Code here</Text>
          </View>
        ) : (
          <View style={styles.myQrContainer}>
            <View style={styles.qrWrapper}>
              <Image 
                source={{ uri: 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=ChildPay' }} 
                style={styles.qrImage}
              />
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20 },
  headerTitle: { fontSize: 16, color: '#1D355E' },
  tabContainer: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#EEE' },
  tab: { flex: 1, alignItems: 'center', paddingVertical: 15 },
  tabAtiva: { borderBottomWidth: 3, borderBottomColor: '#1D355E' },
  tabText: { color: '#AAA', fontWeight: '500' },
  tabTextAtivo: { color: '#1D355E', fontWeight: 'bold' },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  scanContainer: { alignItems: 'center' },
  scannerFrame: { 
    width: width * 0.7, 
    height: width * 0.7, 
    backgroundColor: '#000', 
    borderRadius: 20, 
    overflow: 'hidden',
    position: 'relative'
  },
  camera: { flex: 1 },
  noPermissionBox: { width: width * 0.7, height: width * 0.7, justifyContent: 'center', alignItems: 'center', padding: 20 },
  noPermissionText: { textAlign: 'center', marginBottom: 20, color: '#666' },
  btnPermissao: { backgroundColor: '#1D355E', padding: 12, borderRadius: 10 },
  corner: { position: 'absolute', width: 40, height: 40, borderColor: '#1D355E', borderWidth: 5, zIndex: 10 },
  topLeft: { top: 0, left: 0, borderRightWidth: 0, borderBottomWidth: 0 },
  topRight: { top: 0, right: 0, borderLeftWidth: 0, borderBottomWidth: 0 },
  bottomLeft: { bottom: 0, left: 0, borderRightWidth: 0, borderTopWidth: 0 },
  bottomRight: { bottom: 0, right: 0, borderLeftWidth: 0, borderTopWidth: 0 },
  scanText: { marginTop: 30, color: '#1D355E', fontSize: 14, fontWeight: '500' },
  myQrContainer: { alignItems: 'center' },
  qrWrapper: { padding: 20, borderWidth: 10, borderColor: '#1D355E', borderRadius: 10, backgroundColor: '#FFF' },
  qrImage: { width: 220, height: 220 }
});