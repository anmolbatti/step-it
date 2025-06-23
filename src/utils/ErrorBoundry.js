import React, { Component } from 'react';
import { Text, View } from 'react-native';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state to indicate error has occurred
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to an error reporting service or console
    console.error("Error caught by Error Boundary:", error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // Render custom fallback UI
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Error occurred: {this.state.error && this.state.error.toString()}</Text>
          {/* You can render additional information or buttons to handle errors */}
        </View>
      );
    }

    // Render children if no error
    return this.props.children; 
  }
}

export default ErrorBoundary;
