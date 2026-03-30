import { useEffect, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);
  const decor1Ref = useRef<HTMLDivElement>(null);
  const decor2Ref = useRef<HTMLDivElement>(null);

  // Auto-play entrance animation on load
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Blobs entrance
      tl.fromTo(
        [blob1Ref.current, blob2Ref.current],
        { opacity: 0, scale: 1.08 },
        { opacity: 1, scale: 1, duration: 0.8 },
        0
      );

      // Card entrance
      tl.fromTo(
        cardRef.current,
        { y: '10vh', scale: 0.92, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, duration: 0.9 },
        0.1
      );

      // Label entrance
      tl.fromTo(
        labelRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        0.4
      );

      // Headline character animation
      if (headlineRef.current) {
        const chars = headlineRef.current.querySelectorAll('.char');
        tl.fromTo(
          chars,
          { y: 40, rotateX: 25, opacity: 0 },
          { y: 0, rotateX: 0, opacity: 1, duration: 0.7, stagger: 0.03 },
          0.3
        );
      }

      // Subheadline + CTAs
      tl.fromTo(
        [subheadlineRef.current, ctaRef.current],
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.08 },
        0.6
      );

      // Decorative shapes
      tl.fromTo(
        [decor1Ref.current, decor2Ref.current],
        { scale: 0.7, opacity: 0 },
        { scale: 1, opacity: 0.9, duration: 0.6, stagger: 0.1 },
        0.5
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Scroll-driven animation (exit only)
  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset all elements to visible when scrolling back
            gsap.set(cardRef.current, { x: 0, rotateZ: 0, scale: 1, opacity: 1 });
            gsap.set(headlineRef.current, { x: 0, opacity: 1 });
            gsap.set(ctaRef.current, { y: 0, opacity: 1 });
            gsap.set([decor1Ref.current, decor2Ref.current], { x: 0, opacity: 0.9 });
          },
        },
      });

      // Phase 1 (0-30%): Settle - no animation, just ambient blob drift
      // Phase 2 (30-70%): Stable viewing
      // Phase 3 (70-100%): EXIT
      scrollTl.fromTo(
        cardRef.current,
        { x: 0, rotateZ: 0, opacity: 1 },
        { x: '-55vw', rotateZ: -6, opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        headlineRef.current,
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        ctaRef.current,
        { y: 0, opacity: 1 },
        { y: '6vh', opacity: 0, ease: 'power2.in' },
        0.75
      );

      scrollTl.fromTo(
        decor1Ref.current,
        { x: 0, opacity: 0.9 },
        { x: '-12vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        decor2Ref.current,
        { x: 0, opacity: 0.9 },
        { x: '12vw', opacity: 0, ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  // Split headline into characters
  const headlineText = 'Spark am.';
  const chars = headlineText.split('').map((char, i) => (
    <span
      key={i}
      className="char inline-block"
      style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
    >
      {char === ' ' ? '\u00A0' : char}
    </span>
  ));

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="section-pinned bg-dark flex items-center justify-center z-10"
    >
      {/* Vignette */}
      <div className="vignette" />

      {/* Neon blobs */}
      <div
        ref={blob1Ref}
        className="absolute -left-[10vw] -top-[12vh] w-[55vw] h-[55vh] bg-neon-pink/55 rounded-full blur-[90px] animate-blob-drift pointer-events-none"
      />
      <div
        ref={blob2Ref}
        className="absolute -right-[8vw] top-[10vh] w-[42vw] h-[42vh] bg-neon-cyan/45 rounded-full blur-[80px] animate-blob-drift-slow pointer-events-none"
      />

      {/* Decorative shapes */}
      <div
        ref={decor1Ref}
        className="absolute left-[6vw] top-[18vh] w-[18vw] h-[18vw] max-w-[280px] max-h-[280px] opacity-90 pointer-events-none"
      >
        <img
          src="/hero_cover_art.jpg"
          alt=""
          className="w-full h-full object-cover rounded-3xl"
        />
      </div>
      <div
        ref={decor2Ref}
        className="absolute right-[8vw] bottom-[16vh] w-[16vw] h-[16vw] max-w-[240px] max-h-[240px] opacity-85 pointer-events-none"
      >
        <img
          src="/hero_disc_circle.jpg"
          alt=""
          className="w-full h-full object-cover rounded-full"
        />
      </div>

      {/* Hero Card */}
      <div
        ref={cardRef}
        className="relative w-[min(86vw,1100px)] h-[min(52vh,420px)] z-10"
      >
        {/* Gradient border */}
        <div className="absolute inset-0 rounded-[28px] p-1 bg-gradient-to-br from-neon-pink via-neon-violet to-neon-cyan">
          <div className="w-full h-full rounded-[26px] bg-dark-light flex flex-col items-center justify-center px-8">
            {/* Micro label */}
            <span
              ref={labelRef}
              className="font-mono text-xs tracking-[0.12em] text-neon-pink/80 uppercase mb-6"
            >
              Now in Beta
            </span>

            {/* Headline */}
            <h1
              ref={headlineRef}
              className="font-display font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white text-center tracking-tight mb-6"
              style={{ perspective: '1000px' }}
            >
              {chars}
            </h1>

            {/* Subheadline */}
            <p
              ref={subheadlineRef}
              className="text-base sm:text-lg text-white/70 text-center max-w-xl mb-8"
            >
              AI promotion for your drops—before and after release.
            </p>

            {/* CTAs */}
            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => scrollToSection('#pricing')}
                className="bg-neon-pink hover:bg-neon-pink/90 text-white font-semibold px-8 py-6 rounded-full text-base transition-all hover:scale-105 hover:shadow-xl hover:shadow-neon-pink/30 group"
              >
                Start a campaign
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                variant="outline"
                onClick={() => scrollToSection('#how-it-works')}
                className="border-white/20 bg-white/5 hover:bg-white/10 text-white font-medium px-8 py-6 rounded-full text-base transition-all"
              >
                <Play className="w-4 h-4 mr-2" />
                See how it works
              </Button>
            </div>
          </div>
        </div>

        {/* Glow effect */}
        <div className="absolute inset-0 rounded-[28px] bg-gradient-to-br from-neon-pink/20 via-neon-violet/20 to-neon-cyan/20 blur-2xl -z-10" />
      </div>
    </section>
  );
};

export default HeroSection;
