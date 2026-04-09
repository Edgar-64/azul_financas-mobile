import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { DrawerActions } from "@react-navigation/native";

export default function Dashboard() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }} // Espaço para a barra não cobrir o último card
      >
        {/* HEADER AZUL */}
        <View style={styles.header}>
          <View style={styles.topRow}>
            <TouchableOpacity
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            >
              <Ionicons name="menu" size={32} color="white" />
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.iconCircle}>
                <Ionicons name="pie-chart-outline" size={20} color="#2d548e" />
              </View>
            </TouchableOpacity>
          </View>

          <Text style={styles.labelSaldo}>Saldo</Text>
          <Text style={styles.saldo}>R$ 199,00</Text>

          {/* BOTÕES DE ATALHO */}
          <View style={styles.shortcutContainer}>
            <ShortcutItem icon="arrow-down" label="Saída" />
            <ShortcutItem icon="arrow-up" label="Entradas" />
            <ShortcutItem icon="wallet-outline" label="Carteira" />
            <ShortcutItem icon="document-text-outline" label="Caixinha" />
          </View>
        </View>

        {/* CONTEÚDO */}
        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Veja suas finanças</Text>

          <View style={styles.graphContainer}>
            <Text style={styles.graphLabel}>Gráfico de Gastos</Text>
            {/* Gráfico Visual */}
            <View style={styles.donutChart}>
              <View style={styles.donutInner} />
            </View>

            <View style={styles.legendContainer}>
              <LegendItem color="#c89235" text="57% Mercado" />
              <LegendItem color="#262d33" text="%12 Cartão" />
              <LegendItem color="#4a2115" text="%28 contas" />
              <LegendItem color="#8d3d3d" text="%13 Ifood" />
            </View>
          </View>

          <View style={styles.gastosHeader}>
            <Text style={styles.gastosTitle}>Gastos</Text>
            <Text style={styles.gastosTotal}>R$ 2.500</Text>
          </View>

          <GastoCard loja="Fatura cartão Y" valor="R$ 200,00" data="27/03" />
          <GastoCard loja="Fatura cartão X" valor="R$ 200,00" data="29/03" />
        </View>
      </ScrollView>
    </View>
  );
}

// Componentes internos (iguais aos anteriores)
function ShortcutItem({ icon, label }) {
  return (
    <TouchableOpacity style={styles.shortcutItem}>
      <Ionicons name={icon} size={24} color="#2d548e" />
      <Text style={styles.shortcutLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

function LegendItem({ color, text }) {
  return (
    <View style={styles.legendItem}>
      <View style={[styles.legendColor, { backgroundColor: color }]} />
      <Text style={styles.legendText}>{text}</Text>
    </View>
  );
}

function GastoCard({ loja, valor, data }) {
  return (
    <View style={styles.card}>
      <Ionicons name="card" size={20} color="#333" />
      <Text style={styles.cardText}>{loja}</Text>
      <Text style={styles.cardValue}>$ {valor}</Text>
      <Text style={styles.cardDate}>📅 {data}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    backgroundColor: "#2d548e",
    padding: 25,
    paddingTop: 50,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  iconCircle: { backgroundColor: "white", padding: 8, borderRadius: 10 },
  labelSaldo: { color: "#cbd5e0", fontSize: 16 },
  saldo: { color: "#fff", fontSize: 36, fontWeight: "bold" },
  shortcutContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 25,
  },
  shortcutItem: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
    width: "23%",
  },
  shortcutLabel: {
    fontSize: 10,
    color: "#718096",
    marginTop: 5,
    fontWeight: "600",
  },
  content: { padding: 20 },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2d3748",
    marginBottom: 20,
  },
  graphContainer: { alignItems: "center", marginBottom: 30 },
  graphLabel: { alignSelf: "flex-start", color: "#a0aec0" },
  donutChart: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 20,
    borderColor: "#c89235",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  donutInner: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "white",
    position: "absolute",
  },
  legendContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 20,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    width: "45%",
    marginBottom: 10,
  },
  legendColor: { width: 12, height: 12, borderRadius: 3, marginRight: 8 },
  legendText: { fontSize: 12, color: "#718096" },
  gastosHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  gastosTitle: { color: "#718096" },
  gastosTotal: { fontWeight: "bold", color: "#4fd1c5" },
  card: {
    flexDirection: "row",
    backgroundColor: "#edf2f7",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    alignItems: "center",
  },
  cardText: { flex: 1, marginLeft: 12 },
  cardValue: { fontWeight: "bold" },
  cardDate: { fontSize: 11, color: "#a0aec0", marginLeft: 5 },
});
