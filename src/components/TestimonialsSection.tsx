import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { TESTIMONIALS } from '../data/spaData';
import { Quote, Star, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction,setDirection]=useState(1);
  const reduced=useReducedMotion();

  const prev = () => {
    setDirection(-1);
    setCurrentIndex((prevIdx) => (prevIdx - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const next = () => {
    setDirection(1);
    setCurrentIndex((prevIdx) => (prevIdx + 1) % TESTIMONIALS.length);
  };

  const current = TESTIMONIALS[currentIndex];

  return (
    <section id="testimonials" className="py-20 md:py-28 bg-[#f8f1ee] relative overflow-hidden">
      {/* BACKGROUND FLOATING ACCENT */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#ff497c]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* HEADER */}
        <div data-reveal="up" className="text-center mb-12 md:mb-16">
          <span className="text-xs md:text-sm font-semibold tracking-[0.25em] text-[#ff497c] uppercase block mb-2">
            Depoimentos Autênticos
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-neutral-900 leading-tight">
            O Que Dizem os Hóspedes do Nosso Santuário
          </h2>
          <div className="title-line-center">
            <span></span>
          </div>
        </div>

        {/* TESTIMONIAL CARD CAROUSEL */}
        <div data-reveal="up" data-reveal-delay="0.12" className="relative bg-white rounded-3xl p-8 sm:p-12 md:p-16 shadow-xl border border-neutral-100 max-w-4xl mx-auto">
          
          {/* QUOTE ICON */}
          <div className="absolute -top-7 left-10 md:left-14 w-14 h-14 rounded-2xl bg-[#ff497c] text-white flex items-center justify-center shadow-lg shadow-[#ff497c]/30">
            <Quote className="w-7 h-7 fill-white" />
          </div>

          {/* CONTENT */}
          <div className="spa-testimonial-stage"><AnimatePresence initial={false} mode="popLayout" custom={direction}>
          <motion.div key={current.id} custom={direction} variants={{enter:(d:number)=>({x:reduced?0:(d>0?'100%':'-100%'),opacity:reduced?1:0}),center:{x:0,opacity:1},exit:(d:number)=>({x:reduced?0:(d>0?'-100%':'100%'),opacity:reduced?1:0})}} initial="enter" animate="center" exit="exit" transition={{duration:reduced?0:.8,ease:[.25,.1,.25,1]}} className="pt-4 space-y-6">
            
            {/* STARS */}
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(current.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400" />
              ))}
            </div>

            {/* QUOTE TEXT */}
            <p className="font-serif text-xl sm:text-2xl md:text-3xl text-neutral-800 italic leading-snug">
              “{current.comment}”
            </p>

            {/* CLIENT INFO */}
            <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-neutral-100">
              <div className="flex items-center gap-4">
                <img
                  src={current.avatar}
                  alt={current.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-[#ff497c]/30 shadow-sm"
                />
                <div>
                  <h4 className="font-semibold text-neutral-900 text-base">
                    {current.name}
                  </h4>
                  <p className="text-xs text-neutral-500 font-medium">
                    {current.role}
                  </p>
                  <span className="inline-block mt-0.5 text-[11px] text-[#ff497c] font-semibold">
                    Experiência: {current.treatmentName}
                  </span>
                </div>
              </div>

            </div>
          </motion.div></AnimatePresence></div>

              {/* NAV CONTROLS */}
              <div className="flex items-center justify-center gap-2 mt-8">
                <button
                  onClick={prev}
                  aria-label="Depoimento anterior"
                  className="w-10 h-10 rounded-full border border-neutral-200 hover:border-[#ff497c] hover:bg-[#ff497c] hover:text-white text-neutral-700 flex items-center justify-center transition-all duration-300 cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={next}
                  aria-label="Próximo depoimento"
                  className="w-10 h-10 rounded-full border border-neutral-200 hover:border-[#ff497c] hover:bg-[#ff497c] hover:text-white text-neutral-700 flex items-center justify-center transition-all duration-300 cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

          {/* DOTS */}
          <div className="flex justify-center items-center gap-2 mt-8">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {setDirection(idx>currentIndex?1:-1);setCurrentIndex(idx);}}
                aria-label={`Ver depoimento ${idx + 1}`}
                className={`transition-all duration-300 rounded-full ${
                  idx === currentIndex
                    ? 'w-6 h-2 bg-[#ff497c]'
                    : 'w-2 h-2 bg-neutral-300 hover:bg-neutral-400'
                }`}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
