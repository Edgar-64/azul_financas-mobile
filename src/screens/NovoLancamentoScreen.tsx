import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function NovoLancamentoScreen({ navigation }: any) {
  return (
    <View style={styles.overlay}>

      {/* FUNDO CLICÁVEL PRA FECHAR */}
      <TouchableOpacity
        style={{ flex: 1 }}
        onPress={() => navigation.goBack()}
        activeOpacity={1}
      />

      {/* MODAL */}
      <View style={styles.modal}>
        
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.title}>NOVO LANÇAMENTO</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="close" size={20} />
          </TouchableOpacity>
        </View>

        {/* INPUTS */}
        <TextInput
          placeholder="Título da transação"
          style={styles.input}
        />

        <View style={styles.input}>
          <Text style={{ color: '#999' }}>Categoria</Text>
        </View>

        <View style={styles.row}>
          <TextInput
            placeholder="R$ 0,00"
            style={[styles.input, { flex: 1 }]}
          />
          <TextInput
            placeholder="00/00/0000"
            style={[styles.input, { flex: 1, marginLeft: 10 }]}
          />
        </View>

        {/* BOTÕES */}
        <View style={styles.row}>
          <TouchableOpacity style={styles.entrada}>
            <Text style={{ color: '#16A34A', fontWeight: 'bold' }}>
              Entrada ▲
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.saida}>
            <Text style={{ color: '#DC2626', fontWeight: 'bold' }}>
              Saída ▼
            </Text>
          </TouchableOpacity>
        </View>

        {/* DIVIDER */}
        <View style={styles.divider} />

        {/* BOTÃO SALVAR */}
        <TouchableOpacity style={styles.btnSalvar}>
          <Text style={styles.textSalvar}>Salvar</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end'
  },

  modal: {
    backgroundColor: '#FFF',
    padding: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15
  },

  title: {
    fontSize: 12,
    fontWeight: 'bold'
  },

  input: {
    backgroundColor: '#F1F3F5',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10
  },

  row: {
    flexDirection: 'row',
    marginTop: 5
  },

  entrada: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#16A34A',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginRight: 5
  },

  saida: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#DC2626',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginLeft: 5
  },

  divider: {
    height: 1,
    backgroundColor: '#EEE',
    marginVertical: 15
  },

  btnSalvar: {
    backgroundColor: '#1D355E',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center'
  },

  textSalvar: {
    color: '#FFF',
    fontWeight: 'bold'
  }
});