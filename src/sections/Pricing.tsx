import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Check, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const plans = [
  {
    name: 'Starter',
    price: 'Free',
    period: '',
    description: 'Perfect for trying out Sparkam',
    features: [
      '1 campaign per month',
      'Basic analytics',
      '2 platform connections',
      'Email support',
    ],
    cta: 'Get started',
    popular: false,
    gradient: 'from-white/10 to-white/5',
  },
  {
    name: 'Pro',
    price: '$12',
    period: '/mo',
    description: 'For serious artists and labels',
    features: [
      'Unlimited campaigns',
      'Advanced analytics',
      'All platforms',
      'Priority support',
      'AI content generation',
      'Weekly insights',
    ],
    cta: 'Upgrade to Pro',
    popular: true,
    gradient: 'from-neon-pink to-neon-violet',
  },
];

const Pricing = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { y: 40, opacity: 0 },
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
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { y: 60, scale: 0.96, opacity: 0 },
          {
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 0.6,
            delay: i * 0.1,
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              end: 'top 60%',
              scrub: 0.5,
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="pricing"
      className="relative bg-dark py-20 lg:py-28 z-30"
    >
      {/* Background blobs */}
      <div className="absolute left-0 top-0 w-[40vw] h-[40vh] bg-neon-pink/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute right-0 bottom-0 w-[35vw] h-[35vh] bg-neon-cyan/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 w-full px-6 lg:px-12">
        <div className="max-w-[900px] mx-auto">
          {/* Title */}
          <h2
            ref={titleRef}
            className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-white text-center mb-12 lg:mb-16"
          >
            Pricing
          </h2>

          {/* Pricing cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {plans.map((plan, i) => (
              <div
                key={plan.name}
                ref={(el) => { cardsRef.current[i] = el; }}
                className={`group relative ${plan.popular ? 'md:-mt-4 md:mb-4' : ''}`}
              >
                <div
                  className={`relative rounded-3xl p-8 h-full transition-all duration-300 hover:-translate-y-1 ${
                    plan.popular
                      ? 'bg-dark-light ring-2 ring-neon-pink'
                      : 'bg-dark-light/50 border border-white/10'
                  }`}
                >
                  {/* Popular badge */}
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <div className="bg-gradient-to-r from-neon-pink to-neon-violet px-4 py-1 rounded-full flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-white" />
                        <span className="text-xs font-medium text-white">
                          Most popular
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Plan name */}
                  <h3 className="font-display font-semibold text-xl text-white mb-2">
                    {plan.name}
                  </h3>

                  {/* Price */}
                  <div className="flex items-baseline gap-1 mb-3">
                    <span
                      className={`font-display font-bold text-4xl ${
                        plan.popular ? 'text-gradient' : 'text-white'
                      }`}
                    >
                      {plan.price}
                    </span>
                    <span className="text-white/50">{plan.period}</span>
                  </div>

                  {/* Description */}
                  <p className="text-white/60 text-sm mb-6">{plan.description}</p>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                            plan.popular
                              ? 'bg-neon-pink/20'
                              : 'bg-white/10'
                          }`}
                        >
                          <Check
                            className={`w-3 h-3 ${
                              plan.popular ? 'text-neon-pink' : 'text-white/60'
                            }`}
                          />
                        </div>
                        <span className="text-white/80 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Button
                    className={`w-full py-6 rounded-full font-semibold transition-all hover:scale-[1.02] ${
                      plan.popular
                        ? 'bg-neon-pink hover:bg-neon-pink/90 text-white hover:shadow-lg hover:shadow-neon-pink/30'
                        : 'bg-white/10 hover:bg-white/15 text-white'
                    }`}
                  >
                    {plan.cta}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
