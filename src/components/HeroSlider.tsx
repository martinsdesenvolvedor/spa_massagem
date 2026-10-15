import React, { useState, useEffect } from 'react';
import { useReducedMotion } from 'motion/react';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

interface HeroSliderProps {
  onOpenBooking: () => void;
}

const SLIDES = [
  {
    id: 1,
    subTitle: 'Santuário de Equilíbrio & Beleza',
    title: 'Harmonia dos Sentidos & Bem‑Estar',
    description: 'Permita-se desconectar da rotina urbana e vivenciar protocolos holísticos criados para harmonizar corpo, mente e energia vital.',
    bgImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1920&q=85',
    ctaPrimary: 'Agendar Ritual',
    ctaSecondary: 'Explorar Terapias',
    ctaSecondaryHref: '#services'
  },
  {
    id: 2,
    subTitle: 'Retiro Holístico de Luxo',
    title: 'Revitalização do Corpo & Mente',
    description: 'Imersão terapêutica com óleos essenciais orgânicos raros, pedras de basalto aquecidas e rituais de massoterapia personalizados.',
    bgImage: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1920&q=85',
    ctaPrimary: 'Reserve Sua Sessão',
    ctaSecondary: 'Cardápio de Preços',
    ctaSecondaryHref: '#pricing'
  },
  {
    id: 3,
    subTitle: 'Terapias Botânicas & Serenidade',
    title: 'Rituais Orgânicos & Saúde Plena',
    description: 'O verdadeiro luxo é o tempo dedicado a você. Desfrute de ambientes aromatizados, sons curativos e cuidados terapêuticos de excelência.',
    bgImage: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=1920&q=85',
    ctaPrimary: 'Agende Seu Horário',
    ctaSecondary: 'Conhecer Nosso Espaço',
    ctaSecondaryHref: '#about'
  }
];

export const HeroSlider: React.FC<HeroSliderProps> = ({ onOpenBooking }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotion = useReducedMotion();
  useEffect(() => {
    if (paused || reducedMotion) return;
    const timer = window.setInterval(() => setCurrentSlide(previous => (previous + 1) % SLIDES.length), 5000);
    return () => window.clearInterval(timer);
  }, [paused, reducedMotion, currentSlide]);
  const slide = SLIDES[currentSlide];
  return <section id="home" className="spa-hero" aria-roledescription="carrossel" aria-label="Experiências Élysée" data-paused={paused}>
    <div className="spa-hero-photos" aria-hidden="true">{SLIDES.map((item, index) => <div key={item.id} className={'spa-hero-photo' + (index === currentSlide ? ' is-active' : '')} style={{backgroundImage:'url(' + item.bgImage + ')'}} />)}</div>
    <div className="spa-hero-shade" aria-hidden="true" />
    <div className="spa-hero-content" key={slide.id}>
      <p className="spa-hero-eyebrow spa-hero-enter" style={{animationDelay:'.8s'}}>{slide.subTitle}</p>
      <h1 className="spa-hero-enter" style={{animationDelay:'1.2s'}}>{slide.title}</h1>
      <p className="spa-hero-description spa-hero-enter" style={{animationDelay:'1.4s'}}>{slide.description}</p>
      <div className="spa-hero-actions spa-hero-enter" style={{animationDelay:'1.6s'}}>
        <button onClick={onOpenBooking} className="spa-button">{slide.ctaPrimary}<ArrowRight size={17} aria-hidden="true" /></button>
        <a href={slide.ctaSecondaryHref} className="spa-button spa-button-outline">{slide.ctaSecondary}</a>
      </div>
      <div className="spa-hero-trust spa-hero-enter" style={{animationDelay:'1.8s'}}><span><ShieldCheck size={15} aria-hidden="true" />Terapeutas Certificados</span><span>Óleos 100% Orgânicos</span><span>Salas com Névoa Aromatizada</span></div>
    </div>
    <div className="spa-hero-cloud" aria-hidden="true" />
    <button className="spa-hero-arrow spa-hero-previous" aria-label="Slide anterior" onClick={() => setCurrentSlide((currentSlide + SLIDES.length - 1) % SLIDES.length)}><ChevronLeft aria-hidden="true" /></button>
    <button className="spa-hero-arrow spa-hero-next" aria-label="Próximo slide" onClick={() => setCurrentSlide((currentSlide + 1) % SLIDES.length)}><ChevronRight aria-hidden="true" /></button>
    <div className="spa-hero-controls"><div>{SLIDES.map((item,index) => <button key={item.id} aria-label={'Ir para slide '+(index+1)} aria-current={index===currentSlide?'true':undefined} onClick={() => setCurrentSlide(index)} />)}</div><button className="spa-hero-pause" aria-pressed={paused} onClick={() => setPaused(!paused)}>{paused?'Retomar slides':'Pausar slides'}</button></div>
  </section>;
};
