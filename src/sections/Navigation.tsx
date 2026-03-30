import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Menu, X, Sparkles, User } from 'lucide-react';

interface NavigationProps {
  onLoginClick?: () => void;
}

const Navigation = ({ onLoginClick }: NavigationProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Features', href: '#pre-release' },
    { label: 'How it works', href: '#how-it-works' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Docs', href: '#analytics' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const handleDashboardClick = () => {
    navigate('/dashboard');
    setIsMobileMenuOpen(false);
  };

  const handleLoginClick = () => {
    if (onLoginClick) {
      onLoginClick();
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-dark/80 backdrop-blur-xl border-b border-white/5'
            : 'bg-transparent'
        }`}
      >
        <div className="w-full px-6 lg:px-12">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <a
              href="/"
              className="flex items-center gap-2 group"
              onClick={(e) => {
                e.preventDefault();
                navigate('/');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <div className="relative">
                <Sparkles className="w-6 h-6 text-neon-pink transition-transform group-hover:scale-110" />
                <div className="absolute inset-0 bg-neon-pink/30 blur-lg rounded-full" />
              </div>
              <span className="font-display font-bold text-xl text-white">
                Sparkam
              </span>
            </a>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollToSection(link.href)}
                  className="text-sm text-white/70 hover:text-white transition-colors relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-neon-pink transition-all group-hover:w-full" />
                </button>
              ))}
            </div>

            {/* CTA Button / User Menu */}
            <div className="hidden lg:block">
              {isAuthenticated ? (
                <div className="flex items-center gap-4">
                  <Button
                    onClick={handleDashboardClick}
                    className="bg-neon-pink hover:bg-neon-pink/90 text-white font-medium px-6 rounded-full transition-all hover:scale-105 hover:shadow-lg hover:shadow-neon-pink/25"
                  >
                    <User className="w-4 h-4 mr-2" />
                    Dashboard
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={handleLoginClick}
                  className="bg-neon-pink hover:bg-neon-pink/90 text-white font-medium px-6 rounded-full transition-all hover:scale-105 hover:shadow-lg hover:shadow-neon-pink/25"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Start a campaign
                </Button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className="absolute inset-0 bg-dark/95 backdrop-blur-xl"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <div className="absolute top-20 left-0 right-0 p-6">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollToSection(link.href)}
                className="text-lg text-white/80 hover:text-white py-3 border-b border-white/10 text-left transition-colors"
              >
                {link.label}
              </button>
            ))}
            
            {isAuthenticated ? (
              <Button
                onClick={handleDashboardClick}
                className="bg-neon-pink hover:bg-neon-pink/90 text-white font-medium mt-4 rounded-full"
              >
                <User className="w-4 h-4 mr-2" />
                Go to Dashboard
              </Button>
            ) : (
              <Button
                onClick={handleLoginClick}
                className="bg-neon-pink hover:bg-neon-pink/90 text-white font-medium mt-4 rounded-full"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Start a campaign
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
