import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Image } from 'react-native';

export default function RecSenhaScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER COM A LOGO EM VEZ DE TEXTO */}
      <View style={styles.header}>
        <Image 
          source={require('../assets/logo2.png')} 
          style={styles.logo} 
          resizeMode="contain" 
        />
      </View>

      <View style={styles.form}>
        <Text style={styles.title}>ESQUECEU SUA SENHA?</Text>
        <Text style={styles.subtitle}>
          Insira seu email e enviaremos um código para trocar sua senha.
        </Text>
        
        <TextInput 
          style={styles.input} 
          placeholder="E-mail" 
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TouchableOpacity 
          style={styles.btnPrimary}
          activeOpacity={0.8}
          onPress={() => {
            // Aqui você pode adicionar a lógica de envio
            alert('E-mail enviado!');
            navigation.goBack();
          }}
        >
          <Text style={styles.btnText}>Enviar</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => navigation.goBack()} 
          style={styles.footer}
        >
          <Text style={styles.linkCenter}>
            Lembrou a senha? <Text style={styles.boldText}>Voltar</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  header: { 
    height: '35%', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  logo: { 
    width: '80%', 
    height: 150 
  },
  form: { 
    flex: 1, 
    paddingHorizontal: 30 
  },
  title: { 
    fontSize: 14, 
    fontWeight: 'bold', 
    color: '#000',
    marginBottom: 5 
  },
  subtitle: { 
    color: '#666', 
    fontSize: 13, 
    marginBottom: 25,
    lineHeight: 18 
  },
  input: { 
    backgroundColor: '#F1F1F1', 
    padding: 18, 
    borderRadius: 12, 
    marginBottom: 20,
    color: '#333'
  },
  btnPrimary: { 
    backgroundColor: '#1D355E', 
    padding: 18, 
    borderRadius: 12, 
    alignItems: 'center',
    elevation: 2 
  },
  btnText: { 
    color: '#FFF', 
    fontWeight: 'bold', 
    fontSize: 16 
  },
  footer: { 
    marginTop: 30,
    paddingVertical: 10 
  },
  linkCenter: { 
    textAlign: 'center', 
    color: '#666', 
    fontSize: 14 
  },
  boldText: { 
    fontWeight: 'bold', 
    color: '#1D355E' 
  }
});