import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { Sparkles, Eye, EyeOff, Lock, Mail } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        onClose();
        setEmail('');
        setPassword('');
      } else {
        setError('Invalid credentials. Try admin@sparkam.com / Sparkam2025!');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const fillAdminCredentials = () => {
    setEmail('admin@sparkam.com');
    setPassword('Sparkam2025!');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-dark-light border-white/10">
        <DialogHeader>
          <div className="flex items-center justify-center mb-4">
            <div className="relative">
              <Sparkles className="w-10 h-10 text-neon-pink" />
              <div className="absolute inset-0 bg-neon-pink/40 blur-lg rounded-full" />
            </div>
          </div>
          <DialogTitle className="text-center text-2xl font-display font-bold text-white">
            Admin Access
          </DialogTitle>
          <p className="text-center text-white/60 text-sm mt-2">
            Enter your credentials to access Pro features
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white/80">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@sparkam.com"
                className="pl-10 bg-dark border-white/10 text-white placeholder:text-white/30 focus:border-neon-pink focus:ring-neon-pink/20"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-white/80">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="pl-10 pr-10 bg-dark border-white/10 text-white placeholder:text-white/30 focus:border-neon-pink focus:ring-neon-pink/20"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-neon-pink hover:bg-neon-pink/90 text-white font-semibold py-6 rounded-full transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-neon-pink/30"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Signing in...
              </span>
            ) : (
              'Access Pro Features'
            )}
          </Button>

          <div className="pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={fillAdminCredentials}
              className="w-full text-center text-sm text-neon-pink hover:text-neon-pink/80 transition-colors"
            >
              Use admin credentials
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
