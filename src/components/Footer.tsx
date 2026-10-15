import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Clock, ArrowUp, Send, Check, Sparkles, Instagram, Facebook, Youtube, Linkedin } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [showToTop,setShowToTop]=useState(window.scrollY>400);
  useEffect(()=>{const update=()=>setShowToTop(window.scrollY>400);window.addEventListener('scroll',update,{passive:true});return()=>window.removeEventListener('scroll',update);},[]);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 4000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#181818] text-white pt-20 pb-10 relative overflow-hidden">
      
      {/* NEWSLETTER ROW (TOP OF FOOTER LIKE THE TEMPLATE) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 border-b border-neutral-800">
        <div className="bg-gradient-to-r from-neutral-900 to-neutral-800/90 rounded-3xl p-8 sm:p-12 border border-neutral-800 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center lg:text-left">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#ff497c] flex items-center justify-center lg:justify-start gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Clube Exclusivo Élysée
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-medium text-white">
              Assine Nossa Novidades & Receba Mimos Exclusivos
            </h3>
            <p className="text-neutral-400 text-xs sm:text-sm max-w-lg">
              Ganhe 15% de cortesia em seu primeiro ritual de aniversário e novidades sobre eventos de bem-estar.
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubscribe} className="w-full lg:w-auto flex-1 max-w-md">
            <div className="relative flex items-center">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="E-mail para novidades" placeholder="Insira seu melhor e-mail..."
                className="w-full bg-neutral-950 border border-neutral-700 focus:border-[#ff497c] rounded-full py-4 pl-6 pr-32 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none transition-colors"
              />
              <button
                type="submit"
                className="absolute right-1.5 bg-[#ff497c] hover:bg-[#e03264] text-white font-semibold text-xs uppercase tracking-wider px-5 py-3 rounded-full transition-all duration-300 flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                {subscribed ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Inscrito!</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Assinar</span>
                  </>
                )}
              </button>
            </div>
            {subscribed && (
              <p className="text-[11px] text-emerald-400 mt-2 text-center lg:text-left">
                🎉 Bem-vindo! Verifique sua caixa de entrada para resgatar seu mimo.
              </p>
            )}
          </form>
        </div>
      </div>

      {/* MAIN FOOTER COLUMNS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          
          {/* COL 1: LOGO & ABOUT (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-[#ff497c]/20 flex items-center justify-center text-[#ff497c]">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <span className="font-serif text-2xl font-bold tracking-tight text-white block">
                  Élysée
                </span>
                <span className="text-[9px] uppercase tracking-[0.25em] text-[#ff497c] font-semibold block">
                  Spa e Santuário de Bem-Estar
                </span>
              </div>
            </div>

            <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
              Uma variedade de rituais e técnicas de massagem ancestrais que ajudam você a desacelerar, descontrair e rejuvenescer da rotina agitada do dia a dia com conforto e requinte.
            </p>

            {/* SOCIAL ICONS (social-icon-style1 from template) */}
            <div className="flex items-center space-x-3 pt-2">
              {[
                { label: 'Instagram', icon: Instagram, href: 'https://instagram.com' },
                { label: 'Facebook', icon: Facebook, href: 'https://facebook.com' },
                { label: 'YouTube', icon: Youtube, href: 'https://youtube.com' },
                { label: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com' },
              ].map((s, idx) => {
                const Icon = s.icon;
                return (
                  <a
                    key={idx}
                    href={s.href} aria-label={s.label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-neutral-800 hover:bg-[#ff497c] text-neutral-300 hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-105"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* COL 2: QUICK LINKS (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-serif text-lg font-semibold text-white tracking-wide border-b border-neutral-800 pb-2">
              Navegação
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li>
                <a href="#home" className="hover:text-[#ff497c] transition-colors">Início</a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#ff497c] transition-colors">Sobre o Santuário</a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#ff497c] transition-colors">Rituais & Terapias</a>
              </li>
              <li>
                <a href="#why-us" className="hover:text-[#ff497c] transition-colors">Dúvidas Frequentes</a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-[#ff497c] transition-colors">Cardápio & Valores</a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-[#ff497c] transition-colors">Galeria de Fotos</a>
              </li>
            </ul>
          </div>

          {/* COL 3: SERVICES LIST (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-serif text-lg font-semibold text-white tracking-wide border-b border-neutral-800 pb-2">
              Especialidades
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li className="hover:text-white transition-colors">Massagem com Pedras Quentes</li>
              <li className="hover:text-white transition-colors">Aromaterapia Floral & Ervas</li>
              <li className="hover:text-white transition-colors">Ritual Facial Hidratante e Iluminador</li>
              <li className="hover:text-white transition-colors">Massagem Sueca Desintoxicante</li>
              <li className="hover:text-white transition-colors">Banho de Imersão com Rosas</li>
              <li className="hover:text-white transition-colors">Terapia Capilar e Craniana</li>
            </ul>
          </div>

          {/* COL 4: CONTACT & HOURS (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-serif text-lg font-semibold text-white tracking-wide border-b border-neutral-800 pb-2">
              Atendimento
            </h4>
            <div className="space-y-3 text-xs text-neutral-400">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#ff497c] flex-shrink-0 mt-0.5" />
                <span>Alameda dos Jasmins, 1420 - Jardins, São Paulo - SP</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#ff497c] flex-shrink-0" />
                <span>(11) 3845-9200 / (11) 98765-4321</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#ff497c] flex-shrink-0" />
                <span>contato@elyseespa.com.br</span>
              </div>
              <div className="flex items-start gap-3 pt-1 border-t border-neutral-800">
                <Clock className="w-4 h-4 text-[#ff497c] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-medium">Horário de Funcionamento:</p>
                  <p>Segunda a Sábado: 09:00 - 20:00</p>
                  <p>Domingos & Feriados: 10:00 - 18:00</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* COPYRIGHT & BACK TO TOP BAR */}
      <div className="border-t border-neutral-800 pt-8 mt-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} Élysée Spa e Santuário de Bem-Estar. Todos os direitos reservados.</p>
          <div className="flex items-center space-x-6">
            <span className="hover:text-neutral-400 cursor-pointer">Termos de Uso</span>
            <span className="hover:text-neutral-400 cursor-pointer">Política de Privacidade</span>
            <span className="hover:text-neutral-400 cursor-pointer">Cancelamentos</span>
          </div>
        </div>
      </div>

      {/* FLOATING SCROLL TO TOP (like template's scroll to top) */}
      {showToTop&&<button
        onClick={scrollToTop}
        aria-label="Voltar ao topo"
        className="fixed bottom-6 right-6 z-30 w-11 h-11 rounded-full bg-[#ff497c] hover:bg-[#e03264] text-white flex items-center justify-center shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
      >
        <ArrowUp className="w-5 h-5" />
      </button>}

    </footer>
  );
};
