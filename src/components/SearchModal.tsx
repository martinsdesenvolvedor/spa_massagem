import React, { useState } from 'react';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { SPA_SERVICES } from '../data/spaData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTreatment: (id: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectTreatment,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const filtered = SPA_SERVICES.filter(
    (s) =>
      s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.benefits.some((b) => b.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div role="dialog" aria-modal="true" aria-label="Pesquisar rituais" className="fixed inset-0 z-50 flex items-start justify-center bg-black/80 backdrop-blur-md transition-opacity p-4 pt-16 md:pt-24 animate-in fade-in duration-200">
      <div className="spa-modal-panel spa-search-panel w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-neutral-100 animate-in zoom-in-95 duration-200">
        {/* TOP SEARCH BAR */}
        <div className="bg-[#ff497c] p-6 text-white relative">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs uppercase tracking-widest text-white/80 font-semibold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Busca Inteligente no Spa
            </span>
            <button
              onClick={onClose}
              aria-label="Fechar busca"
              className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="relative mt-2">
            <input
              type="text"
              autoFocus
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Buscar ritual" placeholder="Digite o que procura... Ex: massagem, pedras, facial, estresse"
              className="w-full bg-white/15 border-2 border-white/40 focus:border-white text-white placeholder-white/70 rounded-full px-5 py-3.5 pl-12 pr-10 text-base focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
            />
            <Search className="w-5 h-5 text-white/80 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* SEARCH RESULTS */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {searchTerm.trim() === '' ? (
            <div className="text-center py-8 text-neutral-400">
              <p className="text-sm">Sugestões rápidas:</p>
              <div className="flex flex-wrap justify-center gap-2 mt-3">
                {['Massagem com Pedras', 'Ritual Facial', 'Aromaterapia', 'Banho de Leite', 'Terapia Capilar'].map(
                  (tag) => (
                    <button
                      key={tag}
                      onClick={() => setSearchTerm(tag)}
                      className="text-xs bg-neutral-100 hover:bg-[#ff497c]/10 hover:text-[#ff497c] text-neutral-600 px-3 py-1.5 rounded-full transition-colors cursor-pointer"
                    >
                      {tag}
                    </button>
                  )
                )}
              </div>
            </div>
          ) : filtered.length > 0 ? (
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                Encontramos {filtered.length} tratamento(s):
              </p>
              {filtered.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    onSelectTreatment(item.id);
                    onClose();
                  }}
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-neutral-50 transition-colors border border-transparent hover:border-neutral-200 cursor-pointer group"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 rounded-lg object-cover flex-shrink-0 group-hover:scale-105 transition-transform"
                  />
                  <div className="flex-grow min-w-0">
                    <h4 className="text-sm font-semibold text-neutral-800 group-hover:text-[#ff497c] transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-xs text-neutral-500 line-clamp-1 mt-0.5">
                      {item.description}
                    </p>
                    <div className="flex items-center gap-3 mt-1 text-[11px] text-neutral-400">
                      <span>Duração: {item.duration}</span>
                      <span>•</span>
                      <span className="text-[#ff497c] font-semibold">R$ {item.price},00</span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-[#ff497c] group-hover:translate-x-1 transition-all flex-shrink-0" />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 text-neutral-400">
              <p className="text-base font-medium text-neutral-600">Nenhum resultado encontrado</p>
              <p className="text-xs mt-1">Tente buscar por "massagem", "facial" ou "relaxamento".</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
