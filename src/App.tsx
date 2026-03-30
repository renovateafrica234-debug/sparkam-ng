import { useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AuthProvider } from './contexts/AuthContext';
import Navigation from './sections/Navigation';
import HeroSection from './sections/HeroSection';
import FeatureSection from './sections/FeatureSection';
import HowItWorks from './sections/HowItWorks';
import Pricing from './sections/Pricing';
import CtaFooter from './sections/CtaFooter';
import LoginModal from './components/LoginModal';
import Dashboard from './pages/Dashboard';

gsap.registerPlugin(ScrollTrigger);

// ScrollToTop component to handle scroll restoration
const ScrollToTop = () => {
  const location = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  
  return null;
};

// Main landing page content
const LandingPage = ({ onLoginClick }: { onLoginClick: () => void }) => {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Global snap for pinned sections
    const setupGlobalSnap = () => {
      const pinned = ScrollTrigger.getAll()
        .filter(st => st.vars.pin)
        .sort((a, b) => a.start - b.start);
      
      const maxScroll = ScrollTrigger.maxScroll(window);
      if (!maxScroll || pinned.length === 0) return;

      const pinnedRanges = pinned.map(st => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            const inPinned = pinnedRanges.some(
              r => value >= r.start - 0.02 && value <= r.end + 0.02
            );
            if (!inPinned) return value;

            const target = pinnedRanges.reduce(
              (closest, r) =>
                Math.abs(r.center - value) < Math.abs(closest - value)
                  ? r.center
                  : closest,
              pinnedRanges[0]?.center ?? 0
            );
            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out',
        },
      });
    };

    const timer = setTimeout(setupGlobalSnap, 500);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div ref={mainRef} className="relative bg-dark min-h-screen">
      <div className="grain-overlay" />
      <Navigation onLoginClick={onLoginClick} />
      <main className="relative">
        <HeroSection />
        <FeatureSection
          id="pre-release"
          headline="Drop a teaser that hits different."
          body="Upload your cover. Write a caption. Let AI build the rollout schedule."
          cta="Set up pre-release"
          squareImage="/feature_cover_square.jpg"
          circleImage="/feature_disc_purple.jpg"
          borderGradient="from-neon-violet to-neon-lime"
          blobColors={['bg-neon-violet', 'bg-neon-lime']}
          enterFrom="right"
        />
        <FeatureSection
          id="post-release"
          headline="Blast it across platforms."
          body="Auto-generate clips, captions, and hashtags tuned for each channel."
          cta="Run post-release push"
          squareImage="/feature_platform_square.jpg"
          circleImage="/feature_disc_pink.jpg"
          borderGradient="from-neon-cyan to-neon-pink"
          blobColors={['bg-neon-cyan', 'bg-neon-pink']}
          enterFrom="left"
        />
        <FeatureSection
          id="platforms"
          headline="One track. Every format."
          body="Sparkam resizes clips, trims loops, and writes captions for each platform."
          cta="Connect platforms"
          squareImage="/feature_square_lime.jpg"
          circleImage="/feature_circle_violet.jpg"
          borderGradient="from-neon-lime to-neon-violet"
          blobColors={['bg-neon-lime', 'bg-neon-violet']}
          enterFrom="right"
        />
        <FeatureSection
          id="analytics"
          headline="See what's glowing."
          body="Track clicks, saves, and shares. Get weekly tips to double down on what lands."
          cta="View analytics"
          squareImage="/feature_square_blue.jpg"
          circleImage="/feature_circle_magenta.jpg"
          borderGradient="from-neon-pink to-neon-cyan"
          blobColors={['bg-neon-pink', 'bg-neon-cyan']}
          enterFrom="left"
          exitDirection="down"
        />
        <HowItWorks />
        <Pricing />
        <CtaFooter />
      </main>
    </div>
  );
};

// App wrapper with router
const AppContent = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const location = useLocation();

  // Clear ScrollTriggers when navigating to dashboard
  useEffect(() => {
    if (location.pathname === '/dashboard') {
      ScrollTrigger.getAll().forEach(st => st.kill());
    }
  }, [location.pathname]);

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route 
          path="/" 
          element={<LandingPage onLoginClick={() => setIsLoginOpen(true)} />} 
        />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
