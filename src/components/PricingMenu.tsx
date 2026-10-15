import React, { useState } from 'react';
import { SPA_SERVICES } from '../data/spaData';
import { Treatment } from '../types';
import { Clock, Check, Sparkles, Calendar, ArrowRight } from 'lucide-react';

interface PricingMenuProps {
  onOpenBookingFor: (treatment: Treatment) => void;
}

export const PricingMenu: React.FC<PricingMenuProps> = ({ onOpenBookingFor }) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'massage' | 'facial' | 'aromatherapy' | 'special'>('all');

  const filtered = selectedFilter === 'all'
    ? SPA_SERVICES
    : SPA_SERVICES.filter(s => s.category === selectedFilter);

  return (
    <section id="pricing" className="py-20 md:py-28 bg-[#fdfaf8] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* HEADER */}
        <div data-reveal="up" className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs md:text-sm font-semibold tracking-[0.25em] text-[#ff497c] uppercase block mb-2">
            Cardápio Exclusivo
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-neutral-900 leading-tight">
            Menu Profissional de Terapias & Cuidados
          </h2>
          <div className="title-line-center">
            <span></span>
          </div>
          <p className="text-neutral-600 text-sm md:text-base leading-relaxed">
            Transparência absoluta e excelência em cada detalhe. Todos os tratamentos incluem infusão botânica de boas-vindas e acesso à nossa sala de descompressão.
          </p>

          {/* FILTER BUTTONS */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {[
              { id: 'all', label: 'Todos os Rituais' },
              { id: 'massage', label: 'Massoterapia' },
              { id: 'facial', label: 'Estética Facial' },
              { id: 'aromatherapy', label: 'Aromaterapia' },
              { id: 'special', label: 'Banhos de Imersão' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedFilter(tab.id as any)}
                className={`px-4.5 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                  selectedFilter === tab.id
                    ? 'bg-[#232323] text-white shadow-md'
                    : 'bg-white text-neutral-600 border border-neutral-200 hover:text-[#ff497c]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* PRICING MENU LIST (ELEGANT 2-COLUMN LUXURY SPA MENU) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {filtered.map((item, index) => (
            <div
              key={item.id}
              data-reveal="up" data-reveal-delay={(index % 2) * .12}
              className="bg-white rounded-2xl p-6 sm:p-7 border border-neutral-100 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* TOP ROW: TITLE & PRICE */}
                <div className="flex items-start justify-between gap-4 pb-2 border-b border-dashed border-neutral-200">
                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl font-semibold text-neutral-900 group-hover:text-[#ff497c] transition-colors">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1 text-xs text-neutral-500">
                      <Clock className="w-3.5 h-3.5 text-[#ff497c]" />
                      <span>Sessão de {item.duration}</span>
                      {item.popular && (
                        <span className="bg-[#ff497c]/10 text-[#ff497c] text-[10px] uppercase font-bold px-2 py-0.5 rounded-full">
                          Mais Pedido
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="text-right flex-shrink-0">
                    <span className="font-serif text-2xl sm:text-3xl font-bold text-[#ff497c]">
                      R$ {item.price}
                    </span>
                    <span className="block text-[10px] uppercase tracking-wider text-neutral-400">
                      Por Sessão
                    </span>
                  </div>
                </div>

                {/* DESCRIPTION */}
                <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed mt-3">
                  {item.description}
                </p>

                {/* BENEFITS CHIPS */}
                <div className="flex flex-wrap gap-2 mt-3.5">
                  {item.benefits.map((b, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 text-[11px] bg-neutral-50 text-neutral-600 px-2.5 py-1 rounded-md border border-neutral-100"
                    >
                      <Check className="w-3 h-3 text-[#ff497c]" />
                      {b}
                    </span>
                  ))}
                </div>
              </div>

              {/* ACTION ROW */}
              <div className="pt-5 mt-4 border-t border-neutral-100 flex items-center justify-between">
                <span className="text-xs text-neutral-400">
                  Inclui anamnese e aromaterapia
                </span>

                <button
                  onClick={() => onOpenBookingFor(item)}
                  className="bg-neutral-900 hover:bg-[#ff497c] text-white text-xs font-semibold uppercase tracking-wider px-5 py-2.5 rounded-full transition-all duration-300 flex items-center gap-1.5 cursor-pointer shadow-sm hover:shadow"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Reservar Este</span>
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* BOTTOM NOTE */}
        <div className="mt-12 text-center text-xs text-neutral-500 bg-white/70 border border-neutral-200/60 rounded-2xl p-4 max-w-2xl mx-auto">
          ✨ Também oferecemos cartões-presente digitais e físicos em caixas artesanais de veludo com laço de cetim.
        </div>

      </div>
    </section>
  );
};
