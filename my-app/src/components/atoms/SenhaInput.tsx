import { TextInput } from "react-native";
import React, { useState } from "react";

export function SenhaInput() {
  const [password, setPassword] = useState("");
  <TextInput
    style={styles.input}
    placeholder="Senha"
    value={password}
    onChangeText={setPassword}
    secureTextEntry
  />;
}

const styles = {
  input: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd",
  },
};
