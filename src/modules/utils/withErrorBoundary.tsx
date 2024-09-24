import { ErrorBoundary } from '@/modules/layout/components/ErrorBoundary';

export const withErrorBoundary = (Component: JSX.Element) => {
  return <ErrorBoundary>{Component}</ErrorBoundary>;
};
