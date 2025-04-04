
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
    <div className="min-h-screen flex flex-col">
      {showSplash && <SplashCursor />}
      <Header />
      <main className="flex-grow pt-20">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
