/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useSiteRoute } from './useSiteRoute';
import { ContentPage } from './pages/ContentPages';
import { pageTitles } from './navigation';
import { useScrollReveals } from './useScrollReveals';
import { Header } from './components/Header';
import { HeroSlider } from './components/HeroSlider';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { PromoBanner } from './components/PromoBanner';
import { WhyChooseUs } from './components/WhyChooseUs';
import { TestimonialsSection } from './components/TestimonialsSection';
import { PricingMenu } from './components/PricingMenu';
import { GallerySection } from './components/GallerySection';
import { BookingSection } from './components/BookingSection';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { BookingModal } from './components/BookingModal';
import { TreatmentDetailModal } from './components/TreatmentDetailModal';
import { Treatment } from './types';
import { SPA_SERVICES } from './data/spaData';

export default function App() {
  const {path,search}=useSiteRoute();
  useScrollReveals(path+'?'+search.toString());
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedTreatmentForBooking, setSelectedTreatmentForBooking] = useState<Treatment | null>(null);
  const [selectedTreatmentForDetails, setSelectedTreatmentForDetails] = useState<Treatment | null>(null);

  useEffect(()=>{
    document.title=path==='/'?'Élysée Spa — Santuário de Bem-Estar':(pageTitles[path]||'Página não encontrada')+' | Élysée Spa';
    setIsSearchOpen(false);setIsBookingOpen(false);setSelectedTreatmentForDetails(null);
  },[path]);

  const modalOpen=isSearchOpen||isBookingOpen||!!selectedTreatmentForDetails;
  useEffect(()=>{
    if(!modalOpen)return;
    const previous=document.activeElement as HTMLElement;
    const overflow=document.body.style.overflow;
    document.body.style.overflow='hidden';
    const dialog=()=>Array.from(document.querySelectorAll<HTMLElement>('[role="dialog"]')).at(-1);
    const frame=requestAnimationFrame(()=>dialog()?.querySelector<HTMLElement>('button,input,select')?.focus());
    const key=(event:KeyboardEvent)=>{
      const active=dialog();if(!active)return;
      if(event.key==='Escape')active.querySelector<HTMLButtonElement>('button[aria-label^="Fechar"]')?.click();
      if(event.key==='Tab'){
        const controls=Array.from(active.querySelectorAll<HTMLElement>('button:not(:disabled),a[href],input,select,textarea')).filter(el=>el.getClientRects().length);
        const first=controls[0],last=controls.at(-1);
        if(event.shiftKey&&document.activeElement===first){event.preventDefault();last?.focus();}
        if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first?.focus();}
      }
    };
    document.addEventListener('keydown',key);
    return()=>{cancelAnimationFrame(frame);document.body.style.overflow=overflow;document.removeEventListener('keydown',key);previous?.focus({preventScroll:true});};
  },[modalOpen,isSearchOpen,isBookingOpen,selectedTreatmentForDetails]);

  const handleOpenBooking = (treatment?: Treatment) => {
    setSelectedTreatmentForBooking(treatment || null);
    setIsBookingOpen(true);
  };

  const handleSelectTreatmentFromSearch = (id: string) => {
    const found = SPA_SERVICES.find((s) => s.id === id);
    if (found) {
      setSelectedTreatmentForDetails(found);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#232323] selection:bg-[#ff497c]/20 selection:text-[#ff497c]">
      <a href="#main-content" className="spa-skip">Pular para o conteúdo</a>
      
      {/* HEADER & NAVIGATION */}
      <Header
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* MAIN CONTENT FOLLOWING EXACT STRUCTURE OF BEAUTY TEMPLATE */}
      {path==='/' ? <main id="main-content" tabIndex={-1} className="flex-grow">
        {/* SECTION 1: HERO SLIDER (banner-style01) */}
        <HeroSlider onOpenBooking={() => handleOpenBooking()} />

        {/* SECTION 2: ABOUT US (about-style-01) */}
        <AboutSection onOpenBooking={() => handleOpenBooking()} />

        {/* SECTION 3: SERVICES & PROCEDURES (bg-light-yellow / card-style-01) */}
        <ServicesSection
          onSelectTreatment={(t) => setSelectedTreatmentForDetails(t)}
          onOpenBookingFor={(t) => handleOpenBooking(t)}
        />

        {/* SECTION 4: SEASON PROMOTION 25% OFF & LIVE COUNTDOWN (exrta-sec-two) */}
        <PromoBanner onOpenBooking={() => handleOpenBooking()} />

        {/* SECTION 5: WHY CHOOSE US & ACCORDION (why-choose-01) */}
        <WhyChooseUs />

        {/* SECTION 6: CLIENT TESTIMONIALS (testimonial-style02) */}
        <TestimonialsSection />

        {/* SECTION 7: PRICING & TREATMENT MENU (pt-0) */}
        <PricingMenu onOpenBookingFor={(t) => handleOpenBooking(t)} />

        {/* SECTION 8: FULL-BLEED INSTAGRAM / ATMOSPHERE GALLERY (galley) */}
        <GallerySection />

        {/* SECTION 9: APPOINTMENT SCHEDULING FORM */}
        <BookingSection />
      </main> : <ContentPage key={path+search.toString()} path={path} search={search} onBook={handleOpenBooking}/>}

      {/* FOOTER */}
      <Footer />

      {/* SEARCH MODAL OVERLAY (top-search bg-primary style) */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectTreatment={handleSelectTreatmentFromSearch}
      />

      {/* FAST BOOKING MODAL */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preSelectedTreatment={selectedTreatmentForBooking}
      />

      {/* TREATMENT DETAILS MODAL */}
      <TreatmentDetailModal
        treatment={selectedTreatmentForDetails}
        onClose={() => setSelectedTreatmentForDetails(null)}
        onBook={(t) => {setSelectedTreatmentForDetails(null);handleOpenBooking(t);}}
      />

    </div>
  );
}
