import { message, notification } from "antd";

export type NotificationType = "success" | "error" | "info" | "warning";

interface NotificationConfig {
  message: string;
  description?: string;
  duration?: number;
}

// Toast messages (short, auto-dismiss)
export const toast = {
  success: (content: string, duration: number = 3) => {
    message.success(content, duration);
  },
  error: (content: string, duration: number = 5) => {
    message.error(content, duration);
  },
  warning: (content: string, duration: number = 4) => {
    message.warning(content, duration);
  },
  info: (content: string, duration: number = 3) => {
    message.info(content, duration);
  },
  loading: (content: string, duration: number = 0) => {
    return message.loading(content, duration);
  },
};

// Notifications (more prominent, with title and description)
export const notify = {
  success: (config: NotificationConfig) => {
    notification.success({
      message: config.message,
      description: config.description,
      duration: config.duration ?? 4,
      placement: "topRight",
    });
  },
  error: (config: NotificationConfig) => {
    notification.error({
      message: config.message,
      description: config.description,
      duration: config.duration ?? 6,
      placement: "topRight",
    });
  },
  warning: (config: NotificationConfig) => {
    notification.warning({
      message: config.message,
      description: config.description,
      duration: config.duration ?? 5,
      placement: "topRight",
    });
  },
  info: (config: NotificationConfig) => {
    notification.info({
      message: config.message,
      description: config.description,
      duration: config.duration ?? 4,
      placement: "topRight",
    });
  },
};

// API Error handler - extracts user-friendly message from error
export const getErrorMessage = (error: any): string => {
  if (error.response) {
    // Server responded with error status
    const status = error.response.status;
    const data = error.response.data;

    // Check for custom error message from backend
    if (data?.message) {
      return data.message;
    }
    if (data?.detail) {
      return data.detail;
    }
    if (data?.error) {
      return data.error;
    }

    // Default messages by status code
    switch (status) {
      case 400:
        return "Datos inválidos. Por favor, verifique la información ingresada.";
      case 401:
        return "No autorizado. Por favor, inicie sesión nuevamente.";
      case 403:
        return "No tiene permisos para realizar esta acción.";
      case 404:
        return "El recurso solicitado no fue encontrado.";
      case 409:
        return "Conflicto: el recurso ya existe o hay un conflicto de datos.";
      case 422:
        return "Error de validación. Por favor, verifique los datos ingresados.";
      case 500:
        return "Error interno del servidor. Por favor, intente más tarde.";
      case 502:
        return "Error de conexión con el servidor. Por favor, intente más tarde.";
      case 503:
        return "Servicio no disponible. Por favor, intente más tarde.";
      default:
        return `Error del servidor (${status}). Por favor, intente nuevamente.`;
    }
  } else if (error.request) {
    // Request was made but no response received
    return "No se pudo conectar con el servidor. Verifique su conexión a internet.";
  } else {
    // Something happened in setting up the request
    return error.message || "Ha ocurrido un error inesperado.";
  }
};

// Show API error as notification
export const showApiError = (error: any, customMessage?: string) => {
  const errorMessage = customMessage || getErrorMessage(error);
  notify.error({
    message: "Error",
    description: errorMessage,
  });
};

// Show API success as toast
export const showApiSuccess = (message: string = "Operación exitosa") => {
  toast.success(message);
};

export default {
  toast,
  notify,
  getErrorMessage,
  showApiError,
  showApiSuccess,
};
