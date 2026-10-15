import React, { useState, useEffect } from 'react';
import { Tag, Sparkles, Copy, Check, ArrowRight } from 'lucide-react';

interface PromoBannerProps {
  onOpenBooking: () => void;
}

export const PromoBanner: React.FC<PromoBannerProps> = ({ onOpenBooking }) => {
  // Real countdown timer (targeting 14 days ahead from current date)
  const [timeLeft, setTimeLeft] = useState({
    days: 12,
    hours: 18,
    minutes: 42,
    seconds: 35,
  });

  const [copied, setCopied] = useState(false);
  const couponCode = 'ELYSEE25';

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(couponCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section className="relative py-20 md:py-28 bg-neutral-900 overflow-hidden text-white">
      {/* BACKGROUND IMAGE WITH LUXURY OVERLAY */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1920&q=85')`,
        }}
      />
      {/* DARK SHADOW OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/80 to-black/90" />
      <div className="absolute inset-0 bg-[#ff497c]/10 mix-blend-color-burn" />

      {/* CONTENT */}
      <div data-reveal="up" className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        
        {/* SUBTITLE */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#ff497c] text-xs font-bold tracking-[0.25em] uppercase">
          <Tag className="w-3.5 h-3.5 text-[#ff497c]" />
          Promoção Especial de Temporada
        </div>

        {/* HEADLINE */}
        <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-white max-w-3xl mx-auto leading-tight">
          Economize <span className="text-[#ff497c] font-bold">25%</span> em Rituais Selecionados
        </h2>

        {/* PARAGRAPH */}
        <p className="text-neutral-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed">
          Válido para agendamentos online e cartões de presente em todos os rituais de massoterapia, cuidados faciais e banhos de imersão.
        </p>

        {/* COUNTDOWN TIMER BLOCKS */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 pt-2">
          {[
            { label: 'Dias', value: timeLeft.days },
            { label: 'Horas', value: String(timeLeft.hours).padStart(2, '0') },
            { label: 'Minutos', value: String(timeLeft.minutes).padStart(2, '0') },
            { label: 'Segundos', value: String(timeLeft.seconds).padStart(2, '0') },
          ].map((item, index) => (
            <div
              key={index}
              className="w-20 sm:w-24 md:w-28 py-3 sm:py-4 px-2 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15 shadow-xl flex flex-col items-center justify-center"
            >
              <span className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
                {item.value}
              </span>
              <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[#ff497c] font-semibold mt-1">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* COUPON VOUCHER BOX */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="bg-black/60 border border-white/20 rounded-full px-5 py-3 flex items-center gap-3">
            <span className="text-xs uppercase tracking-wider text-neutral-400">Cupom:</span>
            <span className="font-mono text-sm sm:text-base font-bold text-[#ff497c] tracking-widest">
              {couponCode}
            </span>
            <button
              onClick={handleCopyCode}
              title="Copiar cupom"
              className="ml-2 text-xs bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded-full flex items-center gap-1 transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-medium">Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copiar</span>
                </>
              )}
            </button>
          </div>

          {/* CTA BUTTON */}
          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto bg-[#ff497c] hover:bg-[#e03264] text-white font-medium text-xs md:text-sm uppercase tracking-widest px-8 py-4 rounded-full transition-all duration-300 shadow-xl hover:shadow-[#ff497c]/40 cursor-pointer flex items-center justify-center gap-2 group"
          >
            <span>Garantir Vaga com Desconto</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
};
