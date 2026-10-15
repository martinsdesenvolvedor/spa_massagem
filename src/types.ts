export interface Treatment {
  id: string;
  title: string;
  category: 'massage' | 'facial' | 'aromatherapy' | 'special';
  duration: string;
  price: number;
  popular?: boolean;
  description: string;
  benefits: string[];
  image: string;
  icon?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  comment: string;
  treatmentName: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  category: string;
  image: string;
}

export interface BookingData {
  serviceId: string;
  serviceName: string;
  date: string;
  time: string;
  therapist: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  notes?: string;
}
