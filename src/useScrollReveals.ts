import { useLayoutEffect } from 'react';
import { animate, useReducedMotion } from 'motion/react';

/** Animate existing content without adding layout wrappers or changing interaction. */
export function useScrollReveals(route: string) {
  const reduced = useReducedMotion();
  useLayoutEffect(() => {
    const root = document.querySelector('main');
    if (!root || reduced || !('IntersectionObserver' in window)) return;
    const elements = new Set<HTMLElement>();
    const running = new Set<ReturnType<typeof animate>>();
    const reset = (el: HTMLElement) => {
      for (const property of ['opacity', 'transform', 'clip-path', 'will-change']) el.style.removeProperty(property);
      el.dataset.revealState = 'visible';
    };
    const reveal = (el: HTMLElement, immediate = false) => {
      if (el.dataset.revealState !== 'pending') return;
      observer.unobserve(el);
      if (immediate) { reset(el); return; }
      el.dataset.revealState = 'animating';
      const image = el.dataset.reveal === 'image';
      const direction = el.dataset.reveal;
      const distance = Math.min(32, window.innerWidth * .035);
      const from = direction === 'left' ? `translateX(-${distance}px)` : direction === 'right' ? `translateX(${distance}px)` : image ? 'translateY(20px)' : 'translateY(44px)';
      const control = animate(el, {
        opacity: [0, 1], transform: [from, 'none'],
        ...(image ? { clipPath: ['inset(0 0 100% 0)', 'inset(0 0 0% 0)'] } : {}),
      }, {
        duration: image ? 1.05 : .8,
        delay: Math.min(Number(el.dataset.revealDelay) || 0, .28),
        ease: [.22, 1, .36, 1],
        onComplete: () => { running.delete(control); reset(el); },
      });
      running.add(control);
    };
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) reveal(entry.target as HTMLElement); });
    }, { threshold: .08, rootMargin: '0px 0px -35px 0px' });
    const register = () => root.querySelectorAll<HTMLElement>('[data-reveal]').forEach(el => {
      if (elements.has(el)) return;
      elements.add(el);
      // Never conceal something the visitor is already interacting with.
      if (el.contains(document.activeElement)) { reset(el); return; }
      el.dataset.revealState = 'pending';
      el.style.opacity = '0';
      el.style.willChange = 'transform, opacity';
      observer.observe(el);
    });
    register();
    // Category filters replace cards; new results get the same entrance treatment.
    const mutations = new MutationObserver(register);
    mutations.observe(root, { childList: true, subtree: true });
    const focus = (event: Event) => elements.forEach(el => {
      if (el.contains(event.target as Node)) reveal(el, true);
    });
    const print = () => elements.forEach(el => reveal(el, true));
    root.addEventListener('focusin', focus);
    window.addEventListener('beforeprint', print);
    return () => {
      observer.disconnect(); mutations.disconnect(); running.forEach(control => control.stop());
      elements.forEach(reset);
      root.removeEventListener('focusin', focus); window.removeEventListener('beforeprint', print);
    };
  }, [route, reduced]);
}
