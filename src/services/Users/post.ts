import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "http://172.17.240.1:3001";
const apiRequest = async (
  method: "GET" | "POST" | "PUT" | "DELETE",
  endpoint: string,
  dados: any = null,
) => {
  try {
    const config: RequestInit = {
      method,
      headers: { "Content-Type": "application/json" },
    };

    if (dados && method !== "GET") {
      config.body = JSON.stringify(dados);
    }

    const res = await fetch(`${API_URL}${endpoint}`, config);

    const responseText = await res.text();

    let responseData = null;
    if (res.status !== 204 && responseText.trim().length > 0) {
      try {
        responseData = JSON.parse(responseText);
      } catch (e) {
        throw new Error(
          `O servidor não retornou um formato JSON válido. Resposta recebida: ${responseText}`,
        );
      }
    }

    if (!res.ok) {
      throw new Error(
        responseData?.message ||
          `Erro na requisição ${method} (Status: ${res.status})`,
      );
    }

    // --- CORREÇÃO AQUI ---
    // Se for um método GET e o servidor não devolveu dados (vazio),
    // precisamos retornar NULL ou um array vazio [], e NÃO um objeto genérico {}
    if (method === "GET") {
      if (
        !responseData ||
        (typeof responseData === "object" &&
          Object.keys(responseData).length === 0)
      ) {
        return null; // Retorna null explicitamente para o front saber que não há dados
      }
    }

    return responseData || {};
  } catch (error) {
    console.error("Erro de rede/servidor:", error);
    throw error;
  }
};

// --- MÉTODOS EXPORTADOS ---

export const UserCadastro = (dados: any) =>
  apiRequest("POST", "/users/cadastro", dados);
export const UserLogin = (dados: any) =>
  apiRequest("POST", "/users/login", dados);
export const PayGet = (userId: string | number, query: any) =>
  apiRequest("GET", `/Pay/${userId}/contas?filtro=${query}`);
export const PayPostPagar = (dados: any) =>
  apiRequest("POST", "/Pay/pagar", dados);
export const PayPostReceber = (dados: any) =>
  apiRequest("POST", "/Pay/receber", dados);
export const ContaGet = (userId: string | number) =>
  apiRequest("GET", `/conta/${userId}`);
export const ContaPost = (dados: any) =>
  apiRequest("POST", "/Conta/conta", dados);
export const UserGet = (userId: string | number) =>
  apiRequest("GET", `/users/${userId}`);
export const UserPut = (dados: any, userId: string | number) =>
  apiRequest("PUT", `/users/${userId}`, dados);
export const CaixaGet = (userId: string | number) =>
  apiRequest("GET", `/caixa/${userId}`);
export const CaixaPostGuardar = (dados: any) =>
  apiRequest("POST", `/caixa/guardar`, dados);
export const CaixaPostRecuperar = (dados: any) =>
  apiRequest("POST", `/caixa/recuperar`, dados);
export const PayDelete = (idLancamento: string | number) =>
  apiRequest("DELETE", `/Pay/${idLancamento}`);
