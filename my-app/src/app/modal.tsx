import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';
import { RecuperarSenha } from '../components/organisms/RecupSenha';

export default function ModalScreen() {
  return (
    <>
    <RecuperarSenha></RecuperarSenha>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
