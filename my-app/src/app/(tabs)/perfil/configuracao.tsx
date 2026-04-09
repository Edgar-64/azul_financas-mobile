import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function Configuracao() {
  const router = useRouter();
  const [isDark, setIsDark] = useState(false);

  return (
    <View style={styles.container}>
      {/* HEADER AZUL */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={26} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Configuração</Text>
        <View style={styles.miniLogo}>
          <Ionicons name="stats-chart" size={12} color="#2d548e" />
        </View>
      </View>

      {/* LISTA DE OPÇÕES */}
      <View style={styles.menu}>
        <ConfigItem 
          icon="key-outline" 
          label="Atualizar Senha" 
          onPress={() => router.push('/perfil/senha')} 
        />
        <ConfigItem 
          icon="person-remove-outline" 
          label="Deletar Conta" 
          onPress={() => router.push('/perfil/deletar')} 
        />
        <ConfigItem 
          icon="notifications-outline" 
          label="Notificações" 
          onPress={() => {}} 
        />
      </View>

      {/* RODAPÉ COM SWITCH */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Modo-Escuro</Text>
        <Switch 
          value={isDark} 
          onValueChange={setIsDark} 
          trackColor={{ false: "#cbd5e0", true: "#2d548e" }} 
          thumbColor={isDark ? "#fff" : "#f4f3f4"}
        />
      </View>
    </View>
  );
}

function ConfigItem({ icon, label, onPress }: any) {
  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <Ionicons name={icon} size={24} color="#2d548e" style={{ marginRight: 15 }} />
      <Text style={styles.itemLabel}>{label}</Text>
      <Ionicons name="chevron-forward" size={20} color="#cbd5e0" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff' 
  },
  header: { 
    backgroundColor: '#2d548e', 
    height: 100, 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 20, 
    paddingTop: 40 
  },
  headerTitle: { 
    color: 'white', 
    fontSize: 18, 
    fontWeight: 'bold', 
    flex: 1, 
    textAlign: 'center' 
  },
  miniLogo: { 
    width: 24, 
    height: 24, 
    backgroundColor: 'white', 
    borderRadius: 12, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  menu: { 
    padding: 25 
  },
  item: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingVertical: 18, 
    borderBottomWidth: 1, 
    borderBottomColor: '#f1f5f9' 
  },
  itemLabel: { 
    flex: 1, 
    fontSize: 16, 
    color: '#334155' 
  },
  footer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: 25, 
    marginTop: 'auto', 
    marginBottom: 40 
  },
  footerText: { 
    fontSize: 16, 
    fontWeight: 'bold',
    color: '#334155'
  }
});