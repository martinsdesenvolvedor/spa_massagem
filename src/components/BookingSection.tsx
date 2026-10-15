import React, { useState } from 'react';
import { SPA_SERVICES, THERAPISTS } from '../data/spaData';
import { Calendar, Clock, User, Mail, Phone, Sparkles, CheckCircle2, MessageSquare } from 'lucide-react';

export const BookingSection: React.FC = () => {
  const [selectedService, setSelectedService] = useState(SPA_SERVICES[0].id);
  const [date, setDate] = useState('2026-10-20');
  const [time, setTime] = useState('14:30');
  const [therapist, setTherapist] = useState(THERAPISTS[4].id);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [reservationCode, setReservationCode] = useState('');

  const currentServiceObj = SPA_SERVICES.find(s => s.id === selectedService) || SPA_SERVICES[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) return;
    const code = `ELY-${Math.floor(100000 + Math.random() * 900000)}`;
    setReservationCode(code);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setName('');
    setEmail('');
    setPhone('');
    setNotes('');
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-[#fdf5f3] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* HEADER */}
        <div data-reveal="up" className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs md:text-sm font-semibold tracking-[0.25em] text-[#ff497c] uppercase block mb-2">
            Agendamento Online
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-neutral-900 leading-tight">
            Reserve Seu Momento de Tranquilidade
          </h2>
          <div className="title-line-center">
            <span></span>
          </div>
          <p className="text-neutral-600 text-sm md:text-base leading-relaxed">
            Escolha seu ritual preferido, a data ideal e deixe que nossos especialistas cuidem de cada detalhe da sua chegada.
          </p>
        </div>

        {/* BOOKING CONTAINER */}
        <div data-reveal="up" data-reveal-delay="0.12" className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl border border-neutral-100 overflow-hidden">
          
          {submitted ? (
            <div className="p-8 md:p-14 text-center space-y-6 animate-in zoom-in-95 duration-300">
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <span className="text-xs uppercase tracking-widest text-[#ff497c] font-bold">
                  Reserva Confirmada com Sucesso!
                </span>
                <h3 className="font-serif text-3xl md:text-4xl font-semibold text-neutral-900">
                  Aguardamos Você, {name.split(' ')[0]}
                </h3>
                <p className="text-neutral-600 text-sm max-w-md mx-auto">
                  Enviamos os detalhes completos do seu agendamento e instruções de preparação para <strong className="text-neutral-800">{email}</strong>.
                </p>
              </div>

              {/* RESERVATION SUMMARY CARD */}
              <div className="bg-[#fcf8f6] p-6 rounded-2xl border border-neutral-200/80 max-w-md mx-auto text-left space-y-2.5 text-xs text-neutral-700">
                <div className="flex justify-between border-b border-neutral-200 pb-2">
                  <span className="text-neutral-400 uppercase">Código da Reserva:</span>
                  <span className="font-mono font-bold text-[#ff497c]">{reservationCode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Ritual Escolhido:</span>
                  <span className="font-semibold">{currentServiceObj.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Data & Horário:</span>
                  <span className="font-semibold">{date} às {time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Investimento:</span>
                  <span className="font-bold text-neutral-900">R$ {currentServiceObj.price},00</span>
                </div>
              </div>

              <button
                onClick={handleReset}
                className="bg-[#232323] hover:bg-[#ff497c] text-white text-xs uppercase tracking-widest font-semibold px-8 py-3.5 rounded-full transition-colors cursor-pointer"
              >
                Fazer Outro Agendamento
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6 sm:p-10 md:p-12 space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* SELECT RITUAL */}
                <div className="space-y-2">
                  <label htmlFor="bookingsection-field-1" className="text-xs uppercase tracking-wider font-semibold text-neutral-700 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#ff497c]" />
                    Ritual Terapêutico
                  </label>
                  <select id="bookingsection-field-1"
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full bg-[#fcf8f6] border border-neutral-200 rounded-xl px-4 py-3 text-sm text-neutral-800 focus:outline-none focus:border-[#ff497c] transition-colors"
                  >
                    {SPA_SERVICES.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.title} ({s.duration} - R$ {s.price},00)
                      </option>
                    ))}
                  </select>
                </div>

                {/* SELECT THERAPIST */}
                <div className="space-y-2">
                  <label htmlFor="bookingsection-field-2" className="text-xs uppercase tracking-wider font-semibold text-neutral-700 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#ff497c]" />
                    Terapeuta Preferencial
                  </label>
                  <select id="bookingsection-field-2"
                    value={therapist}
                    onChange={(e) => setTherapist(e.target.value)}
                    className="w-full bg-[#fcf8f6] border border-neutral-200 rounded-xl px-4 py-3 text-sm text-neutral-800 focus:outline-none focus:border-[#ff497c] transition-colors"
                  >
                    {THERAPISTS.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* DATE PICKER */}
                <div className="space-y-2">
                  <label htmlFor="bookingsection-field-3" className="text-xs uppercase tracking-wider font-semibold text-neutral-700 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#ff497c]" />
                    Data Desejada
                  </label>
                  <input id="bookingsection-field-3"
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-[#fcf8f6] border border-neutral-200 rounded-xl px-4 py-3 text-sm text-neutral-800 focus:outline-none focus:border-[#ff497c] transition-colors"
                  />
                </div>

                {/* TIME PICKER */}
                <div className="space-y-2">
                  <label htmlFor="bookingsection-field-4" className="text-xs uppercase tracking-wider font-semibold text-neutral-700 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#ff497c]" />
                    Horário Disponível
                  </label>
                  <select id="bookingsection-field-4"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full bg-[#fcf8f6] border border-neutral-200 rounded-xl px-4 py-3 text-sm text-neutral-800 focus:outline-none focus:border-[#ff497c] transition-colors"
                  >
                    {['09:30', '11:00', '13:00', '14:30', '16:00', '17:30', '19:00'].map((slot) => (
                      <option key={slot} value={slot}>
                        {slot} h (Disponível)
                      </option>
                    ))}
                  </select>
                </div>

                {/* NAME */}
                <div className="space-y-2">
                  <label htmlFor="bookingsection-field-5" className="text-xs uppercase tracking-wider font-semibold text-neutral-700 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#ff497c]" />
                    Nome Completo
                  </label>
                  <input id="bookingsection-field-5"
                    type="text"
                    required
                    placeholder="Ex: Beatriz Albuquerque"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#fcf8f6] border border-neutral-200 rounded-xl px-4 py-3 text-sm text-neutral-800 focus:outline-none focus:border-[#ff497c] transition-colors"
                  />
                </div>

                {/* PHONE */}
                <div className="space-y-2">
                  <label htmlFor="bookingsection-field-6" className="text-xs uppercase tracking-wider font-semibold text-neutral-700 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#ff497c]" />
                    Telefone / WhatsApp
                  </label>
                  <input id="bookingsection-field-6"
                    type="tel"
                    required
                    placeholder="(11) 98765-4321"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#fcf8f6] border border-neutral-200 rounded-xl px-4 py-3 text-sm text-neutral-800 focus:outline-none focus:border-[#ff497c] transition-colors"
                  />
                </div>

              </div>

              {/* EMAIL */}
              <div className="space-y-2">
                <label htmlFor="bookingsection-field-7" className="text-xs uppercase tracking-wider font-semibold text-neutral-700 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#ff497c]" />
                  E-mail de Confirmação
                </label>
                <input id="bookingsection-field-7"
                  type="email"
                  required
                  placeholder="seuemail@exemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#fcf8f6] border border-neutral-200 rounded-xl px-4 py-3 text-sm text-neutral-800 focus:outline-none focus:border-[#ff497c] transition-colors"
                />
              </div>

              {/* SPECIAL NOTES */}
              <div className="space-y-2">
                <label htmlFor="bookingsection-field-8" className="text-xs uppercase tracking-wider font-semibold text-neutral-700 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-[#ff497c]" />
                  Observações ou Restrições (Opcional)
                </label>
                <textarea id="bookingsection-field-8"
                  rows={2}
                  placeholder="Alguma dor específica, alergia a óleos aromáticos ou preferência especial?"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-[#fcf8f6] border border-neutral-200 rounded-xl px-4 py-3 text-sm text-neutral-800 focus:outline-none focus:border-[#ff497c] transition-colors resize-none"
                />
              </div>

              {/* SUBMIT BUTTON */}
              <div className="pt-2 text-center">
                <button
                  type="submit"
                  className="w-full sm:w-auto bg-[#ff497c] hover:bg-[#e03264] text-white font-medium text-xs md:text-sm uppercase tracking-widest px-10 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-[#ff497c]/35 cursor-pointer"
                >
                  Confirmar Agendamento Agora
                </button>
                <p className="text-[11px] text-neutral-400 mt-2">
                  🔒 Seus dados estão seguros. Não cobramos taxa de cancelamento prévio de até 12 horas.
                </p>
              </div>

            </form>
          )}

        </div>

      </div>
    </section>
  );
};
