import { Treatment, Testimonial, FAQItem, GalleryPhoto } from '../types';

export const SPA_SERVICES: Treatment[] = [
  {
    id: 'massage-pedras',
    title: 'Massoterapia com Pedras Vulcânicas',
    category: 'massage',
    duration: '75 min',
    price: 240,
    popular: true,
    description: 'Terapia relaxante profunda com pedras de basalto aquecidas em óleos botânicos aromáticos, estimulando o fluxo energético e aliviando a tensão muscular acumulada.',
    benefits: ['Alívio de dores nas costas e ombros', 'Estímulo da circulação sanguínea', 'Profundo relaxamento mental'],
    image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=800&q=80',
    icon: '/img/icons/icon-22.png'
  },
  {
    id: 'aroma-lavanda',
    title: 'Aromaterapia Floral & Ervas Alpinas',
    category: 'aromatherapy',
    duration: '60 min',
    price: 190,
    popular: false,
    description: 'Imersão olfativa com sinergias personalizadas de lavanda francesa, alecrim e bergamota, aplicada através de manobras rítmicas suaves para reequilíbrio dos chacras.',
    benefits: ['Redução acentuada do cortisol e ansiedade', 'Melhora da qualidade do sono', 'Equilíbrio sensorial'],
    image: '/images/aromatherapy-still-life.webp',
    icon: '/img/icons/icon-21.png'
  },
  {
    id: 'facial-organico',
    title: 'Ritual Facial Hidratante e Iluminador',
    category: 'facial',
    duration: '60 min',
    price: 220,
    popular: true,
    description: 'Protocolo de renovação celular com esfoliação botânica enzimática, massagem facial com rolos de quartzo rosa gelado e máscara de colágeno vegetal puro.',
    benefits: ['Luminosidade instantânea da pele', 'Nutrição dérmica sem oleosidade', 'Efeito tensor natural'],
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80',
    icon: '/img/icons/icon-20.png'
  },
  {
    id: 'massagem-sueca',
    title: 'Massagem Sueca Tradicional & Relaxante',
    category: 'massage',
    duration: '60 min',
    price: 180,
    popular: false,
    description: 'Técnica clássica com movimentos longos e fluidos, amassamento e fricção suave para desintoxicar tecidos moles e proporcionar leveza corporal inigualável.',
    benefits: ['Melhora da oxigenação tecidual', 'Eliminação de toxinas linfáticas', 'Sensação prolongada de bem-estar'],
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80',
    icon: '/img/icons/icon-23.png'
  },
  {
    id: 'banho-termal',
    title: 'Imersão Termal em Leite de Aveia & Rosas',
    category: 'special',
    duration: '90 min',
    price: 320,
    popular: true,
    description: 'Banho privativo em ofurô de cedro com infusões de leite de aveia orgânica, pétalas de rosas frescas e sais minerais do Himalaia, acompanhado de degustação de chá.',
    benefits: ['Hidratação profunda da epiderme', 'Desconexão do estresse urbano', 'Puro requinte sensorial'],
    image: 'https://images.unsplash.com/photo-1583416750470-965b2707b355?auto=format&fit=crop&w=800&q=80',
    icon: '/img/icons/icon-24.png'
  },
  {
    id: 'head-spa-craniana',
    title: 'Terapia Capilar e Craniana Zen',
    category: 'special',
    duration: '50 min',
    price: 170,
    popular: false,
    description: 'Tratamento focado no couro cabeludo, nuca e têmporas com óleos de hortelã-pimenta e lavanda, descompressão das vértebras cervicais e vapor de ozônio.',
    benefits: ['Combate enxaquecas e fadiga ocular', 'Estimula a vitalidade capilar', 'Clareza e serenidade mental'],
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80',
    icon: '/img/icons/icon-25.png'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Carolina Mendes de Albuquerque',
    role: 'Diretora Criativa & Arquiteta',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    comment: 'O Élysée Spa transcende o conceito comum de bem-estar. A atenção meticulosa aos aromas, a temperatura exata das toalhas e a técnica impecável da massagem com pedras me renovaram por completo.',
    treatmentName: 'Massoterapia com Pedras Vulcânicas'
  },
  {
    id: '2',
    name: 'Rodrigo Fontoura Guimarães',
    role: 'Empreendedor de Tecnologia',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    comment: 'Com a rotina intensa de viagens e reuniões, o Ritual Capilar e Craniano tornou-se meu refúgio sagrado a cada quinze dias. Saio daqui com o foco renovado e sem nenhuma tensão no corpo.',
    treatmentName: 'Terapia Capilar e Craniana Zen'
  },
  {
    id: '3',
    name: 'Mariana Duarte Vasconcelos',
    role: 'Médica Dermatologista',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    comment: 'Como médica, sou extremamente exigente com os produtos utilizados na pele. Fiquei impressionada com a pureza dos cosméticos botânicos do Ritual Facial Iluminador. Minha pele ficou radiante por semanas.',
    treatmentName: 'Ritual Facial Hidratante e Iluminador'
  }
];

