import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Check, Clock, Mail, MapPin, Phone, Sparkles } from 'lucide-react';
import { AboutSection } from '../components/AboutSection';
import { ServicesSection } from '../components/ServicesSection';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { PricingMenu } from '../components/PricingMenu';
import { GallerySection } from '../components/GallerySection';
import { BookingSection } from '../components/BookingSection';
import { SPA_SERVICES, THERAPISTS } from '../data/spaData';
import { pageTitles } from '../navigation';
import { navigateSite } from '../useSiteRoute';
import type { Treatment } from '../types';

type Props = { path:string; search:URLSearchParams; onBook:(treatment?:Treatment)=>void };
const currency=(value:number)=>value.toLocaleString('pt-BR',{style:'currency',currency:'BRL'});

const articles = [
  { id:'primeira-visita', title:'Seu primeiro dia no spa', category:'Experiências', image:'/images/facial-treatment.webp', summary:'Uma visita começa antes de entrar na sala de tratamento. Veja como organizar seu momento com tranquilidade.', paragraphs:[
    'Escolher um horário com calma faz diferença na experiência. Antes da visita, confira o endereço, o tempo de deslocamento e os detalhes do ritual que você reservou. Nossa equipe pode ajudar com as dúvidas sobre duração, ambiente e disponibilidade.',
    'No Élysée, recomendamos a chegada com vinte minutos de antecedência, conforme as orientações do agendamento. Assim, há tempo para conhecer o espaço e conversar com a equipe sobre suas preferências.',
    'Conte o que faz você se sentir confortável: intensidade do toque, aromas, temperatura e silêncio. O atendimento começa com essa conversa. Para necessidades específicas relacionadas à sua saúde ou aos produtos utilizados, fale com a equipe antes de confirmar a sessão.',
    'Ao final, reserve alguns minutos para voltar ao seu ritmo. Você não precisa sair correndo: desfrute do ambiente e organize o restante do dia de um jeito que respeite o tempo que dedicou a si.',
  ] },
  { id:'tempo-para-voce', title:'Uma pausa para sair do automático', category:'Bem-estar', image:SPA_SERVICES[0].image, summary:'Pequenos intervalos podem mudar a forma como você vive sua rotina. Comece reservando um tempo que seja seu.', paragraphs:[
    'Nem toda pausa precisa de um grande plano. Pode ser uma caminhada sem pressa, uma música que você gosta ou um encontro com o silêncio. O essencial é escolher um momento em que você não precise responder a todas as demandas ao mesmo tempo.',
    'Experimente combinar esse intervalo com sua agenda real. Escolha um horário possível e deixe os compromissos organizados ao redor dele. Assim, o autocuidado não vira mais uma tarefa difícil de cumprir.',
    'No spa, cada pessoa encontra seu próprio jeito de aproveitar o tempo. Há quem prefira uma conversa leve e quem queira apenas descansar. Conte sua preferência à equipe para que o ambiente acompanhe você.',
    'Se quiser conhecer os rituais do Élysée, explore nosso menu de serviços. As descrições, os valores e a duração estão disponíveis para ajudar você a escolher com tranquilidade.',
  ] },
  { id:'pequenos-detalhes', title:'O cuidado nos pequenos detalhes', category:'Nosso espaço', image:'/images/aromatherapy-still-life.webp', summary:'Luz, textura, aromas e acolhimento: conheça os elementos que fazem parte da experiência Élysée.', paragraphs:[
    'Uma toalha macia, uma iluminação confortável e uma recepção atenciosa compõem o ambiente antes mesmo de começar um ritual. Gostamos de pensar nesses detalhes como parte do acolhimento.',
    'Os aromas também participam da experiência. Como as preferências variam, converse com nossa equipe se algum perfume não for agradável para você ou se precisar de uma adaptação no atendimento.',
    'O mesmo vale para a temperatura da sala, a música e a vontade de conversar. Um espaço acolhedor é aquele em que você pode dizer o que prefere e ser ouvido com atenção.',
    'Nosso convite é simples: conheça o ambiente, tire suas dúvidas e escolha o ritual que combina com o seu momento. A equipe está disponível pelos canais de contato e pelo agendamento do site.',
  ] },
];

