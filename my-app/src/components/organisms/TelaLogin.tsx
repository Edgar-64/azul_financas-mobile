import React, { useState } from 'react';
import { ImageBackground, View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import Logo from '../atoms/Logo';
import { Link } from 'expo-router';
import { LoginBut } from '../atoms/LoginBut';

export function TelaLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <ImageBackground 
      source={require('../../assets/images/Tela Splash.png')} 
      style={styles.fixedBackground}
      resizeMode="cover" >

    <ScrollView contentContainerStyle={styles.scrollContainer}>
    <View style={styles.container}>
        <Logo/>
      <Text style={styles.title}>Login</Text>

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

      <LoginBut>
        <Text style={styles.buttonText}>Entrar</Text>
      </LoginBut>

      <Text style={styles.footer}>Não tem uma conta?
        <Link href="/two" style={styles.link}> Cadastre-se</Link>
      </Text>

      <Text style={styles.footer}>Esqueceu a senha?
        <Link href="/modal" style={styles.link}> Recuperar</Link>
      </Text>
    </View>
    </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  fixedBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
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
    borderColor: '#ddd',
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
    color: '#555',
  },
});