// ============================================================================
// REACT APPLICATION ENTRY POINT
// ============================================================================
// This file initializes and renders the React application
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

// ============================================================================
// IMPORTS
// ============================================================================
import './index.css';                    // Global styles
import App from './AppOptimized.jsx';     // Main application component
import ErrorBoundary from './components/ErrorBoundary.jsx'; // Error handling

// ============================================================================
// APPLICATION RENDERING
// ============================================================================
// Create root element and render the application with error boundaries
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>,
);
