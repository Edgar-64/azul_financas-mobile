import { TextInput } from "react-native";
import React, { useState } from "react";

export function EmailInput() {
  const [email, setEmail] = useState("");
  <TextInput
    style={styles.input}
    placeholder="Email"
    value={email}
    onChangeText={setEmail}
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