const pageImages: Record<string, {image: string; position?: string}> = {
  '/about.html': {image:'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1920&q=85'},
  '/appoinment.html': {image:'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1920&q=85'},
  '/faq.html': {image:'/images/aromatherapy-still-life.webp',position:'center 55%'},
  '/team.html': {image:'/images/spa-team.webp',position:'center 25%'},
  '/team-details.html': {image:'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1920&q=85'},
  '/pricing.html': {image:'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1920&q=85'},
  '/services.html': {image:'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1920&q=85'},
  '/services-details.html': {image:'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=1920&q=85'},
  '/portfolio.html': {image:'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1920&q=85'},
  '/blog.html': {image:'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=1920&q=85'},
  '/blog-details.html': {image:'/images/facial-treatment.webp'},
  '/contact.html': {image:'https://images.unsplash.com/photo-1583416750470-965b2707b355?auto=format&fit=crop&w=1920&q=85'},
};

function PageHero({ title, detail, image }: {title:string;detail?:string;image?:string}) {
  const ref=useRef<HTMLElement>(null);
  const reduced=useReducedMotion();
  const {scrollYProgress}=useScroll({target:ref,offset:['start start','end start']});
  const y=useTransform(scrollYProgress,[0,1],[0,85]);
  const visual=pageImages[window.location.pathname]||pageImages['/about.html'];
  return <section ref={ref} className="spa-page-hero">
    <motion.div className="spa-page-hero-photo" aria-hidden="true" style={{backgroundImage:`url("${image||visual.image}")`,backgroundPosition:visual.position||'center 50%',y:reduced?0:y}} initial={reduced?false:{clipPath:'inset(0 100% 0 0)'}} animate={{clipPath:'inset(0 0% 0 0)'}} transition={{duration:reduced?0:1.15,ease:[.22,1,.36,1]}}/>
    <div className="spa-page-hero-shade"/>
    <div data-reveal="up" data-reveal-delay="0.16" className="spa-page-hero-copy"><h1>{title}</h1><nav aria-label="Você está em"><a href="/">Início</a><span aria-hidden="true">/</span>{detail?<><a href="/services.html">Serviços</a><span aria-hidden="true">/</span></>:null}<span aria-current="page">{detail||title}</span></nav></div>
    <div className="spa-hero-cloud" aria-hidden="true"/>
  </section>;
}

function PageCallout({ onBook }: {onBook:()=>void}) {
  return <section className="spa-page-callout"><div data-reveal="up" className="spa-page-shell"><span>Reserve um tempo para você</span><h2>Seu próximo momento de tranquilidade começa aqui.</h2><button className="spa-button" onClick={onBook}>Agendar meu ritual<ArrowRight size={17}/></button></div></section>;
}

function Team({ onBook }: {onBook:()=>void}) {
  return <section className="spa-page-section spa-team-section"><div className="spa-page-shell"><div data-reveal="up" className="spa-page-heading"><span>Nossa equipe</span><h2>Especialistas em acolher você</h2><p>Conheça os profissionais disponíveis no agendamento do Élysée.</p></div><div className="spa-team-grid">{THERAPISTS.filter(t=>t.id!=='any').map((therapist,i)=>{
    const [name,role]=therapist.name.replace(')','').split(' (');
    return <article data-reveal="up" data-reveal-delay={(i % 4) * .09} key={therapist.id}><a href={'/team-details.html?therapist='+therapist.id} className="spa-team-photo" aria-label={'Conhecer '+name} style={{backgroundPosition:[0,66.667,33.333,100][i]+'% 30%'}}/><div><h3><a href={'/team-details.html?therapist='+therapist.id}>{name}</a></h3><p>{role}</p><button onClick={onBook}>Consultar disponibilidade<ArrowRight size={15}/></button></div></article>;
  })}</div></div></section>;
}

