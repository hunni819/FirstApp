import * as React from 'react';
import { Text, View } from 'react-native';

type P = any;
type S = {
  hasError: boolean;
  error: null;
};
type SS = any;

export class ErrorBoundary extends React.Component<P, S, SS> {
  constructor(props: P) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error: error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // ...
  }

  render() {
    const { hasError, error } = this.state;

    if (hasError) {
      return (
        <View style={{ flex: 1, backgroundColor: '#000' }}>
          <Text>{error}</Text>
        </View>
      );
    }

    return this.props.children;
  }
}
