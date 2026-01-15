import React, { Component, ErrorInfo, ReactNode } from "react";
import { Button, Result } from "antd";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({ errorInfo });
    // Log error to console in development
    if (process.env.NODE_ENV === "development") {
      console.error("ErrorBoundary caught an error:", error, errorInfo);
    }
  }

  handleReset = (): void => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  handleReload = (): void => {
    window.location.reload();
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <Result
          status="error"
          title="Algo salió mal"
          subTitle="Ha ocurrido un error inesperado. Por favor, intente nuevamente."
          extra={[
            <Button key="retry" onClick={this.handleReset}>
              Intentar de nuevo
            </Button>,
            <Button key="reload" type="primary" onClick={this.handleReload}>
              Recargar página
            </Button>,
          ]}
        >
          {process.env.NODE_ENV === "development" && this.state.error && (
            <div
              style={{
                textAlign: "left",
                padding: "16px",
                background: "#fff2f0",
                border: "1px solid #ffccc7",
                borderRadius: "8px",
                marginTop: "16px",
              }}
            >
              <p>
                <strong>Error:</strong> {this.state.error.message}
              </p>
              {this.state.errorInfo && (
                <details style={{ whiteSpace: "pre-wrap", marginTop: "8px" }}>
                  <summary>Stack trace</summary>
                  {this.state.errorInfo.componentStack}
                </details>
              )}
            </div>
          )}
        </Result>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
