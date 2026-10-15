import React from 'react';
import { Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

interface AboutSectionProps {
  onOpenBooking: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenBooking }) => {
  return (
    <section id="about" className="py-20 md:py-28 bg-[#fdfaf8] relative overflow-hidden">
      
      {/* ROTATING BACKGROUND SHAPE (ani-rotated-slow like in template) */}
      <div className="absolute -top-32 -left-32 w-[520px] h-[520px] pointer-events-none opacity-15 -z-0">
        <img
          src="/img/content/shape-01.png"
          alt="decorativo"
          className="w-full h-full object-contain ani-rotated-slow"
        />
      </div>

      {/* FLOATING BOTANICAL ACCENT (ani-top-bottom from template) */}
      <div className="absolute top-10 right-4 lg:right-12 z-20 pointer-events-none ani-top-bottom hidden md:block">
        <img
          src="/img/icons/icon-34.png"
          alt="ornamento botânico"
          className="w-28 lg:w-36 h-auto opacity-80 filter drop-shadow-xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT COLUMN: LAYERED LUXURY IMAGES */}
          <div className="lg:col-span-6">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* MAIN PORTRAIT PHOTO */}
              <div data-reveal="image" className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-4 border-white group">
                <img
                  src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=900&q=80"
                  alt="Sessão de massagem e relaxamento no Élysée Spa"
                  className="w-full h-[460px] md:h-[520px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* OVERLAPPING SECONDARY SMALLER PHOTO */}
              <div className="hidden sm:block absolute -bottom-8 -left-8 z-20 w-52 md:w-60 h-44 md:h-52 rounded-xl overflow-hidden shadow-2xl border-4 border-white group">
                <img
                  src="/images/facial-treatment.webp"
                  alt="Tratamento facial orgânico"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* FLOATING EXPERIENCE BADGE WITH ani-top-bottom */}
              <div className="absolute -top-6 -right-6 z-20 bg-white rounded-2xl p-4 shadow-xl border border-neutral-100 flex items-center gap-3 ani-top-bottom">
                <div className="w-12 h-12 rounded-full bg-[#ff497c] text-white flex items-center justify-center font-bold text-lg shadow-md">
                  15+
                </div>
                <div>
                  <div className="text-xs font-bold text-neutral-800 uppercase tracking-wider">
                    Anos de Tradição
                  </div>
                  <div className="text-[11px] text-neutral-500">
                    Excelência em Bem-Estar
                  </div>
                </div>
              </div>

              {/* ROSE CORNER ACCENT FRAME */}
              <div className="absolute -inset-4 border-2 border-[#ff497c]/20 rounded-3xl -z-10 hidden sm:block" />
            </div>
          </div>

          {/* RIGHT COLUMN: TEXT CONTENT & ATTRIBUTES */}
          <div data-reveal="right" data-reveal-delay="0.12" className="lg:col-span-6 lg:pl-6 space-y-6">
            
            {/* SUBTITLE */}
            <div>
              <span className="text-xs md:text-sm font-semibold tracking-[0.25em] text-[#ff497c] uppercase block mb-2">
                Conheça Nosso Espaço
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-neutral-900 leading-tight">
                Descubra a Derradeira Experiência em Massagens & Rituais de Spa
              </h2>
              {/* DECORATIVE LINE */}
              <div className="title-line mt-3"></div>
            </div>

            {/* DESCRIPTION */}
            <p className="text-neutral-600 text-base md:text-lg leading-relaxed">
              No <span className="font-semibold text-neutral-800">Élysée Spa</span>, acreditamos que o autocuidado não é um luxo esporádico, mas uma necessidade essencial para a longevidade e harmonia. Combinamos sabedorias milenares orientais a protocolos dermatológicos contemporâneos, proporcionando um refúgio de silêncio e renascimento.
            </p>

            {/* TWO HIGHLIGHT FEATURE BLOCKS WITH ORIGINAL ICONS (icon-31 & icon-32) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              
              {/* Feature 1 */}
              <div className="bg-white p-5 rounded-2xl border border-neutral-100 shadow-sm hover:shadow-lg transition-all duration-300 group">
                <div className="w-14 h-14 rounded-2xl bg-[#ff497c]/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                  <img
                    src="/img/icons/icon-31.png"
                    alt="Melhores Produtos"
                    className="w-9 h-9 object-contain"
                  />
                </div>
                <h3 className="font-serif text-xl font-semibold text-neutral-900 mb-1 group-hover:text-[#ff497c] transition-colors">
                  Produtos Botânicos
                </h3>
                <p className="text-neutral-500 text-xs leading-relaxed">
                  Óleos 100% orgânicos certificados, livres de parabenos, cruelty-free e colhidos de forma sustentável.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-white p-5 rounded-2xl border border-neutral-100 shadow-sm hover:shadow-lg transition-all duration-300 group">
                <div className="w-14 h-14 rounded-2xl bg-[#ff497c]/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                  <img
                    src="/img/icons/icon-32.png"
                    alt="Pacotes & Presentes"
                    className="w-9 h-9 object-contain"
                  />
                </div>
                <h3 className="font-serif text-xl font-semibold text-neutral-900 mb-1 group-hover:text-[#ff497c] transition-colors">
                  Pacotes & Presentes
                </h3>
                <p className="text-neutral-500 text-xs leading-relaxed">
                  Cartões-presente refinados e experiências personalizadas para momentos inesquecíveis individuais ou a dois.
                </p>
              </div>

            </div>

            {/* BULLET POINTS CHECKLIST */}
            <div className="space-y-2 pt-1 text-sm text-neutral-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#ff497c] flex-shrink-0" />
                <span>Salas privativas com isolamento acústico e aromaterapia difusa contínua.</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#ff497c] flex-shrink-0" />
                <span>Menu de chás orgânicos e toalhas quentes perfumadas incluído em todas as sessões.</span>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenBooking}
                className="bg-[#232323] hover:bg-[#ff497c] text-white font-medium text-xs uppercase tracking-widest px-8 py-4 rounded-full transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 cursor-pointer flex items-center gap-2"
              >
                <span>Descobrir Rituais</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <a
                href="#pricing"
                className="text-neutral-700 hover:text-[#ff497c] text-sm font-semibold underline underline-offset-4 transition-colors"
              >
                Consultar Tabela Completa
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
