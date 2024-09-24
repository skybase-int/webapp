import React from 'react';
import { Error } from './Error';
export class ErrorBoundary extends React.Component<{
  componentName?: string;
  children: React.ReactNode;
  variant?: 'large' | 'medium' | 'small';
}> {
  componentName = 'component';
  variant: 'large' | 'small' | 'medium' = 'large';

  constructor(props: {
    componentName?: string;
    children: React.ReactNode;
    variant?: 'large' | 'medium' | 'small';
  }) {
    super(props);
    this.state = { hasError: false };
    this.variant = props.variant || this.variant;
    this.componentName = props.componentName || this.componentName;
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    // You can also log the error to an error reporting service
    console.error({ error, errorInfo });
  }

  render() {
    if ((this.state as any).hasError) {
      // You can render any custom fallback UI
      return <Error variant={this.variant} />;
    }

    return this.props.children;
  }
}
