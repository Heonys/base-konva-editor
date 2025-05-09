import { Component, type PropsWithChildren, type ErrorInfo } from "react";
import { createPortal } from "react-dom";

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<PropsWithChildren, State> {
  state: State = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return createPortal(<div>적당한 에러 메시지</div>, document.body);
    }
    return this.props.children;
  }
}
