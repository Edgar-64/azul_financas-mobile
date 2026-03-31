import React, { use, useState } from 'react';
import { ImageBackground, ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Logo from '../atoms/Logo'
import { Link } from 'expo-router';
import { CadasBut } from '../atoms/CadasBut';
import { NumInput } from '../atoms/NumInput';

export function TelaCadastro() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [number, setNumber] = useState('');

  return (
    <ImageBackground
          source={require("../../assets/images/Tela Splash.png")}
          style={styles.fixedBackground}
          resizeMode="cover"
        >
    <ScrollView contentContainerStyle={styles.scrollContainer}>
    <View style={styles.container}>
        <Logo/>
      <Text style={styles.title}>Cadastro</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TextInput
        style={styles.input}
        placeholder="Número"
        value={number}
        onChangeText={setNumber}
        secureTextEntry
      />

      <CadasBut style={styles.button}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </CadasBut>

      <Text style={styles.footer}>Já possui uma conta?
        <Link href="/" style={styles.link}> Faça Login</Link>
      </Text>
    </View>
    </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  fixedBackground: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  link:{
    color: '#93e9ff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#53c0ff',
  },
  input: {
    backgroundColor: '#9cdbff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#000000',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  footer: {
    marginTop: 15,
    textAlign: 'center',
    color: '#adadad',
  },
});