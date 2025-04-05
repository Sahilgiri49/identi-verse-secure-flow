import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { SplashCursor } from './ui/splash-cursor';

interface LayoutProps {
  children: React.ReactNode;
  showSplash?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, showSplash = true }) => {
  return (
    <div className="min-h-screen flex flex-col relative">
      {showSplash && <SplashCursor />}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow pt-20">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
