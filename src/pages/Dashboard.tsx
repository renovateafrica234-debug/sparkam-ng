import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  BarChart3, 
  Share2, 
  Sparkles, 
  LogOut,
  Music,
  TrendingUp,
  Users,
  Zap,
  Rocket
} from 'lucide-react';

const Dashboard = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const stats = [
    { label: 'Total Campaigns', value: '24', icon: Rocket, color: 'from-neon-pink to-neon-violet' },
    { label: 'Active Promotions', value: '7', icon: Zap, color: 'from-neon-cyan to-neon-lime' },
    { label: 'Total Reach', value: '128K', icon: Users, color: 'from-neon-violet to-neon-pink' },
    { label: 'Engagement Rate', value: '4.8%', icon: TrendingUp, color: 'from-neon-lime to-neon-cyan' },
  ];

  const quickActions = [
    { label: 'New Campaign', icon: Sparkles, description: 'Start a pre or post-release campaign' },
    { label: 'Connect Platforms', icon: Share2, description: 'Link your streaming accounts' },
    { label: 'View Analytics', icon: BarChart3, description: 'Check your performance metrics' },
    { label: 'Upload Track', icon: Music, description: 'Add new music to promote' },
  ];

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-dark">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-dark-light border-r border-white/5 z-40">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="relative">
              <Sparkles className="w-8 h-8 text-neon-pink" />
              <div className="absolute inset-0 bg-neon-pink/40 blur-lg rounded-full" />
            </div>
            <div>
              <h1 className="font-display font-bold text-xl text-white">Sparkam</h1>
              <span className="text-xs text-neon-pink font-mono">PRO</span>
            </div>
          </div>

          <nav className="space-y-2">
            <a
              href="#"
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-neon-pink/10 text-neon-pink border border-neon-pink/20"
            >
              <LayoutDashboard className="w-5 h-5" />
              <span className="font-medium">Dashboard</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:text-white hover:bg-white/5 transition-colors"
            >
              <Rocket className="w-5 h-5" />
              <span>Campaigns</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:text-white hover:bg-white/5 transition-colors"
            >
              <BarChart3 className="w-5 h-5" />
              <span>Analytics</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:text-white hover:bg-white/5 transition-colors"
            >
              <Share2 className="w-5 h-5" />
              <span>Platforms</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:text-white hover:bg-white/5 transition-colors"
            >
              <Sparkles className="w-5 h-5" />
              <span>AI Tools</span>
            </a>
          </nav>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-white/5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-pink to-neon-violet flex items-center justify-center">
              <span className="text-white font-bold text-sm">
                {user?.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <p className="text-white font-medium text-sm">{user?.name}</p>
              <p className="text-white/50 text-xs">{user?.email}</p>
            </div>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full border-white/10 text-white/70 hover:text-white hover:bg-white/5"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-display font-bold text-3xl text-white mb-1">
              Welcome back, {user?.name}!
            </h2>
            <p className="text-white/60">
              You have full access to all Pro features
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-4 py-2 rounded-full bg-neon-pink/10 text-neon-pink text-sm font-medium border border-neon-pink/20">
              Admin Access
            </span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="bg-dark-light rounded-2xl p-6 border border-white/5 hover:border-white/10 transition-colors"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-white/60 text-sm mb-1">{stat.label}</p>
                <p className="font-display font-bold text-3xl text-white">{stat.value}</p>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <h3 className="font-display font-semibold text-xl text-white mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.label}
                className="flex items-center gap-4 p-5 bg-dark-light rounded-2xl border border-white/5 hover:border-neon-pink/30 hover:bg-neon-pink/5 transition-all group text-left"
              >
                <div className="w-14 h-14 rounded-xl bg-neon-pink/10 flex items-center justify-center group-hover:bg-neon-pink/20 transition-colors">
                  <Icon className="w-7 h-7 text-neon-pink" />
                </div>
                <div>
                  <p className="font-semibold text-white group-hover:text-neon-pink transition-colors">
                    {action.label}
                  </p>
                  <p className="text-white/50 text-sm">{action.description}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Recent Campaigns */}
        <h3 className="font-display font-semibold text-xl text-white mb-4">
          Recent Campaigns
        </h3>
        <div className="bg-dark-light rounded-2xl border border-white/5 overflow-hidden">
          <div className="p-6 border-b border-white/5">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-white">Summer Vibes EP</h4>
                <p className="text-white/50 text-sm">Post-release campaign • Started 3 days ago</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-neon-lime/10 text-neon-lime text-xs font-medium">
                Active
              </span>
            </div>
          </div>
          <div className="p-6 border-b border-white/5">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-white">Midnight Dreams</h4>
                <p className="text-white/50 text-sm">Pre-release teaser • Started 1 week ago</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-neon-cyan/10 text-neon-cyan text-xs font-medium">
                Running
              </span>
            </div>
          </div>
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-white">Afrobeat Fusion</h4>
                <p className="text-white/50 text-sm">Platform blast • Completed 2 weeks ago</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-white/10 text-white/60 text-xs font-medium">
                Completed
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
