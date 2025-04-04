
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navigateTo = (path: string) => {
    navigate(path);
    closeMenu();
  };

  return (
    <header className="w-full fixed top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/40">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2" onClick={() => navigateTo('/')}>
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <div className="w-6 h-6 rounded-full bg-primary animate-pulse-glow"></div>
            </div>
            <span className="text-xl font-bold text-gradient">IdentiVerse</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => navigateTo('/')}
              className="text-foreground/80 hover:text-primary transition-colors"
            >
              Home
            </button>
            <button 
              onClick={() => navigateTo('/features')}
              className="text-foreground/80 hover:text-primary transition-colors"
            >
              Features
            </button>
            <button 
              onClick={() => navigateTo('/about')}
              className="text-foreground/80 hover:text-primary transition-colors"
            >
              About
            </button>
            <Button 
              onClick={() => navigateTo('/verify')} 
              variant="default"
              className="bg-primary hover-glow"
            >
              Verify Identity
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-foreground/80 p-2"
            onClick={toggleMenu}
            aria-label="Menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div 
        className={cn(
          "md:hidden fixed inset-0 z-40 bg-background/95 backdrop-blur-lg transition-transform duration-300 ease-in-out transform",
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8 px-4">
          <button 
            onClick={() => navigateTo('/')}
            className="text-foreground/80 hover:text-primary text-xl transition-colors"
          >
            Home
          </button>
          <button 
            onClick={() => navigateTo('/features')}
            className="text-foreground/80 hover:text-primary text-xl transition-colors"
          >
            Features
          </button>
          <button 
            onClick={() => navigateTo('/about')}
            className="text-foreground/80 hover:text-primary text-xl transition-colors"
          >
            About
          </button>
          <Button 
            onClick={() => navigateTo('/verify')} 
            variant="default"
            className="bg-primary text-white mt-4 px-8 py-6 text-lg hover-glow"
          >
            Verify Identity
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
