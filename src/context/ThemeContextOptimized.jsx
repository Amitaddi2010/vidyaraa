// ============================================================================
// THEME CONTEXT
// ============================================================================
// Provides theme management (light/dark mode) for the entire application
import React, { createContext, useContext, useState, useEffect } from 'react';

// ============================================================================
// THEME CONTEXT INSTANCE
// ============================================================================
const ThemeContext = createContext();

// ============================================================================
// CUSTOM HOOK FOR THEME
// ============================================================================
// Provides easy access to theme context throughout the app
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

// ============================================================================
// THEME PROVIDER COMPONENT
// ============================================================================
// Manages theme state and provides theme context to child components
export const ThemeProvider = ({ children }) => {
    // ============================================================================
    // THEME STATE MANAGEMENT
    // ============================================================================
    // Initialize theme from localStorage or default to 'light'
    const [theme, setTheme] = useState(() => {
        // Check if we're in browser environment
        if (typeof window !== 'undefined') {
            const savedTheme = localStorage.getItem('theme');
            return savedTheme || 'light';
        }
        return 'light';
    });

    // ============================================================================
    // THEME EFFECTS
    // ============================================================================
    // Apply theme to document and save to localStorage when theme changes
    useEffect(() => {
        // Set data-theme attribute on document root
        document.documentElement.setAttribute('data-theme', theme);
        
        // Save theme preference to localStorage
        localStorage.setItem('theme', theme);
    }, [theme]);

    // ============================================================================
    // THEME FUNCTIONS
    // ============================================================================
    // Toggle between light and dark themes
    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    // Set a specific theme (light/dark)
    const setSpecificTheme = (newTheme) => {
        setTheme(newTheme);
    };

    // ============================================================================
    // PROVIDER VALUE
    // ============================================================================
    const contextValue = {
        theme,
        toggleTheme,
        setSpecificTheme
    };

    return (
        <ThemeContext.Provider value={contextValue}>
            {children}
        </ThemeContext.Provider>
    );
};

// ============================================================================
// EXPORTS
// ============================================================================
export default ThemeContext;
