import { Component, type PropsWithChildren, type ErrorInfo } from "react";
import { createPortal } from "react-dom";

import { StaticIcon } from "@/icons/StaticIcon";

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
      return createPortal(
        <div className="fixed inset-0 flex items-center justify-center z-[100] bg-white">
          <div className="flex flex-col items-center gap-2 select-none">
            <StaticIcon iconName="error" size={30} />
            <h2 className="text-lg uppercase font-bold mb-4">An Error Occurred</h2>
          </div>
        </div>,
        document.body,
      );
    }
    return this.props.children;
  }
}
