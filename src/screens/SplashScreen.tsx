import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Image, StatusBar, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function SplashScreen({ navigation }: any) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 3000);

    return () => clearTimeout(timer);
  }, [fadeAnim, navigation]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      
      <LinearGradient
        colors={['#1D355E', '#111D35']}
        style={styles.background}
      >
        <Animated.View style={{ opacity: fadeAnim }}>
          <Image 
            // CAMINHO AJUSTADO: volta uma pasta (sai de screens) e entra em assets
            source={require('../assets/logo.png')} 
            style={styles.logo}
            resizeMode="contain"
            // Se a imagem sumir, isso ajuda a debugar
            onLoad={() => console.log("Logo carregada com sucesso!")}
            onError={(e) => console.log("Erro ao carregar imagem:", e.nativeEvent.error)}
          />
        </Animated.View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200, // Aumentei um pouco para dar destaque
    height: 200,
  },
});