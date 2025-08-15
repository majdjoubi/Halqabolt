import { StrictMode } from 'react';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Error boundary for better error handling
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">حدث خطأ</h1>
            <p className="text-gray-600 mb-4">عذراً، حدث خطأ في التطبيق</p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700"
            >
              إعادة تحميل الصفحة
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </StrictMode>
  );
} else {
  console.error('Root element not found');
  // Create root element if it doesn't exist
  const newRoot = document.createElement('div');
  newRoot.id = 'root';
  document.body.appendChild(newRoot);
  
  createRoot(newRoot).render(
    <StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </StrictMode>
  );
}