import { useEffect, useState, useCallback } from "react";
import { useNavigation } from "@react-navigation/native";

/**
 * Hook Coringa para recarregar dados automaticamente ao entrar na tela
 * @param callbackFuncao A função que busca os dados da API (ex: carregarTudo)
 */
export function useAutoReload(callbackFuncao: () => Promise<void> | void) {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);

  // Função disparada para recarregar manualmente (útil para Pull-to-Refresh)
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await callbackFuncao();
    } catch (error) {
      console.error("Erro ao rodar recarregamento automático:", error);
    } finally {
      setRefreshing(false);
    }
  }, [callbackFuncao]);

  useEffect(() => {
    // Escuta o evento 'focus'. Toda vez que a tela ganha foco, ela recarrega.
    const unsubscribe = navigation.addListener("focus", () => {
      callbackFuncao();
    });

    return unsubscribe; // Remove o listener ao sair da tela para evitar vazamento de memória
  }, [navigation, callbackFuncao]);

  return { refreshing, onRefresh };
}