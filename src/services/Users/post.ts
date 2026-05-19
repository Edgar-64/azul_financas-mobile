import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "http://172.17.240.1:3001";

const apiRequest = async (method: "GET" | "POST" | "PUT" | "DELETE", endpoint: string, dados: any = null) => {
  try {
    const config: RequestInit = {
      method,
      headers: { "Content-Type": "application/json" },
    };

    if (dados && method !== "GET") {
      config.body = JSON.stringify(dados);
    }

    const res = await fetch(`${API_URL}${endpoint}`, config);

    // 1. Lemos a resposta do servidor primeiro como texto puro
    const responseText = await res.text();
    
    // 2. Só tentamos converter para JSON se o texto NÃO estiver vazio e o status não for 204
    let responseData = null;
    if (res.status !== 204 && responseText.trim().length > 0) {
      try {
        responseData = JSON.parse(responseText);
      } catch (e) {
        // Caso o backend devolva algo que não seja JSON (Ex: um erro em HTML do Express)
        throw new Error(`O servidor não retornou um formato JSON válido. Resposta recebida: ${responseText}`);
      }
    }

    if (!res.ok) {
      throw new Error(responseData?.message || `Erro na requisição ${method} (Status: ${res.status})`);
    }

    // Se o corpo veio vazio mas a requisição deu certo (Ex: status 200/201 sem body), 
    // retorna um objeto vazio para não quebrar os desestruturadores do React (ex: const { nome } = dados)
    return responseData || {};
  } catch (error) {
    console.error("Erro de rede/servidor:", error);
    throw error;
  }
};

// --- MÉTODOS EXPORTADOS ---

export const UserCadastro = (dados: any) => apiRequest("POST", "/users/cadastro", dados);
export const UserLogin = (dados: any) => apiRequest("POST", "/users/login", dados);
export const PayGet = (userId: string | number, query: any) => apiRequest("GET", `/Pay/${userId}/contas?filtro=${query}`);
export const PayPostPagar = (dados: any) => apiRequest("POST", "/Pay/pagar", dados);
export const PayPostReceber = (dados: any) => apiRequest("POST", "/Pay/receber", dados);
export const ContaGet = (userId: string | number) => apiRequest("GET", `/conta/${userId}`);
export const ContaPost = (dados: any) => apiRequest("POST", "/Conta/conta", dados);
export const UserGet = (userId: string | number) => apiRequest("GET", `/users/${userId}`);
export const CaixaGet = (userId: string | number) => apiRequest("GET", `/caixa/${userId}`);
export const CaixaPostGuardar = (dados: any) => apiRequest("GET", `/caixa/guardar`);
export const CaixaPostRecuperar = (dados: any) => apiRequest("GET", `/caixa/recuperar`);