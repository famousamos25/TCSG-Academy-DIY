'use client';

import React from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

function ErrorFallback({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-6">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Something went wrong
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            {error.message || 'An unexpected error occurred. Please try again.'}
          </p>
          <div className="space-x-3">
            <Button
              variant="outline"
              onClick={() => window.location.reload()}
              className="text-brand-navy border-brand-navy hover:bg-brand-navy/10"
            >
              Refresh Page
            </Button>
            <Button
              onClick={resetErrorBoundary}
              className="bg-brand-yellow text-brand-navy hover:bg-brand-yellow/90"
            >
              Try Again
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AppErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <ReactErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        // Reset the state of your app here
        window.location.reload();
      }}
    >
      {children}
    </ReactErrorBoundary>
  );
}