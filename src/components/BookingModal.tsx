import React, { useState, useEffect } from 'react';
import { Treatment } from '../types';
import { SPA_SERVICES, THERAPISTS } from '../data/spaData';
import { X, Calendar, Clock, User, Mail, Phone, CheckCircle2, Sparkles } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedTreatment?: Treatment | null;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preSelectedTreatment,
}) => {
  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    preSelectedTreatment ? preSelectedTreatment.id : SPA_SERVICES[0].id
  );
  const [date, setDate] = useState('2026-10-21');
  const [time, setTime] = useState('15:00');
  const [therapist, setTherapist] = useState(THERAPISTS[4].id);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [code, setCode] = useState('');

  useEffect(() => {
    if (preSelectedTreatment) {
      setSelectedServiceId(preSelectedTreatment.id);
    }
  }, [preSelectedTreatment]);

  if (!isOpen) return null;

  const currentService = SPA_SERVICES.find((s) => s.id === selectedServiceId) || SPA_SERVICES[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) return;
    setCode(`ELY-${Math.floor(100000 + Math.random() * 900000)}`);
    setIsSuccess(true);
  };

  const handleCloseModal = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <div role="dialog" aria-modal="true" aria-label="Agendamento rápido" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative spa-modal-panel w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-neutral-100 animate-in zoom-in-95 duration-200">
        
        {/* HEADER */}
        <div className="bg-[#ff497c] px-6 py-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-white/90" />
            <div>
              <h3 className="font-serif text-2xl font-medium leading-none">
                Agendamento Rápido
              </h3>
              <span className="text-[10px] uppercase tracking-widest text-white/80">
                Élysée Spa e Bem-Estar
              </span>
            </div>
          </div>
          <button
            onClick={handleCloseModal}
            aria-label="Fechar agendamento"
            className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* BODY */}
        {isSuccess ? (
          <div className="p-8 text-center space-y-5">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <h4 className="font-serif text-2xl font-semibold text-neutral-900">
                Reserva Realizada!
              </h4>
              <p className="text-xs text-neutral-600 mt-1">
                Agradecemos, {name.split(' ')[0]}. Enviamos a confirmação para {email}.
              </p>
            </div>
            <div className="bg-[#fcf8f6] p-4 rounded-xl text-xs space-y-1 text-left text-neutral-700">
              <div className="flex justify-between font-mono font-bold text-[#ff497c]">
                <span>Código:</span> <span>{code}</span>
              </div>
              <div className="flex justify-between">
                <span>Tratamento:</span> <span className="font-semibold">{currentService.title}</span>
              </div>
              <div className="flex justify-between">
                <span>Horário:</span> <span>{date} às {time}</span>
              </div>
            </div>
            <button
              onClick={handleCloseModal}
              aria-label="Fechar agendamento"
              className="bg-[#232323] text-white text-xs uppercase tracking-widest px-6 py-3 rounded-full hover:bg-[#ff497c] transition-colors"
            >
              Concluir
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
            
            {/* SERVICE SELECTION */}
            <div className="space-y-1">
              <label htmlFor="bookingmodal-field-1" className="text-xs font-semibold text-neutral-700 uppercase tracking-wider">
                Procedimento
              </label>
              <select id="bookingmodal-field-1"
                value={selectedServiceId}
                onChange={(e) => setSelectedServiceId(e.target.value)}
                className="w-full bg-[#fcf8f6] border border-neutral-200 rounded-xl px-3.5 py-2.5 text-xs text-neutral-800 focus:outline-none focus:border-[#ff497c]"
              >
                {SPA_SERVICES.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.title} — {s.duration} (R$ {s.price},00)
                  </option>
                ))}
              </select>
            </div>

            {/* DATE & TIME */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label htmlFor="bookingmodal-field-2" className="text-xs font-semibold text-neutral-700 uppercase tracking-wider">
                  Data
                </label>
                <input id="bookingmodal-field-2"
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-[#fcf8f6] border border-neutral-200 rounded-xl px-3 py-2 text-xs text-neutral-800 focus:outline-none focus:border-[#ff497c]"
                />
              </div>
              <div className="space-y-1">
                <label htmlFor="bookingmodal-field-3" className="text-xs font-semibold text-neutral-700 uppercase tracking-wider">
                  Horário
                </label>
                <select id="bookingmodal-field-3"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full bg-[#fcf8f6] border border-neutral-200 rounded-xl px-3 py-2 text-xs text-neutral-800 focus:outline-none focus:border-[#ff497c]"
                >
                  {['10:00', '11:30', '13:00', '14:30', '16:00', '17:30', '19:00'].map((h) => (
                    <option key={h} value={h}>{h} h</option>
                  ))}
                </select>
              </div>
            </div>

            {/* THERAPIST */}
            <div className="space-y-1">
              <label htmlFor="bookingmodal-field-4" className="text-xs font-semibold text-neutral-700 uppercase tracking-wider">
                Terapeuta
              </label>
              <select id="bookingmodal-field-4"
                value={therapist}
                onChange={(e) => setTherapist(e.target.value)}
                className="w-full bg-[#fcf8f6] border border-neutral-200 rounded-xl px-3.5 py-2.5 text-xs text-neutral-800 focus:outline-none focus:border-[#ff497c]"
              >
                {THERAPISTS.map((t) => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
            </div>

            {/* NAME */}
            <div className="space-y-1">
              <label htmlFor="bookingmodal-field-5" className="text-xs font-semibold text-neutral-700 uppercase tracking-wider">
                Seu Nome
              </label>
              <input id="bookingmodal-field-5"
                type="text"
                required
                placeholder="Nome completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#fcf8f6] border border-neutral-200 rounded-xl px-3.5 py-2 text-xs text-neutral-800 focus:outline-none focus:border-[#ff497c]"
              />
            </div>

            {/* PHONE & EMAIL */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label htmlFor="bookingmodal-field-6" className="text-xs font-semibold text-neutral-700 uppercase tracking-wider">
                  WhatsApp
                </label>
                <input id="bookingmodal-field-6"
                  type="tel"
                  required
                  placeholder="(11) 98888-7777"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#fcf8f6] border border-neutral-200 rounded-xl px-3 py-2 text-xs text-neutral-800 focus:outline-none focus:border-[#ff497c]"
                />
              </div>
              <div className="space-y-1">
                <label htmlFor="bookingmodal-field-7" className="text-xs font-semibold text-neutral-700 uppercase tracking-wider">
                  E-mail
                </label>
                <input id="bookingmodal-field-7"
                  type="email"
                  required
                  placeholder="voce@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#fcf8f6] border border-neutral-200 rounded-xl px-3 py-2 text-xs text-neutral-800 focus:outline-none focus:border-[#ff497c]"
                />
              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-[#ff497c] hover:bg-[#e03264] text-white py-3.5 rounded-full text-xs uppercase tracking-widest font-semibold transition-all shadow-md hover:shadow-lg cursor-pointer"
              >
                Concluir Agendamento
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
