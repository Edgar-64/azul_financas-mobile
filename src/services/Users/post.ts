const API_URL = "http://10.108.22.20:3001";

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
    const responseData = res.status !== 204 ? await res.json() : null;

    if (!res.ok) {
      throw new Error(responseData?.message || `Erro na requisição ${method}`);
    }

    return responseData;
  } catch (error) {
    console.error("Erro de rede/servidor:", error);
    throw error;
  }
};

// --- MÉTODOS EXPORTADOS ---

export const UserCadastro = (dados: any) => apiRequest("POST", "/users/cadastro", dados);
export const UserLogin = (dados: any) => apiRequest("POST", "/users/login", dados);
export const PayGet = () => apiRequest("GET", "/Pay");
export const ContaGet = (userId: string | number) => apiRequest("GET", `/Conta/${userId}`);
export const UserGet = (userId: string | number) => apiRequest("GET", `/users/${userId}`);