import React, { useState } from 'react';
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
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native'; // Importante para o hambúrguer

export default function CaixinhasScreen({ navigation }: any) {
  const [metas, setMetas] = useState([
    { id: '1', nome: 'Reserva de Emergência', guardado: 2500, meta: 5000, icone: 'shield-checkmark', cor: '#16A34A' },
    { id: '2', nome: 'Trocar de Carro', guardado: 12000, meta: 45000, icone: 'car', cor: '#2563EB' },
    { id: '3', nome: 'Viagem de Fim de Ano', guardado: 3000, meta: 3000, icone: 'airplane', cor: '#7C3AED' },
  ]);

  const [modalAcaoVisible, setModalAcaoVisible] = useState(false);
  const [modalInputVisible, setModalInputVisible] = useState(false);
  const [selectedId, setSelectedId] = useState('');
  const [tipoOperacao, setTipoOperacao] = useState<'guardar' | 'resgatar'>('guardar');
  const [valorInput, setValorInput] = useState('');

  const caixinhaSelecionada = metas.find(m => m.id === selectedId);

  const abrirOpcoes = (id: string) => {
    setSelectedId(id);
    setModalAcaoVisible(true);
  };

  const prepararOperacao = (tipo: 'guardar' | 'resgatar') => {
    setTipoOperacao(tipo);
    setValorInput('');
    setModalAcaoVisible(false);
    setModalInputVisible(true);
  };

  const confirmarOperacao = () => {
    const valorNum = parseFloat(valorInput.replace(',', '.'));
    
    if (isNaN(valorNum) || valorNum <= 0) {
      setModalInputVisible(false);
      return;
    }

    setMetas(prev => prev.map(m => {
      if (m.id === selectedId) {
        if (tipoOperacao === 'guardar') {
          const novoSaldo = m.guardado + valorNum;
          if (novoSaldo > m.meta) {
            Platform.OS === 'web' ? window.alert("Limite atingido") : Alert.alert("Limite atingido", "O valor excedeu a meta.");
            return { ...m, guardado: m.meta };
          }
          return { ...m, guardado: novoSaldo };
        } else {
          if (valorNum > m.guardado) {
            Platform.OS === 'web' ? window.alert("Saldo Insuficiente") : Alert.alert("Saldo Insuficiente", `Disponível: R$ ${m.guardado.toFixed(2)}`);
            return m;
          }
          return { ...m, guardado: m.guardado - valorNum };
        }
      }
      return m;
    }));
    
    setModalInputVisible(false);
  };

  const totalGeral = metas.reduce((acc, curr) => acc + curr.guardado, 0);

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER CORRIGIDO COM VOLTAR E HAMBURGUER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerIcon}>
          <Ionicons name="chevron-back" size={28} color="#333" />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>CAIXINHAS</Text>
        
        <TouchableOpacity 
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())} 
          style={styles.headerIcon}
        >
          <Ionicons name="menu" size={28} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.totalCard}>
          <Text style={styles.totalLabel}>Total guardado</Text>
          <Text style={styles.totalValue}>R$ {totalGeral.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</Text>
        </View>

        {metas.map((item) => {
          const progresso = (item.guardado / item.meta) * 100;
          const metaAtingida = item.guardado >= item.meta;

          return (
            <TouchableOpacity key={item.id} style={styles.metaItem} onPress={() => abrirOpcoes(item.id)}>
              <View style={styles.metaTop}>
                <View style={styles.iconCircle}><Ionicons name={item.icone as any} size={22} color="#1D355E" /></View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.metaNome}>{item.nome}</Text>
                  <Text style={metaAtingida ? styles.metaAtingidaText : styles.metaStatus}>
                    {metaAtingida ? "Meta Atingida!" : `R$ ${item.guardado.toFixed(2)} / R$ ${item.meta.toFixed(2)}`}
                  </Text>
                </View>
                <Text style={styles.percentText}>{progresso.toFixed(0)}%</Text>
              </View>
              <View style={styles.progressContainer}>
                <View style={[styles.progressBar, { 
                    width: `${progresso > 100 ? 100 : progresso}%`, 
                    backgroundColor: metaAtingida ? '#16A34A' : item.cor 
                }]} />
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* MENU DE AÇÕES */}
      <Modal visible={modalAcaoVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <TouchableOpacity style={{flex: 1, width: '100%'}} onPress={() => setModalAcaoVisible(false)} />
          <View style={styles.menuContent}>
            <Text style={styles.menuTitle}>Saldo: R$ {caixinhaSelecionada?.guardado.toFixed(2)}</Text>
            <TouchableOpacity style={styles.menuBtn} onPress={() => prepararOperacao('guardar')}>
              <Ionicons name="add-circle-outline" size={22} color="#1D355E" /><Text style={styles.menuBtnText}>Guardar Dinheiro</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuBtn} onPress={() => prepararOperacao('resgatar')}>
              <Ionicons name="remove-circle-outline" size={22} color="#E63946" /><Text style={[styles.menuBtnText, { color: '#E63946' }]}>Resgatar Valor</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnClose} onPress={() => setModalAcaoVisible(false)}><Text style={styles.btnCloseText}>Voltar</Text></TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* MODAL DE INPUT */}
      <Modal visible={modalInputVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.inputCard}>
            <Text style={styles.modalTitle}>{tipoOperacao === 'guardar' ? 'Quanto quer guardar?' : 'Quanto quer resgatar?'}</Text>
            <Text style={styles.infoSaldo}>
              {tipoOperacao === 'resgatar' ? `Disponível: R$ ${caixinhaSelecionada?.guardado.toFixed(2)}` : `Meta: R$ ${caixinhaSelecionada?.meta.toFixed(2)}`}
            </Text>
            <TextInput 
              style={styles.input} 
              placeholder="0,00" 
              keyboardType="numeric"
              value={valorInput}
              onChangeText={setValorInput}
              autoFocus
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.btnCancel} onPress={() => setModalInputVisible(false)}><Text>Cancelar</Text></TouchableOpacity>
              <TouchableOpacity style={styles.btnSave} onPress={confirmarOperacao}><Text style={{color:'#FFF', fontWeight:'bold'}}>Confirmar</Text></TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F6F8' },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEE'
  },
  headerIcon: { padding: 5 },
  headerTitle: { fontWeight: 'bold', fontSize: 16, color: '#333' },
  totalCard: { backgroundColor: '#111', margin: 20, borderRadius: 20, padding: 25 },
  totalLabel: { color: '#AAA' },
  totalValue: { color: '#FFF', fontSize: 32, fontWeight: 'bold' },
  metaItem: { backgroundColor: '#FFF', marginHorizontal: 20, borderRadius: 15, padding: 15, marginBottom: 15, elevation: 2 },
  metaTop: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  iconCircle: { width: 40, height: 40, backgroundColor: '#F1F5F9', borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  metaNome: { fontWeight: 'bold' },
  metaStatus: { fontSize: 11, color: '#999' },
  metaAtingidaText: { fontSize: 11, color: '#16A34A', fontWeight: 'bold' },
  percentText: { fontWeight: 'bold', color: '#1D355E' },
  progressContainer: { height: 6, backgroundColor: '#EEE', borderRadius: 3, overflow: 'hidden' },
  progressBar: { height: '100%' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  menuContent: { backgroundColor: '#FFF', width: '100%', borderTopLeftRadius: 25, borderTopRightRadius: 25, padding: 20, position: 'absolute', bottom: 0 },
  menuTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#666' },
  menuBtn: { flexDirection: 'row', alignItems: 'center', paddingVertical: 18, borderBottomWidth: 1, borderBottomColor: '#F5F5F5' },
  menuBtnText: { marginLeft: 15, fontWeight: 'bold', fontSize: 16, color: '#1D355E' },
  btnClose: { marginTop: 10, alignItems: 'center', padding: 15 },
  btnCloseText: { color: '#999', fontWeight: 'bold' },
  inputCard: { backgroundColor: '#FFF', width: '85%', borderRadius: 20, padding: 25, alignItems: 'center' },
  modalTitle: { fontWeight: 'bold', fontSize: 16, marginBottom: 5 },
  infoSaldo: { fontSize: 13, color: '#666', marginBottom: 20 },
  input: { borderBottomWidth: 2, borderBottomColor: '#1D355E', width: '100%', fontSize: 24, textAlign: 'center', marginBottom: 25 },
  modalButtons: { flexDirection: 'row', width: '100%', justifyContent: 'space-between' },
  btnCancel: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  btnSave: { flex: 1, backgroundColor: '#1D355E', padding: 15, borderRadius: 12, alignItems: 'center' }
});