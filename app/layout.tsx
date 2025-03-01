'use client';

import './globals.css';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { NavigationBar } from '@/components/navigation-bar';
import { AuthGuard } from '@/components/auth-guard';
import { AppErrorBoundary } from '@/components/error-boundary';

// Configure font with display: 'swap' to prevent FOUT
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
  adjustFontFallback: true,
  variable: '--font-inter',
});

const RootLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        <title>TCSG Academy Dashboard</title>
        <meta name="description" content="Your all-in-one credit repair solution" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </head>
      <body className={inter.className}>
        <AppErrorBoundary>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
          >
            <AuthGuard>
              <NavigationBar />
              <main className="min-h-[calc(100vh-4rem)]">{children}</main>
            </AuthGuard>
            <Toaster />
          </ThemeProvider>
        </AppErrorBoundary>
      </body>
    </html>
  );
}

export default RootLayout;