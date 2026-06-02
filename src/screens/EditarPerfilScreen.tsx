import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { UserPut } from "../services/Users/post";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function EditarPerfilScreen({ navigation }: any) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    if (!email || !nome) {
      Alert.alert("Aviso", "Preencha todos os campos!");
      return;
    }

    const userId = await AsyncStorage.getItem("@user_id");

    setLoading(true);

    try {
      //  Correto: Primeiro o objeto com os dados, depois o ID separado
      const resposta = await UserPut(
        { name: nome, email: email, tipo: "USER" },
        Number(userId),
      );
      navigation.goBack();
    } catch (error: any) {
      console.error("Erro detectado:", error.message);
      Alert.alert("Erro", "E-mail ou senha incorretos. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER COM BOTÃO VOLTAR */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color="#333" />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>PERFIL</Text>
          <Text style={styles.headerSubtitle}>
            Vamos organizar suas finanças?
          </Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Ionicons name="log-out-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <View style={styles.form}>
        <View style={styles.avatarContainer}>
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
            }}
            style={styles.avatar}
          />
          <TouchableOpacity style={styles.cameraBtn}>
            <Ionicons name="pencil" size={16} color="#FFF" />
          </TouchableOpacity>
        </View>

        <View style={styles.inputBox}>
          <Ionicons name="person-outline" size={20} color="#999" />
          <TextInput
            style={styles.input}
            placeholder="Nome"
            value={nome}
            onChangeText={setNome}
          />
        </View>

        <View style={styles.inputBox}>
          <Ionicons name="mail-outline" size={20} color="#999" />
          <TextInput
            style={styles.input}
            placeholder="exemplo@email.com"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <TouchableOpacity style={styles.saveBtn} onPress={handleUpdate}>
          <Text style={styles.saveBtnText}>Salvar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 10,
  },
  headerTitleContainer: { flex: 1, marginLeft: 15 },
  headerTitle: { fontWeight: "bold", fontSize: 14 },
  headerSubtitle: { fontSize: 11, color: "#777" },
  form: { padding: 25, alignItems: "center" },
  avatarContainer: { position: "relative", marginBottom: 30 },
  avatar: { width: 110, height: 110, borderRadius: 55 },
  cameraBtn: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#1D355E",
    padding: 8,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: "#FFF",
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
    width: "100%",
    paddingHorizontal: 15,
    height: 55,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#EEE",
  },
  input: { flex: 1, marginLeft: 12, color: "#333", fontSize: 15 },
  phoneBox: { flexDirection: "row", width: "100%", marginBottom: 15 },
  countryCode: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#EEE",
    marginRight: 10,
  },
  phoneInput: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    paddingHorizontal: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#EEE",
    fontSize: 15,
  },
  mudarSenhaBtn: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
    marginBottom: 25,
  },
  mudarSenhaText: { fontSize: 15, color: "#333" },
  saveBtn: {
    backgroundColor: "#1D355E",
    width: "100%",
    height: 55,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  saveBtnText: { color: "#FFF", fontWeight: "bold", fontSize: 16 },
});
