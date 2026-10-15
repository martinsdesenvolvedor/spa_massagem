export type MenuItem = { label: string; href?: string; children?: MenuItem[] };
// Content pages only: the template's alternative demo layouts are intentionally omitted.
export const navigation: MenuItem[] = [
  { label: 'Início', href: '/' },
  { label: 'Conheça', children: [
    { label: 'Sobre nós', href: '/about.html' },
    { label: 'Agendamento', href: '/appoinment.html' },
    { label: 'Perguntas frequentes', href: '/faq.html' },
    { label: 'Nossa equipe', href: '/team.html' },
    { label: 'Preços e rituais', href: '/pricing.html' },
  ] },
  { label: 'Serviços', children: [
    { label: 'Nossos serviços', href: '/services.html' },
    { label: 'Detalhes dos rituais', href: '/services-details.html' },
  ] },
  { label: 'Galeria', href: '/portfolio.html' },
  { label: 'Blog', href: '/blog.html' },
  { label: 'Contato', href: '/contact.html' },
];

export const pageTitles: Record<string,string> = {
  '/about.html':'Sobre o Élysée', '/appoinment.html':'Agendamento', '/faq.html':'Perguntas frequentes',
  '/team.html':'Nossa equipe', '/team-details.html':'Conheça nosso profissional', '/pricing.html':'Preços & rituais',
  '/services.html':'Nossos serviços', '/services-details.html':'Detalhes do ritual',
  '/portfolio.html':'Nosso portfólio', '/blog.html':'Blog & bem-estar', '/blog-details.html':'Diário Élysée', '/contact.html':'Entre em contato',
};
