import React, { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { FAQ_LIST } from '../data/spaData';
import { ChevronDown, Award } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<string>('faq-1');
  const reduced=useReducedMotion();

  const toggleFaq = (id: string) => {
    setOpenFaq(openFaq === id ? '' : id);
  };

  return (
    <section id="why-us" className="py-20 md:py-28 bg-[#fdfaf8] relative overflow-hidden">
      
      {/* ROTATING BACKGROUND SHAPE */}
      <div className="absolute top-1/2 -right-36 -translate-y-1/2 w-[540px] h-[540px] pointer-events-none opacity-15">
        <img
          src="/img/content/shape-01.png"
          alt="mandala"
          className="w-full h-full object-contain ani-rotated"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT COLUMN: FAQ & ACCORDION (SAME STRUCTURE AS TEMPLATE) */}
          <div className="lg:col-span-7 space-y-6">
            <div data-reveal="left">
              <span className="text-xs md:text-sm font-semibold tracking-[0.25em] text-[#ff497c] uppercase block mb-2">
                Por Que Nos Escolher
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-neutral-900 leading-tight">
                Oferecemos Terapias Sob Medida para o Seu Bem-Estar
              </h2>
              <div className="title-line mt-3"></div>
            </div>

            <p data-reveal="up" className="text-neutral-600 text-sm md:text-base leading-relaxed">
              A massoterapia e a terapia holística atuam diretamente nos tecidos moles, fáscias musculares e no sistema nervoso central. Nossos terapeutas combinam toques precisos, controle de respiração e infusões aromáticas exclusivas para proporcionar um alívio real e duradouro.
            </p>

            {/* ACCORDION LIST */}
            <div className="space-y-3.5 pt-2">
              {FAQ_LIST.map((faq, index) => {
                const isOpen = openFaq === faq.id;
                return (
                  <div
                    key={faq.id}
                    data-reveal="up" data-reveal-delay={(index % 3) * .08}
                    className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                      isOpen
                        ? 'border-[#ff497c] bg-white shadow-md'
                        : 'border-neutral-200/80 bg-white/70 hover:border-neutral-300'
                    }`}
                  >
                    <button
                      onClick={() => toggleFaq(faq.id)}
                      aria-expanded={isOpen}
                      aria-controls={'answer-'+faq.id}
                      className="w-full px-6 py-4.5 text-left flex items-center justify-between gap-4 cursor-pointer"
                    >
                      <span className={`text-sm md:text-base font-semibold transition-colors ${
                        isOpen ? 'text-[#ff497c]' : 'text-neutral-800'
                      }`}>
                        {faq.question}
                      </span>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 flex-shrink-0 ${
                        isOpen ? 'bg-[#ff497c] text-white rotate-180' : 'bg-neutral-100 text-neutral-600'
                      }`}>
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </button>

                    <AnimatePresence initial={false}>{isOpen && (
                      <motion.div id={'answer-'+faq.id} initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}} transition={{duration:reduced?0:.35}} className="spa-faq-answer">
                      <div className="px-6 pb-5 pt-1 text-xs md:text-sm text-neutral-600 leading-relaxed border-t border-neutral-100/70">
                        {faq.answer}
                      </div>
                      </motion.div>
                    )}</AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* TRUST INDICATORS */}
            <div data-reveal="up" className="grid grid-cols-3 gap-4 pt-4 border-t border-neutral-200/60">
              <div className="text-center sm:text-left">
                <div className="font-serif text-2xl md:text-3xl font-bold text-neutral-900">
                  99.4%
                </div>
                <div className="text-[11px] text-neutral-500 font-medium">
                  Satisfação de Clientes
                </div>
              </div>
              <div className="text-center sm:text-left">
                <div className="font-serif text-2xl md:text-3xl font-bold text-neutral-900">
                  +14.500
                </div>
                <div className="text-[11px] text-neutral-500 font-medium">
                  Rituais Realizados
                </div>
              </div>
              <div className="text-center sm:text-left">
                <div className="font-serif text-2xl md:text-3xl font-bold text-neutral-900">
                  100%
                </div>
                <div className="text-[11px] text-neutral-500 font-medium">
                  Óleos Puros Orgânicos
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: LUXURY AMBIENCE PHOTO & FLOATING CARD */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* IMAGE */}
              <div data-reveal="image" className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=900&q=80"
                  alt="Ambiente spa exclusivo e sereno"
                  className="w-full h-[480px] object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* FLOATING CARD - EXPERTISE */}
              <div className="absolute -bottom-6 -left-6 bg-white p-5 rounded-2xl shadow-xl border border-neutral-100 max-w-xs ani-top-bottom">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-[#ff497c]/15 text-[#ff497c] flex items-center justify-center">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-800">
                      Terapeutas Nacionais
                    </h4>
                    <span className="text-[11px] text-neutral-400">Certificação Internacional</span>
                  </div>
                </div>
                <p className="text-[11px] text-neutral-500 leading-normal">
                  Equipe multidisciplinar com formação contínua em anatomia, shiatsu, drenagem e terapias ayurvédicas.
                </p>
              </div>

              {/* DECORATIVE BORDER */}
              <div className="absolute -top-4 -right-4 w-full h-full border-2 border-[#ff497c]/20 rounded-3xl -z-10 hidden sm:block" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
