export interface LegacyHero {
  title: string;
  image: string;
  subtitle?: string;
}

export interface WithYouSection {
  title: string;
  description: string;
  image: string;
}

export interface TechnologyFeature {
  title: string;
  description: string;
  image?: string;
}

export interface LegacyAppFeature {
  title: string;
  description: string;
  subtext?: string;
  image?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface LegacyPageData {
  hero: LegacyHero;
  withYou: WithYouSection;
  technology: {
    title: string;
    features: TechnologyFeature[];
  };
  legacyApp: {
    title: string;
    features: LegacyAppFeature[];
  };
  faq: {
    title: string;
    items: FAQItem[];
  };
}
