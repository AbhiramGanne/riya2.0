export interface Message {
  id: string;
  sender: 'user' | 'riya';
  text: string;
  timestamp: string;
  isQuickResponse?: boolean;
}

export interface Lead {
  id?: string;
  name: string;
  phone: string;
  email: string;
  areaOfInterest: string;
  timestamp?: string;
  consented: boolean;
}

export interface ProductDetail {
  title: string;
  category: string;
  aliases?: string[];
  keywords?: string[];
  summary: string;
  facts: string[];
  suitableFor?: string[];
  risks?: string[];
  links?: Record<string, string>;
}

export interface ProductGroup {
  id: string;
  name: string;
  description: string;
  icon: string;
}
