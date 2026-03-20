import { useSnackBarContext } from "@/context/snackbar.context";
import { AppError } from "../helpers/AppError";

/* Responsável por formatar a mensagem de erro e exibir na snackbar */
export default function useErrorHandler() {
  const { notify } = useSnackBarContext();
  const handleError = (error: unknown, defaultMessage?: string) => {
    const isAppError = error instanceof AppError;
    const message = isAppError ? error.message : defaultMessage ?? 'Falha na requisição';

    notify({
      message,
      messageType: 'ERROR'
    });
  }
  return {
    handleError
  }
}