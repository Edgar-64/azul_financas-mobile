import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, ScrollView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; // Importação extra para garantir a navegação

// Dados simulados (No futuro, você pode pegar isso de um Contexto)
const metasData = [
  { id: '1', nome: 'Reserva de Emergência', guardado: 2500, meta: 5000, cor: '#16A34A' },
  { id: '2', nome: 'Trocar de Carro', guardado: 12000, meta: 45000, cor: '#2563EB' },
];

export default function PerfilScreen() {
  // Usar o hook useNavigation é mais seguro quando a tela está dentro de um Drawer
  const navigation = useNavigation<any>();

  const handleVerMais = () => {
    console.log("Botão Ver Mais clicado!");
    // O nome 'Caixinhas' deve ser IGUAL ao nome no seu App.tsx
    navigation.navigate('Caixinhas'); 
  };

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
        <TouchableOpacity onPress={() => navigation.replace('Login')}>
          <Ionicons name="log-out-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Image 
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' }} 
          style={styles.avatar} 
        />
        <Text style={styles.userName}>Usuário Azul</Text>
        <Text style={styles.userEmail}>exemplo@mail.com</Text>

        {/* CARD DE CAIXINHAS NO PERFIL */}
        <View style={styles.caixinhasCard}>
          <View style={styles.caixinhasHeader}>
            <Text style={styles.caixinhasTitle}>RESUMO DAS CAIXINHAS</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{metasData.length}</Text>
            </View>
          </View>

          {metasData.map((item) => {
            const progresso = (item.guardado / item.meta) * 100;
            return (
              <View key={item.id} style={styles.itemCaixinha}>
                <View style={styles.infoCaixinha}>
                  <Text style={styles.nomeCaixinha}>{item.nome}</Text>
                  <Text style={styles.valorCaixinha}>R$ {item.guardado.toLocaleString()}</Text>
                </View>
                <View style={styles.barBack}>
                  <View style={[styles.barFront, { width: `${progresso}%`, backgroundColor: item.cor }]} />
                </View>
              </View>
            );
          })}

          {/* BOTÃO VER MAIS - ESTILIZADO PARA WEB/MOBILE */}
          <TouchableOpacity 
            style={[styles.btnVerMais, Platform.OS === 'web' && { cursor: 'pointer' }]} 
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
  container: { flex: 1, backgroundColor: '#F5F6F8' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 20, backgroundColor: '#FFF' },
  headerTitleContainer: { flex: 1, marginLeft: 15 },
  headerTitle: { fontWeight: 'bold', fontSize: 14 },
  headerSubtitle: { fontSize: 11, color: '#777' },
  content: { alignItems: 'center', paddingVertical: 20 },
  avatar: { width: 90, height: 90, borderRadius: 45, backgroundColor: '#DDD' },
  userName: { fontSize: 18, fontWeight: 'bold', marginTop: 10 },
  userEmail: { color: '#777', marginBottom: 20 },
  
  caixinhasCard: { 
    backgroundColor: '#FFF', 
    width: '90%', 
    borderRadius: 20, 
    padding: 20, 
    elevation: 4, 
    shadowColor: '#000', 
    shadowOpacity: 0.1, 
    shadowRadius: 10 
  },
  caixinhasHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  caixinhasTitle: { fontSize: 11, fontWeight: 'bold', color: '#999' },
  badge: { backgroundColor: '#E2E8F0', paddingHorizontal: 10, borderRadius: 10 },
  badgeText: { fontSize: 12, color: '#64748B', fontWeight: 'bold' },
  
  itemCaixinha: { marginBottom: 15 },
  infoCaixinha: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  nomeCaixinha: { fontSize: 14, fontWeight: '600' },
  valorCaixinha: { fontSize: 14, fontWeight: 'bold', color: '#1D355E' },
  barBack: { height: 8, backgroundColor: '#F1F5F9', borderRadius: 4, overflow: 'hidden' },
  barFront: { height: '100%' },

  btnVerMais: { 
    marginTop: 10, 
    paddingTop: 15, 
    borderTopWidth: 1, 
    borderTopColor: '#F5F5F5', 
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  txtVerMais: { color: '#1D355E', fontWeight: 'bold', marginRight: 8, fontSize: 15 }
});