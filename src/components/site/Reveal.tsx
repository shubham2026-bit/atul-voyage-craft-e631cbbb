import { useEffect, useRef, type ReactNode } from "react";

export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          (e.target as HTMLElement).style.animationDelay = `${delay}ms`;
          e.target.classList.add("in-view");
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}
