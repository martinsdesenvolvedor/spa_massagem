import React, { useState, useEffect, useRef } from 'react';
import { GALLERY_PHOTOS } from '../data/spaData';
import { GalleryPhoto } from '../types';
import { Instagram, ZoomIn, X, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const [activePhoto, setActivePhoto] = useState<GalleryPhoto | null>(null);
  const dialogRef=useRef<HTMLDivElement>(null);
  const opened=!!activePhoto;
  useEffect(()=>{
    if(!opened)return;
    const previous=document.activeElement as HTMLElement;
    const overflow=document.body.style.overflow;
    document.body.style.overflow='hidden';
    const frame=requestAnimationFrame(()=>dialogRef.current?.querySelector<HTMLButtonElement>('button')?.focus());
    return()=>{cancelAnimationFrame(frame);document.body.style.overflow=overflow;previous?.focus({preventScroll:true});};
  },[opened]);

  const handleOpenPhoto = (photo: GalleryPhoto) => {
    setActivePhoto(photo);
  };

  const handleClose = () => {
    setActivePhoto(null);
  };

  const handleNext = () => {
    if (!activePhoto) return;
    const currentIndex = GALLERY_PHOTOS.findIndex((p) => p.id === activePhoto.id);
    const nextIndex = (currentIndex + 1) % GALLERY_PHOTOS.length;
    setActivePhoto(GALLERY_PHOTOS[nextIndex]);
  };

  const handlePrev = () => {
    if (!activePhoto) return;
    const currentIndex = GALLERY_PHOTOS.findIndex((p) => p.id === activePhoto.id);
    const prevIndex = (currentIndex - 1 + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length;
    setActivePhoto(GALLERY_PHOTOS[prevIndex]);
  };

  useEffect(()=>{
    if(!activePhoto)return;
    const key=(event:KeyboardEvent)=>{
      if(event.key==='Escape')handleClose();
      if(event.key==='ArrowRight')handleNext();
      if(event.key==='ArrowLeft')handlePrev();
      if(event.key==='Tab'){
        const controls=dialogRef.current?.querySelectorAll<HTMLButtonElement>('button');if(!controls?.length)return;
        const first=controls[0],last=controls[controls.length-1];
        if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
        if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
      }
    };
    document.addEventListener('keydown',key);
    return()=>document.removeEventListener('keydown',key);
  },[activePhoto]);

  return (
    <section id="gallery" className="py-20 bg-neutral-900 text-white relative">
      
      {/* SECTION HEADER */}
      <div data-reveal="up" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
        <span className="text-xs md:text-sm font-semibold tracking-[0.25em] text-[#ff497c] uppercase block mb-2">
          Galeria Visual
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-white leading-tight">
          Momentos de Serenidade & Cuidado
        </h2>
        <div className="title-line-center">
          <span></span>
        </div>
        <p className="text-neutral-400 text-xs sm:text-sm max-w-xl mx-auto">
          Explore os recantos do nosso spa e sinta a atmosfera acolhedora que preparamos para o seu descanso.
        </p>
      </div>

      {/* FULL-BLEED 8-GRID SHOWCASE (SAME ARCHITECTURE AS TEMPLATE) */}
      <div className="w-full">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
          {GALLERY_PHOTOS.map((photo, index) => (
            <div
              key={photo.id}
              data-reveal="image" data-reveal-delay={(index % 4) * .07}
              role="button"
              tabIndex={0}
              aria-label={'Ampliar: '+photo.title}
              onKeyDown={event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();handleOpenPhoto(photo);}}}
              onClick={() => handleOpenPhoto(photo)}
              className="relative h-64 sm:h-72 md:h-80 overflow-hidden cursor-pointer group"
            >
              {/* IMAGE */}
              <img
                src={photo.image}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />

              {/* DARK HOVER OVERLAY */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center">
                {/* CIRCULAR ROSE ICON (ti-instagram from template) */}
                <div className="w-12 h-12 rounded-full bg-[#ff497c] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 mb-2">
                  <ZoomIn className="w-5 h-5" />
                </div>
                
                <h4 className="font-serif text-lg font-medium text-white tracking-wide">
                  {photo.title}
                </h4>
                <span className="text-[11px] uppercase tracking-widest text-[#ff497c] font-semibold mt-0.5">
                  {photo.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* LIGHTBOX MODAL */}
      {activePhoto && (
        <div role="dialog" aria-modal="true" aria-label="Galeria de imagens" ref={dialogRef} className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="spa-gallery-dialog relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center">
            
            {/* CLOSE BUTTON */}
            <button
              onClick={handleClose}
              aria-label="Fechar galeria"
              className="absolute -top-12 right-0 sm:right-0 p-2 text-white/80 hover:text-white bg-white/10 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            {/* MAIN IMAGE */}
            <div className="relative overflow-hidden rounded-2xl shadow-2xl border border-white/20">
              <img
                src={activePhoto.image}
                alt={activePhoto.title}
                className="max-h-[75vh] w-auto object-contain mx-auto"
              />
              <div className="p-4 bg-neutral-900/90 text-white flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-xl font-medium">{activePhoto.title}</h3>
                  <span className="text-xs text-[#ff497c] uppercase tracking-wider">{activePhoto.category}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrev}
                    aria-label="Foto anterior"
                    className="p-2 rounded-full bg-white/10 hover:bg-[#ff497c] text-white transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleNext}
                    aria-label="Próxima foto"
                    className="p-2 rounded-full bg-white/10 hover:bg-[#ff497c] text-white transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
