export interface Feature {
    title: string;
    description: string;
  }
  
  export interface FeatureSection {
    title?: string;
    subtitle?: string;
    description?: string;
    image?: string;
    buttonText?: string;
    features: Feature[];
    featureList?: Feature[];
  } 