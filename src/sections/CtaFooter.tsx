import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const footerLinks = [
  { label: 'Privacy', href: '#' },
  { label: 'Terms', href: '#' },
  { label: 'Support', href: '#' },
];

const CtaFooter = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { y: 60, rotateX: 10, opacity: 0 },
        {
          y: 0,
          rotateX: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 85%',
            end: 'top 55%',
            scrub: 0.5,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-dark py-20 lg:py-28 z-30"
    >
      {/* Heavy vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-dark/80 pointer-events-none" />

      <div className="relative z-10 w-full px-6 lg:px-12">
        <div className="max-w-[720px] mx-auto">
          {/* CTA Card */}
          <div
            ref={cardRef}
            className="relative mb-16"
            style={{ perspective: '1000px' }}
          >
            <div className="absolute inset-0 rounded-[28px] p-1 bg-gradient-to-br from-neon-pink via-neon-violet to-neon-cyan">
              <div className="w-full h-full rounded-[26px] bg-dark-light flex flex-col items-center justify-center px-8 py-12 lg:py-16">
                {/* Logo */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="relative">
                    <Sparkles className="w-8 h-8 text-neon-pink" />
                    <div className="absolute inset-0 bg-neon-pink/40 blur-lg rounded-full" />
                  </div>
                  <span className="font-display font-bold text-2xl text-white">
                    Sparkam
                  </span>
                </div>

                {/* Headline */}
                <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-white text-center mb-4">
                  Ready to spark am?
                </h2>

                {/* Subheadline */}
                <p className="text-white/60 text-center mb-8 max-w-md">
                  Start your first campaign in under 5 minutes.
                </p>

                {/* CTA */}
                <Button
                  className="bg-neon-pink hover:bg-neon-pink/90 text-white font-semibold px-10 py-6 rounded-full text-base transition-all hover:scale-105 hover:shadow-xl hover:shadow-neon-pink/30 group"
                >
                  Start for free
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </div>

            {/* Glow */}
            <div className="absolute inset-0 rounded-[28px] bg-gradient-to-br from-neon-pink/30 via-neon-violet/30 to-neon-cyan/30 blur-2xl -z-10" />
          </div>

          {/* Footer */}
          <footer className="border-t border-white/10 pt-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Links */}
              <div className="flex items-center gap-6">
                {footerLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-sm text-white/50 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              {/* Copyright */}
              <p className="text-sm text-white/40">
                © {new Date().getFullYear()} Sparkam
              </p>
            </div>
          </footer>
        </div>
      </div>
    </section>
  );
};

export default CtaFooter;
