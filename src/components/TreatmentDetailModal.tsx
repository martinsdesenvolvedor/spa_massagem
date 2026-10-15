import React from 'react';
import { Treatment } from '../types';
import { X, Clock, CheckCircle2, Sparkles, HeartHandshake, ShieldCheck } from 'lucide-react';

interface TreatmentDetailModalProps {
  treatment: Treatment | null;
  onClose: () => void;
  onBook: (treatment: Treatment) => void;
}

export const TreatmentDetailModal: React.FC<TreatmentDetailModalProps> = ({
  treatment,
  onClose,
  onBook,
}) => {
  if (!treatment) return null;

  return (
    <div role="dialog" aria-modal="true" aria-label="Detalhes do ritual" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative spa-modal-panel w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-neutral-100 animate-in zoom-in-95 duration-200">
        
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          aria-label="Fechar detalhes"
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 hover:bg-[#ff497c] text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* IMAGE COVER */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden">
          <img
            src={treatment.image}
            alt={treatment.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          
          <div className="absolute bottom-4 left-6 right-6 text-white">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#ff497c] bg-white/15 px-3 py-1 rounded-full backdrop-blur-md">
              {treatment.category}
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-medium mt-2">
              {treatment.title}
            </h3>
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-6 sm:p-8 space-y-5 max-h-[50vh] overflow-y-auto">
          
          {/* META INFO */}
          <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
            <div className="flex items-center gap-2 text-xs font-semibold text-neutral-600">
              <Clock className="w-4 h-4 text-[#ff497c]" />
              <span>Duração: {treatment.duration}</span>
            </div>
            <div className="text-right">
              <span className="font-serif text-2xl font-bold text-[#ff497c]">
                R$ {treatment.price},00
              </span>
            </div>
          </div>

          {/* DESCRIPTION */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-bold text-neutral-800 mb-1">
              Sobre a Terapia
            </h4>
            <p className="text-neutral-600 text-sm leading-relaxed">
              {treatment.description}
            </p>
          </div>

          {/* BENEFITS */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-bold text-neutral-800 mb-2">
              Benefícios Comprovados
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {treatment.benefits.map((b, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-neutral-600">
                  <CheckCircle2 className="w-4 h-4 text-[#ff497c] flex-shrink-0 mt-0.5" />
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RITUAL PROTOCOL */}
          <div className="bg-[#fcf8f6] p-4 rounded-xl text-xs text-neutral-600 space-y-1 border border-neutral-100">
            <div className="font-semibold text-neutral-800 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#ff497c]" />
              Incluso em Seu Pacote:
            </div>
            <p>
              Anamnese com especialista, roupão aveludado esterilizado, degustação de infusão aromática e toalhas quentes com óleo de lavanda.
            </p>
          </div>

          {/* ACTION BUTTON */}
          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-full text-xs font-semibold text-neutral-600 hover:bg-neutral-100 transition-colors"
            >
              Voltar
            </button>
            <button
              onClick={() => {
                onClose();
                onBook(treatment);
              }}
              className="bg-[#ff497c] hover:bg-[#e03264] text-white text-xs font-semibold uppercase tracking-wider px-7 py-3 rounded-full transition-all shadow-md hover:shadow-lg hover:shadow-[#ff497c]/30 cursor-pointer"
            >
              Agendar Este Ritual
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
