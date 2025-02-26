import React, { Component, ReactNode } from "react";

interface ErrorProps {
  children: ReactNode;
}

interface ErrorState {
  hasError: boolean;
}

class Errorhandler extends Component<ErrorProps, ErrorState> {
  constructor(props: ErrorProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h2>Oops, there was a problem. Try again soon</h2>;
    }

    return this.props.children;
  }
}

export default Errorhandler;
