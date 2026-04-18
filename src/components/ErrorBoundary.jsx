import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error('App crashed during render:', error, errorInfo);
    }

    handleReload = () => {
        window.location.reload();
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-[#020202] text-slate-100 flex items-center justify-center px-6">
                    <div className="max-w-xl w-full rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 text-center shadow-2xl">
                        <p className="text-xs font-black uppercase tracking-[0.35em] text-white/40 mb-4">
                            Vidyaraa
                        </p>
                        <h1 className="text-3xl font-semibold text-white mb-4">
                            The page hit a startup error.
                        </h1>
                        <p className="text-sm leading-7 text-slate-300 mb-6">
                            The app recovered safely instead of showing a blank screen. Reload once to retry.
                        </p>
                        <button
                            type="button"
                            onClick={this.handleReload}
                            className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-bold text-black transition-transform hover:scale-[1.02]"
                        >
                            Reload site
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
