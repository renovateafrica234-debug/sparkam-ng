import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface FeatureSectionProps {
  id: string;
  headline: string;
  body: string;
  cta: string;
  squareImage: string;
  circleImage: string;
  borderGradient: string;
  blobColors: [string, string];
  enterFrom: 'left' | 'right';
  exitDirection?: 'left' | 'right' | 'down';
}

const FeatureSection = ({
  id,
  headline,
  body,
  cta,
  squareImage,
  circleImage,
  borderGradient,
  blobColors,
  enterFrom,
  exitDirection = 'right',
}: FeatureSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const decor1Ref = useRef<HTMLDivElement>(null);
  const decor2Ref = useRef<HTMLDivElement>(null);
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const enterX = enterFrom === 'left' ? '-60vw' : '60vw';
      const enterRotate = enterFrom === 'left' ? -8 : 8;
      const exitX =
        exitDirection === 'left'
          ? '-55vw'
          : exitDirection === 'right'
          ? '55vw'
          : '0';
      const exitY = exitDirection === 'down' ? '40vh' : '0';
      const exitRotate = exitDirection === 'down' ? 4 : exitDirection === 'left' ? -6 : 6;

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        },
      });

      // Phase 1 — ENTRANCE (0%–30%)
      scrollTl.fromTo(
        cardRef.current,
        { x: enterX, rotateZ: enterRotate, scale: 0.92, opacity: 0 },
        { x: 0, rotateZ: 0, scale: 1, opacity: 1, ease: 'none' },
        0
      );

      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll('.word');
        scrollTl.fromTo(
          words,
          { y: 40, rotateX: 20, opacity: 0 },
          { y: 0, rotateX: 0, opacity: 1, stagger: 0.02, ease: 'none' },
          0.05
        );
      }

      scrollTl.fromTo(
        [bodyRef.current, ctaRef.current],
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.03, ease: 'none' },
        0.1
      );

      scrollTl.fromTo(
        [decor1Ref.current, decor2Ref.current],
        { scale: 0.7, opacity: 0 },
        { scale: 1, opacity: 0.9, stagger: 0.04, ease: 'none' },
        0.05
      );

      scrollTl.fromTo(
        [blob1Ref.current, blob2Ref.current],
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, stagger: 0.05, ease: 'none' },
        0
      );

      // Phase 2 — SETTLE (30%–70%): Hold position

      // Phase 3 — EXIT (70%–100%)
      scrollTl.fromTo(
        cardRef.current,
        { x: 0, y: 0, rotateZ: 0, opacity: 1 },
        { x: exitX, y: exitY, rotateZ: exitRotate, opacity: 0, ease: 'power2.in' },
        0.7
      );

      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll('.word');
        scrollTl.fromTo(
          words,
          { opacity: 1 },
          { opacity: 0, ease: 'power2.in' },
          0.75
        );
      }

      scrollTl.fromTo(
        [bodyRef.current, ctaRef.current],
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.75
      );

      scrollTl.fromTo(
        decor1Ref.current,
        { x: 0, opacity: 0.9 },
        { x: enterFrom === 'left' ? '12vw' : '-12vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        decor2Ref.current,
        { x: 0, opacity: 0.9 },
        { x: enterFrom === 'left' ? '-12vw' : '12vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        [blob1Ref.current, blob2Ref.current],
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.8
      );
    }, section);

    return () => ctx.revert();
  }, [enterFrom, exitDirection]);

  // Split headline into words
  const words = headline.split(' ').map((word, i) => (
    <span
      key={i}
      className="word inline-block mr-[0.25em]"
      style={{ perspective: '1000px' }}
    >
      {word}
    </span>
  ));

  return (
    <section
      ref={sectionRef}
      id={id}
      className="section-pinned bg-dark flex items-center justify-center z-20"
    >
      {/* Vignette */}
      <div className="vignette" />

      {/* Neon blobs */}
      <div
        ref={blob1Ref}
        className={`absolute ${
          enterFrom === 'right' ? '-right-[6vw] -top-[10vh]' : '-left-[10vw] top-[8vh]'
        } w-[48vw] h-[48vh] ${blobColors[0]}/50 rounded-full blur-[90px] animate-blob-drift pointer-events-none`}
      />
      <div
        ref={blob2Ref}
        className={`absolute ${
          enterFrom === 'right' ? '-left-[8vw] -bottom-[10vh]' : '-right-[8vw] -bottom-[8vh]'
        } w-[44vw] h-[44vh] ${blobColors[1]}/45 rounded-full blur-[85px] animate-blob-drift-slow pointer-events-none`}
      />

      {/* Decorative shapes */}
      <div
        ref={decor1Ref}
        className={`absolute ${
          enterFrom === 'right' ? 'left-[6vw]' : 'right-[6vw]'
        } top-[20vh] w-[18vw] h-[18vw] max-w-[280px] max-h-[280px] opacity-90 pointer-events-none`}
      >
        <img
          src={squareImage}
          alt=""
          className="w-full h-full object-cover rounded-3xl"
        />
      </div>
      <div
        ref={decor2Ref}
        className={`absolute ${
          enterFrom === 'right' ? 'right-[8vw]' : 'left-[8vw]'
        } bottom-[18vh] w-[16vw] h-[16vw] max-w-[240px] max-h-[240px] opacity-85 pointer-events-none`}
      >
        <img
          src={circleImage}
          alt=""
          className="w-full h-full object-cover rounded-full"
        />
      </div>

      {/* Feature Card */}
      <div
        ref={cardRef}
        className="relative w-[min(86vw,1100px)] h-[min(56vh,460px)] z-10"
      >
        {/* Gradient border */}
        <div className={`absolute inset-0 rounded-[28px] p-1 bg-gradient-to-br ${borderGradient}`}>
          <div className="w-full h-full rounded-[26px] bg-dark-light flex flex-col items-center justify-center px-8">
            {/* Headline */}
            <h2
              ref={headlineRef}
              className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white text-center tracking-tight mb-6"
            >
              {words}
            </h2>

            {/* Body */}
            <p
              ref={bodyRef}
              className="text-base sm:text-lg text-white/70 text-center max-w-xl mb-8"
            >
              {body}
            </p>

            {/* CTA */}
            <div ref={ctaRef}>
              <Button
                className="bg-neon-pink hover:bg-neon-pink/90 text-white font-semibold px-8 py-6 rounded-full text-base transition-all hover:scale-105 hover:shadow-xl hover:shadow-neon-pink/30 group"
              >
                {cta}
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>

        {/* Glow effect */}
        <div className={`absolute inset-0 rounded-[28px] bg-gradient-to-br ${borderGradient} opacity-20 blur-2xl -z-10`} />
      </div>
    </section>
  );
};

export default FeatureSection;
