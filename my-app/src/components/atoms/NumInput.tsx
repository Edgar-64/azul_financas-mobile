import { TextInput } from "react-native";
import React, { useState } from "react";

export function NumInput() {
  const [number, setNumber] = useState("");
  <TextInput
        style={styles.input}
        placeholder="Número"
        value={number}
        onChangeText={setNumber}
        secureTextEntry
    />
}

const styles = {
  input: {
    backgroundColor: '#9cdbff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#000000',
  },
};