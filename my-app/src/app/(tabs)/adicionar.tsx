import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function AddMenu() {
  const router = useRouter();
  
  return (
    <View style={styles.overlay}>
      <View style={styles.menuContainer}>
        {/* Opção Receita */}
        <TouchableOpacity style={styles.optionRow} onPress={() => router.push('/add-receita')}>
          <Text style={styles.optionLabel}>Receita</Text>
          <View style={[styles.miniButton, { backgroundColor: '#4fd1c5' }]}>
            <Ionicons name="add" size={20} color="white" />
          </View>
        </TouchableOpacity>

        {/* Opção Gasto */}
        <TouchableOpacity style={styles.optionRow} onPress={() => router.push('/add-gasto')}>
          <Text style={styles.optionLabel}>Gasto</Text>
          <View style={[styles.miniButton, { backgroundColor: '#f56565' }]}>
            <Ionicons name="remove" size={20} color="white" />
          </View>
        </TouchableOpacity>

        {/* Opção Crédito */}
        <TouchableOpacity style={styles.optionRow} onPress={() => router.push('/add-credito')}>
          <Text style={styles.optionLabel}>Crédito</Text>
          <View style={[styles.miniButton, { backgroundColor: '#ecc94b' }]}>
            <Ionicons name="card" size={18} color="white" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end', alignItems: 'center' },
  menuContainer: { marginBottom: 120, alignItems: 'flex-end', width: '100%', paddingRight: 30 },
  optionRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  optionLabel: { color: 'white', fontWeight: 'bold', marginRight: 10, fontSize: 16 },
  miniButton: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }
});