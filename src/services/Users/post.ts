const API_URL = "http://10.108.22.20:3001";

// Função genérica para evitar repetição
const apiRequest = async (endpoint: string, dados: any) => {
  try {
    const res = await fetch(`${API_URL}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados),
    });

    const responseData = await res.json();

    if (!res.ok) {
      console.error(`Erro em ${endpoint}:`, responseData);
      throw new Error(responseData.message || "Erro na requisição");
    }

    return responseData;
  } catch (error) {
    console.error("Erro de rede/servidor:", error);
    throw error;
  }
};

export const UserLogin = (dados: any) => apiRequest("/users/login", dados);
export const UserCadastro = (dados: any) => apiRequest("/users/cadastro", dados);