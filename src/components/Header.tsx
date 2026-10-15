import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Search, Menu, X, Sparkles, ChevronDown, Calendar } from 'lucide-react';
import { navigation } from '../navigation';

interface HeaderProps { onOpenSearch: () => void; onOpenBooking: () => void; }
export const Header: React.FC<HeaderProps> = ({ onOpenSearch, onOpenBooking }) => {
  const [scrolled,setScrolled]=useState(window.scrollY>40);
  const [mobile,setMobile]=useState(false);
  const [expanded,setExpanded]=useState<string|null>(null);
  const reduced=useReducedMotion();
  const close=()=>{setMobile(false);setExpanded(null);};
  useEffect(()=>{
    const scroll=()=>setScrolled(window.scrollY>40);
    const key=(e:KeyboardEvent)=>{if(e.key==='Escape'){setMobile(false);setExpanded(null);}};
    window.addEventListener('scroll',scroll,{passive:true});window.addEventListener('popstate',close);document.addEventListener('keydown',key);
    return()=>{window.removeEventListener('scroll',scroll);window.removeEventListener('popstate',close);document.removeEventListener('keydown',key);};
  },[]);
  useEffect(()=>{if(!mobile)return;const previous=document.body.style.overflow;document.body.style.overflow='hidden';return()=>{document.body.style.overflow=previous;};},[mobile]);
  return <header className={'spa-header'+(scrolled?' is-scrolled':'')+(mobile?' menu-open':'')}>
    <div className="spa-header-inner">
      <a href="/" className="spa-brand" onClick={close} aria-label="Élysée — início"><Sparkles aria-hidden="true"/><span><strong>Élysée</strong><small>Spa e Bem-Estar</small></span></a>
      <nav className="spa-desktop-nav" aria-label="Navegação principal"><ul>{navigation.map(item=><li key={item.label} onMouseEnter={()=>item.children&&setExpanded(item.label)} onMouseLeave={()=>setExpanded(null)} onBlur={e=>{if(!e.currentTarget.contains(e.relatedTarget as Node))setExpanded(null);}}>
        {item.children?<button aria-expanded={expanded===item.label} aria-controls={'menu-'+item.label} onClick={()=>setExpanded(expanded===item.label?null:item.label)}>{item.label}<ChevronDown size={12}/></button>:<a href={item.href} onClick={close}>{item.label}</a>}
        {item.children&&<ul id={'menu-'+item.label} className={'spa-dropdown'+(expanded===item.label?' is-open':'')} inert={expanded!==item.label}>{item.children.map(child=><li key={child.href}><a href={child.href} onClick={close}>{child.label}</a></li>)}</ul>}
      </li>)}</ul></nav>
      <div className="spa-header-actions"><button className="spa-search-button" aria-label="Pesquisar rituais" onClick={()=>{close();onOpenSearch();}}><Search size={21}/></button><button className="spa-header-book" onClick={()=>{close();onOpenBooking();}}><Calendar size={15}/><span>Agendar horário</span></button><button className="spa-menu-toggle" aria-label={mobile?'Fechar menu':'Abrir menu'} aria-expanded={mobile} aria-controls="spa-mobile-menu" onClick={()=>{setMobile(!mobile);setExpanded(null);}}>{mobile?<X/>:<Menu/>}</button></div>
    </div>
    <AnimatePresence>{mobile&&<motion.nav id="spa-mobile-menu" className="spa-mobile-nav" aria-label="Navegação mobile" initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}} transition={{duration:reduced?0:.3}}>
      <ul>{navigation.map(item=><li key={item.label}>{item.children?<><button aria-expanded={expanded===item.label} onClick={()=>setExpanded(expanded===item.label?null:item.label)}>{item.label}<ChevronDown size={16}/></button>{expanded===item.label&&<ul>{item.children.map(child=><li key={child.href}><a href={child.href} onClick={close}>{child.label}</a></li>)}</ul>}</>:<a href={item.href} onClick={close}>{item.label}</a>}</li>)}</ul>
      <button className="spa-button" onClick={()=>{close();onOpenBooking();}}>Agendar horário</button><a href="tel:+551138459200" className="spa-mobile-phone">(11) 3845-9200</a>
    </motion.nav>}</AnimatePresence>
  </header>;
};