export const FAQ_LIST: FAQItem[] = [
  {
    id: 'faq-1',
    question: '1. Como funciona a reserva de tratamentos personalizados?',
    answer: 'Você pode escolher seu ritual diretamente em nosso sistema online ou consultar nosso atendimento especializado. Ao agendar, você poderá indicar suas preferências de pressão, áreas que necessitam de mais atenção e restrições aromáticas.'
  },
  {
    id: 'faq-2',
    question: '2. Quais tipos de óleos e cosméticos são utilizados nas terapias?',
    answer: 'Utilizamos exclusivamente óleos vegetais prensados a frio (jojoba, semente de uva e amêndoas doces) combinados com óleos essenciais orgânicos 100% puros e certificados. Não utilizamos petrolatos, parabenos ou fragrâncias sintéticas.'
  },
  {
    id: 'faq-3',
    question: '3. É possível agendar sessões simultâneas para casais ou amigos?',
    answer: 'Sim, dispomos de suítes duplas privativas equipadas com banheira de imersão dupla, som ambiente customizável e área para degustação de espumante e infusões após o tratamento.'
  },
  {
    id: 'faq-4',
    question: '4. Qual a antecedência recomendada para chegada ao spa?',
    answer: 'Recomendamos chegar com 20 minutos de antecedência. Esse tempo permite que você vista nosso roupão de algodão egípcio, desfrute de uma infusão calmante de boas-vindas e realize uma breve anamnese personalizada com seu terapeuta.'
  }
];

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'g1',
    title: 'Banho de Imersão com Pétalas',
    category: 'Ambiente',
    image: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'g2',
    title: 'Óleos Essenciais & Infusões',
    category: 'Botânicos',
    image: '/images/aromatherapy-still-life.webp'
  },
  {
    id: 'g3',
    title: 'Pedras de Basalto Aquecidas',
    category: 'Terapia',
    image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'g4',
    title: 'Protocolo Facial Revitalizante',
    category: 'Estética',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'g5',
    title: 'Salão de Chás & Descanso Zen',
    category: 'Ambiente',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'g6',
    title: 'Piscina de Hidroterapia Aquecida',
    category: 'Relaxamento',
    image: 'https://images.unsplash.com/photo-1583416750470-965b2707b355?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'g7',
    title: 'Sais Minerais e Ervas Frescas',
    category: 'Produtos',
    image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'g8',
    title: 'Suíte Privativa para Casais',
    category: 'Experiência',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80'
  }
];

export const THERAPISTS = [
  { id: 'camila', name: 'Camila Mendonça (Especialista em Massoterapia Oriental)' },
  { id: 'felipe', name: 'Felipe Alencar (Fisioterapeuta & Liberação Miofascial)' },
  { id: 'beatriz', name: 'Beatriz Moretti (Naturopata & Aromaterapeuta Clínica)' },
  { id: 'juliana', name: 'Juliana Prado (Cosmetóloga & Terapeuta Holística)' },
  { id: 'any', name: 'Primeiro Terapeuta Disponível (Recomendado)' }
];
