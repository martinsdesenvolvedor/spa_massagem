import React, { useState } from 'react';
import { SPA_SERVICES } from '../data/spaData';
import { Treatment } from '../types';
import { Sparkles, Clock, ArrowRight, Check, Eye } from 'lucide-react';

interface ServicesSectionProps {
  onSelectTreatment: (treatment: Treatment) => void;
  onOpenBookingFor: (treatment: Treatment) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectTreatment,
  onOpenBookingFor,
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'massage' | 'facial' | 'aromatherapy' | 'special'>('all');

  const filteredServices = activeCategory === 'all'
    ? SPA_SERVICES
    : SPA_SERVICES.filter((s) => s.category === activeCategory);

  return (
    <section id="services" className="py-20 md:py-28 bg-[#fdf5f3] relative overflow-hidden">
      
      {/* ROTATING DECORATIVE SHAPE IN BACKGROUND */}
      <div className="absolute -bottom-24 -right-24 w-96 h-96 pointer-events-none opacity-15">
        <img
          src="/img/content/shape-01.png"
          alt="decorativo"
          className="w-full h-full object-contain ani-rotated"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* SECTION HEADER */}
        <div data-reveal="up" className="text-center max-w-3xl mx-auto mb-14 md:mb-18">
          <span className="text-xs md:text-sm font-semibold tracking-[0.25em] text-[#ff497c] uppercase block mb-2">
            Rituais & Procedimentos
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-neutral-900 leading-tight">
            Bem-Vindo ao Santuário de Terapias & Cuidados
          </h2>
          <div className="title-line-center">
            <span></span>
          </div>
          <p className="text-neutral-600 text-sm md:text-base leading-relaxed">
            Cada protocolo foi meticulosamente desenhado para aliviar o estresse, desinflamar o organismo e revitalizar a luminosidade da sua pele através de insumos botânicos nobres.
          </p>

          {/* CATEGORY FILTER TABS */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {[
              { id: 'all', label: 'Todos os Rituais' },
              { id: 'massage', label: 'Massoterapia' },
              { id: 'facial', label: 'Cuidados Faciais' },
              { id: 'aromatherapy', label: 'Aromaterapia' },
              { id: 'special', label: 'Banhos & Especiais' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`px-5 py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold transition-all duration-300 cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-[#ff497c] text-white shadow-md shadow-[#ff497c]/25'
                    : 'bg-white text-neutral-600 hover:text-[#ff497c] hover:bg-neutral-50 border border-neutral-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* SERVICES GRID (card-style-01 style with shape-11.png hover effect) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service, index) => (
            <div
              key={service.id}
              data-reveal="up" data-reveal-delay={(index % 3) * .09}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-neutral-100 flex flex-col group relative"
            >
              {/* HOVER SHAPE (card-hover-img shape-11.png from template) */}
              <div className="absolute top-0 right-0 w-36 h-36 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10">
                <img
                  src="/img/content/shape-11.png"
                  alt="shape-hover"
                  className="w-full h-full object-contain"
                />
              </div>

              {/* IMAGE HEADER WITH OVERLAY */}
              <div className="relative h-60 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                {/* DURATION BADGE */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-neutral-800 flex items-center gap-1.5 shadow-sm">
                  <Clock className="w-3.5 h-3.5 text-[#ff497c]" />
                  <span>{service.duration}</span>
                </div>

                {/* POPULAR BADGE */}
                {service.popular && (
                  <div className="absolute top-4 right-4 bg-[#ff497c] text-white px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider shadow-sm flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Destaque
                  </div>
                )}

                {/* TEMPLATE ICON FLOATING BADGE */}
                {service.icon && (
                  <div className="absolute bottom-4 left-4 w-12 h-12 rounded-2xl bg-white/90 backdrop-blur-md shadow-lg flex items-center justify-center p-2.5 group-hover:scale-110 group-hover:bg-[#ff497c] transition-all duration-300">
                    <img
                      src={service.icon}
                      alt="ícone ritual"
                      className="w-full h-full object-contain filter group-hover:brightness-0 group-hover:invert transition-all"
                    />
                  </div>
                )}

                {/* PRICE FLOATING */}
                <div className="absolute bottom-4 right-4 bg-black/75 backdrop-blur-md text-white px-3.5 py-1.5 rounded-xl text-sm font-bold border border-white/20">
                  R$ {service.price},00
                </div>
              </div>

              {/* CARD CONTENT */}
              <div className="p-6 md:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-2xl font-semibold text-neutral-900 group-hover:text-[#ff497c] transition-colors mb-2">
                    {service.title}
                  </h3>
                  
                  <p className="text-neutral-600 text-xs md:text-sm leading-relaxed mb-4 line-clamp-3">
                    {service.description}
                  </p>

                  {/* BENEFITS CHIPS */}
                  <div className="space-y-1.5 pt-1 mb-6">
                    {service.benefits.slice(0, 2).map((benefit, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-neutral-500">
                        <Check className="w-3.5 h-3.5 text-[#ff497c] flex-shrink-0" />
                        <span className="truncate">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ACTIONS */}
                <div className="pt-4 border-t border-neutral-100 flex items-center justify-between gap-3">
                  <button
                    onClick={() => onSelectTreatment(service)}
                    className="text-xs font-semibold text-neutral-600 hover:text-[#ff497c] flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Detalhes</span>
                  </button>

                  <button
                    onClick={() => onOpenBookingFor(service)}
                    className="bg-[#ff497c] hover:bg-[#e03264] text-white text-xs font-semibold uppercase tracking-wider px-5 py-2.5 rounded-full transition-all duration-300 shadow-sm hover:shadow-md hover:shadow-[#ff497c]/30 flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Agendar</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>

              {/* BOTTOM ACCENT BAR ON HOVER */}
              <div className="h-1 w-0 group-hover:w-full bg-[#ff497c] transition-all duration-500" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