function TeamDetails({search,onBook}:Pick<Props,'search'|'onBook'>) {
  const team=THERAPISTS.filter(t=>t.id!=='any');
  const index=Math.max(0,team.findIndex(t=>t.id===search.get('therapist')));
  const [name,role]=team[index].name.replace(')','').split(' (');
  return <><PageHero title="Nossa equipe"/><section className="spa-page-section"><div className="spa-page-shell spa-profile"><div data-reveal="image" className="spa-team-photo" style={{backgroundPosition:[0,66.667,33.333,100][index]+'% 30%'}} role="img" aria-label={'Profissional da equipe Élysée'}/><div data-reveal="right"><span className="spa-page-kicker">Conheça nossa equipe</span><h2>{name}</h2><p className="spa-profile-role">{role}</p><p>O atendimento no Élysée começa com uma conversa sobre suas preferências e o ritual escolhido. Nossa equipe está disponível para orientar você sobre o ambiente, a duração da sessão e a experiência no espaço.</p><div className="spa-profile-points"><span><Check/>Atendimento com atenção</span><span><Check/>Rituais do menu Élysée</span><span><Check/>Escolha do profissional no agendamento</span></div><button className="spa-button" onClick={()=>onBook()}>Consultar horários<ArrowRight size={17}/></button><a className="spa-page-text-link" href="/team.html">Voltar para a equipe</a></div></div></section></>;
}

function ServiceDetails({search,onBook}:Pick<Props,'search'|'onBook'>) {
  const service=SPA_SERVICES.find(t=>t.id===search.get('service'))||SPA_SERVICES[0];
  return <><PageHero title="Nossos rituais" detail={service.title} image={service.image}/><section className="spa-page-section"><div className="spa-page-shell spa-service-layout"><aside data-reveal="left" className="spa-service-index"><h2>Nossos serviços</h2><nav aria-label="Escolher ritual">{SPA_SERVICES.map(t=><a href={'/services-details.html?service='+t.id} key={t.id} aria-current={service.id===t.id?'page':undefined}>{t.title}<ArrowRight size={16}/></a>)}</nav><div><Sparkles/><h3>Um momento seu</h3><p>Converse com nossa equipe para escolher o ritual e o horário que combinam com você.</p><button className="spa-button" onClick={()=>onBook(service)}>Agendar</button></div></aside><article className="spa-service-article"><img data-reveal="image" src={service.image} alt={service.title}/><div data-reveal="up" className="spa-service-meta"><span><Clock size={17}/>{service.duration}</span><strong>{currency(service.price)}</strong></div><h2 data-reveal="up">{service.title}</h2><p data-reveal="up">{service.description}</p><h3 data-reveal="up">O que faz parte da experiência</h3><ul data-reveal="up">{service.benefits.map(item=><li key={item}><Check size={19}/>{item}</li>)}</ul><p>Ao agendar, escolha o horário e o profissional disponível. Use o campo de observações para informar preferências e conversar com a equipe sobre o atendimento.</p><button className="spa-button" onClick={()=>onBook(service)}>Reservar este ritual<ArrowRight size={17}/></button></article></div></section></>;
}

function Contact({onBook}:Pick<Props,'onBook'>) {
  return <><section className="spa-page-section"><div className="spa-page-shell"><div data-reveal="up" className="spa-page-heading"><span>Fale com o Élysée</span><h2>Estamos aqui para receber você</h2><p>Conheça nossos canais e tire suas dúvidas antes da visita.</p></div><div className="spa-contact-grid"><article data-reveal="up"><MapPin/><h3>Nosso endereço</h3><p>Alameda dos Jasmins, 1420<br/>Jardins, São Paulo — SP</p><a href="https://www.google.com/maps/search/?api=1&query=Alameda+dos+Jasmins+1420+Sao+Paulo" target="_blank" rel="noreferrer">Ver no mapa<ArrowRight size={15}/></a></article><article data-reveal="up" data-reveal-delay="0.1"><Phone/><h3>Converse com a equipe</h3><a href="tel:+551138459200">(11) 3845-9200</a><a href="tel:+5511987654321">(11) 98765-4321</a><a href="mailto:contato@elyseespa.com.br">contato@elyseespa.com.br</a></article><article data-reveal="up" data-reveal-delay="0.2"><Clock/><h3>Horário de atendimento</h3><p>Segunda a sábado: 9h às 20h<br/>Domingos e feriados: 10h às 18h</p><button onClick={()=>onBook()}>Agendar horário<ArrowRight size={15}/></button></article></div></div></section><BookingSection/></>;
}

