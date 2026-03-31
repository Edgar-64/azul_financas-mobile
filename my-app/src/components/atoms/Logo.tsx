import React from "react";
import { View, Image, StyleSheet } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Image source={require("../../assets/images/logo.png")} style={styles.imagem} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imagem: {
    width: 100,
    height: 100,
    borderRadius: 50, // Deixa a imagem redonda
  },
});
