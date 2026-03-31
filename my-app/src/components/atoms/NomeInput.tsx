import { TextInput } from "react-native";
import React, { useState } from "react";

export function NomeInput() {
  const [name, setName] = useState("");
  <TextInput
    style={styles.input}
    placeholder="Nome"
    value={name}
    onChangeText={setName}
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