function Blog({detail,search}:{detail?:boolean;search:URLSearchParams}) {
  const article=articles.find(a=>a.id===search.get('article'))||articles[0];
  if(detail)return <section className="spa-page-section"><div className="spa-page-shell spa-blog-layout"><article className="spa-blog-article"><img data-reveal="image" src={article.image} alt={article.title}/><span className="spa-page-kicker">{article.category}</span><h2 data-reveal="up">{article.title}</h2><p data-reveal="up" className="spa-blog-intro">{article.summary}</p>{article.paragraphs.map(p=><p data-reveal="up" key={p}>{p}</p>)}<a href="/services.html" className="spa-button">Conhecer os rituais<ArrowRight size={17}/></a></article><aside data-reveal="up"><h3>Continue lendo</h3>{articles.filter(a=>a.id!==article.id).map(a=><a key={a.id} href={'/blog-details.html?article='+a.id}><img src={a.image} alt=""/><span>{a.title}</span></a>)}<a href="/blog.html" className="spa-page-text-link">Todos os artigos<ArrowRight size={16}/></a></aside></div></section>;
  return <section className="spa-page-section"><div className="spa-page-shell"><div data-reveal="up" className="spa-page-heading"><span>Diário Élysée</span><h2>Inspiração para o seu tempo</h2><p>Histórias e detalhes para conhecer melhor a experiência no spa.</p></div><div className="spa-blog-grid">{articles.map((a,i)=><article data-reveal="up" data-reveal-delay={i * .1} key={a.id}><a href={'/blog-details.html?article='+a.id} className="spa-blog-cover"><img src={a.image} alt={a.title}/></a><div><span className="spa-page-kicker">{a.category}</span><h2><a href={'/blog-details.html?article='+a.id}>{a.title}</a></h2><p>{a.summary}</p><a className="spa-page-text-link" href={'/blog-details.html?article='+a.id}>Ler artigo<ArrowRight size={16}/></a></div></article>)}</div></div></section>;
}

export function ContentPage({path,search,onBook}:Props) {
  const title=pageTitles[path];
  if(!title)return <main id="main-content" tabIndex={-1} className="spa-content-page"><PageHero title="Página não encontrada"/><section className="spa-page-section spa-page-heading"><h2>Vamos encontrar seu caminho?</h2><p>O endereço solicitado não está disponível.</p><a className="spa-button" href="/">Voltar ao início</a></section></main>;
  return <main id="main-content" tabIndex={-1} className={'spa-content-page route-'+path.replace(/[^a-z]/g,'')}>
    {path==='/services-details.html'?<ServiceDetails search={search} onBook={onBook}/>:path==='/team-details.html'?<TeamDetails search={search} onBook={onBook}/>:<>
      <PageHero title={title}/>
      {path==='/about.html'&&<><AboutSection onOpenBooking={()=>onBook()}/><PageCallout onBook={()=>onBook()}/><Team onBook={()=>onBook()}/></>}
      {path==='/appoinment.html'&&<BookingSection/>}
      {path==='/faq.html'&&<><WhyChooseUs/><PageCallout onBook={()=>onBook()}/></>}
      {path==='/team.html'&&<><Team onBook={()=>onBook()}/><PageCallout onBook={()=>onBook()}/></>}
      {path==='/pricing.html'&&<PricingMenu onOpenBookingFor={onBook}/>}
      {path==='/services.html'&&<><ServicesSection onOpenBookingFor={onBook} onSelectTreatment={t=>navigateSite('/services-details.html?service='+t.id)}/><PageCallout onBook={()=>onBook()}/></>}
      {path==='/portfolio.html'&&<GallerySection/>}
      {(path==='/blog.html'||path==='/blog-details.html')&&<Blog detail={path==='/blog-details.html'} search={search}/>}
      {path==='/contact.html'&&<Contact onBook={onBook}/>}
    </>}
  </main>;
}
