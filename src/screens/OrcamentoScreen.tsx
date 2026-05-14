import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  SafeAreaView, 
  Alert 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function OrcamentoScreen({ navigation }: any) {
  // 1. ESTADOS PARA OS INPUTS
  const [dataInput, setDataInput] = useState('');
  const [valorInput, setValorInput] = useState('');

  // 2. ESTADO PARA A LISTA (Começa com seus dados iniciais)
  const [orcamentos, setOrcamentos] = useState([
    { id: 1, mes: 'Junho', ano: '2025', valor: '4.500,00', ativo: true },
    { id: 2, mes: 'Maio', ano: '2025', valor: '4.200,00', ativo: true },
    { id: 3, mes: 'Abril', ano: '2025', valor: '4.500,00', ativo: false },
  ]);

  // 3. FUNÇÃO PARA ADICIONAR
  const handleAdd = () => {
    if (!dataInput || !valorInput) {
      Alert.alert("Erro", "Preencha a data e o valor.");
      return;
    }

    // Lógica simples para separar mês/ano (ex: 06/2025)
    const partes = dataInput.split('/');
    const mesesNomes = [
      "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
      "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];
    
    const mesIndex = parseInt(partes[0]) - 1;
    const nomeMes = mesesNomes[mesIndex] || "Mês";
    const ano = partes[1] || "2025";

    const novo = {
      id: Date.now(),
      mes: nomeMes,
      ano: ano,
      valor: valorInput,
      ativo: true
    };

    setOrcamentos([novo, ...orcamentos]);
    setDataInput('');
    setValorInput('');
    Alert.alert("Sucesso", "Orçamento adicionado!");
  };

  // 4. FUNÇÃO PARA EXCLUIR
  const handleDelete = (id: number) => {
    Alert.alert("Excluir", "Deseja remover este orçamento?", [
      { text: "Cancelar", style: "cancel" },
      { 
        text: "Excluir", 
        style: "destructive", 
        onPress: () => setOrcamentos(orcamentos.filter(item => item.id !== id)) 
      }
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#666" />
        </TouchableOpacity>
        <View>
          <Text style={styles.title}>ORÇAMENTOS MENSAIS</Text>
          <Text style={styles.subtitle}>Organize seus limites de gastos por mês</Text>
        </View>
        <TouchableOpacity style={styles.exitButton} onPress={() => navigation.navigate('Login')}>
           <Ionicons name="exit-outline" size={24} color="#666" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* NOVO ORÇAMENTO */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>NOVO ORÇAMENTO</Text>
          <View style={styles.divider} />

          <View style={styles.row}>
            <View style={styles.inputContainer}>
              <Ionicons name="calendar-outline" size={18} color="#666" style={styles.inputIcon} />
              <TextInput 
                placeholder="MM/AAAA" 
                style={styles.input} 
                placeholderTextColor="#999"
                value={dataInput}
                onChangeText={setDataInput}
                keyboardType="numbers-and-punctuation"
              />
            </View>
            <View style={styles.inputContainer}>
               <Text style={styles.currencyPrefix}>R$</Text>
               <TextInput 
                placeholder="0,00" 
                style={styles.input} 
                keyboardType="numeric" 
                placeholderTextColor="#999"
                value={valorInput}
                onChangeText={setValorInput}
               />
            </View>
          </View>

          <TouchableOpacity style={styles.btn} onPress={handleAdd}>
            <Text style={styles.btnText}>Adicionar</Text>
          </TouchableOpacity>
        </View>

        {/* LISTA */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>ORÇAMENTOS CADASTRADOS</Text>
          <View style={styles.divider} />

          {orcamentos.map((item) => (
            <View key={item.id} style={styles.item}>
              <Ionicons 
                name="calendar-outline" 
                size={20} 
                color={item.ativo ? "#333" : "#CCC"} 
              />
              <View style={styles.itemTextContent}>
                <Text style={[styles.itemName, !item.ativo && styles.disabledText]}>
                  {item.mes} <Text style={styles.itemYear}>{item.ano}</Text>
                </Text>
              </View>
              <Text style={[styles.itemValue, !item.ativo && styles.disabledText]}>
                R$ {item.valor}
              </Text>
              <TouchableOpacity onPress={() => handleDelete(item.id)}>
                <Ionicons 
                  name="trash-outline" 
                  size={18} 
                  color={item.ativo ? "#E91E63" : "#CCC"} 
                  style={{ marginLeft: 10 }}
                />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* TAB BAR INFERIOR */}
      <View style={styles.tabBar}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Ionicons name="home-outline" size={24} color="#AAA" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
          <Ionicons name="bar-chart-outline" size={24} color="#AAA" />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.plusButton} 
          onPress={() => navigation.navigate('NovoLancamento')}
        >
          <Ionicons name="add" size={30} color="#FFF" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Caixinhas')}>
          <Ionicons name="card" size={24} color="#1D355E" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Perfil')}>
          <Ionicons name="person-outline" size={24} color="#AAA" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// ... (Mantenha seus estilos iguais)
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 20, 
    paddingTop: 20, 
    paddingBottom: 15,
    backgroundColor: '#FFF'
  },
  backButton: { marginRight: 15 },
  exitButton: { marginLeft: 'auto' },
  title: { fontWeight: 'bold', fontSize: 16, color: '#333' },
  subtitle: { fontSize: 12, color: '#999' },
  scrollContent: { padding: 20, paddingBottom: 100 },
  card: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  cardTitle: { fontSize: 11, fontWeight: 'bold', color: '#999', marginBottom: 10, textTransform: 'uppercase' },
  divider: { height: 1, backgroundColor: '#F1F3F5', marginBottom: 15 },
  row: { flexDirection: 'row', gap: 12 },
  inputContainer: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#F1F3F5', borderRadius: 10, paddingHorizontal: 12, height: 45 },
  inputIcon: { marginRight: 8 },
  currencyPrefix: { color: '#333', fontWeight: 'bold', marginRight: 5 },
  input: { flex: 1, color: '#333', fontSize: 14 },
  btn: { backgroundColor: '#1D355E', padding: 15, borderRadius: 12, alignItems: 'center', marginTop: 20 },
  btnText: { color: '#FFF', fontWeight: 'bold', fontSize: 15 },
  item: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#F1F3F5' },
  itemTextContent: { flex: 1, marginLeft: 12 },
  itemName: { fontWeight: 'bold', color: '#333', fontSize: 15 },
  itemYear: { fontWeight: 'normal', color: '#999', fontSize: 13 },
  itemValue: { fontWeight: 'bold', color: '#333', fontSize: 15 },
  disabledText: { color: '#CCC' },
  tabBar: { position: 'absolute', bottom: 0, width: '100%', height: 80, backgroundColor: '#FFF', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#EEE', paddingBottom: 15, paddingHorizontal: 10 },
  plusButton: { backgroundColor: '#1D355E', width: 50, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center', marginTop: -40, elevation: 5 }
});