import * as React from 'react';
import { Text, View } from 'react-native';

type P = any;
type S = {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
};
type SS = any;

export class ErrorBoundary extends React.Component<P, S, SS> {
  constructor(props: P) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error: null, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({ error, errorInfo });
  }

  render() {
    const { hasError, error } = this.state;

    if (hasError) {
      return (
        <View
          style={{
            flex: 1,
            backgroundColor: '#000',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              fontSize: 30,
              color: 'white',
            }}
          >
            {`${error}`}
          </Text>
        </View>
      );
    }

    return this.props.children;
  }
}
