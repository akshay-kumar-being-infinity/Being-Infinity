// UnderDevelopment.tsx
import React from 'react';

const Contact: React.FC = () => {
   return (
    <div className="min-h-screen bg-[hsl(var(--bg-dark))] flex items-center justify-center p-8">
      <div className="max-w-md w-full text-center space-y-8">
        {/* Icon */}
        <div className="w-24 h-24 mx-auto bg-[hsl(var(--bg-surface)/0.5)] rounded-2xl p-6 border border-[hsl(var(--border)/0.5)]">
          <svg 
            className="w-12 h-12 mx-auto text-[hsl(var(--primary-light))]" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M13 10V3L4 14h7v7l9-11h-7z" 
            />
          </svg>
        </div>

        {/* Title */}
        <div>
          <h1 className="text-4xl font-bold text-[hsl(var(--text-primary))] mb-4">
            Under Development
          </h1>
          <p className="text-xl text-[hsl(var(--text-muted))] font-medium">
            Contact Page is coming soon
          </p>
        </div>

        {/* Status */}
        <div className="bg-[hsl(var(--bg-surface)/0.5)] p-6 rounded-xl border border-[hsl(var(--border)/0.5)]">
          <div className="w-3 h-3 bg-[hsl(var(--primary-light))] rounded-full mx-auto mb-4 animate-pulse" />
          <p className="text-[hsl(var(--text-muted))] text-sm">
            Actively in progress
          </p>
        </div>

        {/* CTA */}
        <button className="w-full px-8 py-4 bg-[hsl(var(--bg-surface)/0.6)] border border-[hsl(var(--border)/0.5)] rounded-xl hover:bg-[hsl(var(--bg-surface)/0.8)] transition-all duration-200 font-medium text-[hsl(var(--text-primary))] text-lg">
          Get Notified
        </button>

        {/* Timeline */}
        <p className="text-sm text-[hsl(var(--text-muted))] border-t border-[hsl(var(--border)/0.3)] pt-6">
          Expected Q2 2026
        </p>
      </div>
    </div>
  );
};

export default Contact;
