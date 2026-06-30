import { useEffect, useRef, type ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Props {
  children: ReactNode;
  animation?: 'fadeUp' | 'fadeLeft' | 'fadeRight' | 'scale';
  delay?: number;
  duration?: number;
  stagger?: number;
  className?: string;
}

export default function ScrollAnimator({
  children,
  animation = 'fadeUp',
  delay = 0,
  duration = 0.8,
  className = '',
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const animations = {
      fadeUp: { y: 60, opacity: 0 },
      fadeLeft: { x: -60, opacity: 0 },
      fadeRight: { x: 60, opacity: 0 },
      scale: { scale: 0.85, opacity: 0 },
    };

    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        ...animations[animation],
        duration,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    });

    return () => ctx.revert();
  }, [animation, delay, duration]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
