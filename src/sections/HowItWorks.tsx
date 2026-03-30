import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Upload, Calendar, TrendingUp } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: '01',
    title: 'Upload your track & cover',
    description: 'Add your audio, artwork, and release date.',
    icon: Upload,
    gradient: 'from-neon-pink to-neon-violet',
  },
  {
    number: '02',
    title: 'Choose pre or post release',
    description: 'Tease early or push after the drop.',
    icon: Calendar,
    gradient: 'from-neon-violet to-neon-cyan',
  },
  {
    number: '03',
    title: 'Publish + optimize weekly',
    description: 'AI suggests what to post—and when.',
    icon: TrendingUp,
    gradient: 'from-neon-cyan to-neon-lime',
  },
];

const HowItWorks = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const blobRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            end: 'top 55%',
            scrub: 0.5,
          },
        }
      );

      // Cards stagger animation
      cardsRef.current.forEach((card) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { y: 50, rotateX: 15, opacity: 0 },
          {
            y: 0,
            rotateX: 0,
            opacity: 1,
            duration: 0.6,
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              end: 'top 60%',
              scrub: 0.5,
            },
          }
        );
      });

      // Blob parallax
      gsap.fromTo(
        blobRef.current,
        { y: -20 },
        {
          y: 20,
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="relative bg-dark-light py-20 lg:py-28 z-30"
    >
      {/* Background blob */}
      <div
        ref={blobRef}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vh] bg-neon-violet/15 rounded-full blur-[120px] pointer-events-none"
      />

      <div className="relative z-10 w-full px-6 lg:px-12">
        <div className="max-w-[1100px] mx-auto">
          {/* Title */}
          <h2
            ref={titleRef}
            className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-white mb-12 lg:mb-16"
          >
            How it works
          </h2>

          {/* Steps grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.number}
                  ref={(el) => { cardsRef.current[i] = el; }}
                  className="group relative"
                  style={{ perspective: '1000px' }}
                >
                  <div className="relative bg-dark rounded-[22px] p-8 h-full transition-all duration-300 hover:-translate-y-2">
                    {/* Gradient border on hover */}
                    <div className={`absolute inset-0 rounded-[22px] p-[2px] bg-gradient-to-br ${step.gradient} opacity-0 group-hover:opacity-100 transition-opacity`}>
                      <div className="w-full h-full rounded-[20px] bg-dark" />
                    </div>
                    
                    {/* Content */}
                    <div className="relative z-10">
                      {/* Step number */}
                      <span className="font-mono text-sm text-white/40 tracking-wider mb-4 block">
                        STEP {step.number}
                      </span>

                      {/* Icon */}
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.gradient} flex items-center justify-center mb-5`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>

                      {/* Title */}
                      <h3 className="font-display font-semibold text-xl text-white mb-3">
                        {step.title}
                      </h3>

                      {/* Description */}
                      <p className="text-white/60 text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
