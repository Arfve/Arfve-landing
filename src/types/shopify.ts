// export interface ShopifyMenuItem {
//   id: string
//   title: string
//   url: string
//   type: string
// }

// export interface ShopifyCart {
//   id: string
//   lines: Array<{
//     id: string
//     quantity: number
//     merchandise: {
//       id: string
//       title: string
//       price: {
//         amount: string
//         currencyCode: string
//       }
//     }
//   }>
//   totalQuantity: number
//   cost: {
//     totalAmount: {
//       amount: string
//       currencyCode: string
//     }
//   }
// }

// export interface Metafield {
//   key: string
//   value: string
//   namespace: string
//   reference: {
//     image: {
//       url: string
//     }
//   }
// }

// export interface HeroData {
//   title: string
//   subtitle: string
//   buttonText: string
//   image: string
// }

// export interface Feature {
//   title: string
//   subtitle: string
//   featureList: string[]
//   image: string
// }

// export interface FeaturesData {
//   title: string
//   subtitle: string
//   list: Feature[]
// }

// export interface StatementData {
//   title: string
//   content: string
// }

// export interface AppData {
//   image: string
// }

// export interface CrowdfundingData {
//   title: string
//   subtitle: string
//   buttonText: string
//   features: string[]
// }

// export interface AboutData {
//   upgradeTitle: string
//   upgradeSubtitle: string
//   beMoreHuman: string
//   whyChooseArfve: string
//   bragi: string
// }

// export interface Testimonial {
//   quote: string
  
// }

// export interface HeaderData {
//   menuItems: ShopifyMenuItem[]
// }

// export interface FooterData {
//   menuItems: ShopifyMenuItem[]
//   socialLinks?: {
//     facebook?: string
//     twitter?: string
//     instagram?: string
//   }
// }

// export interface Testimonial {
//   quote: string
//   author: string
//   role: string
//   imageUrl?: string
// }

// export interface TestimonialsData {
//   title: string
//   list: Testimonial[]
// } 


// export interface AboutPageData {
//   hero: {
//     title: string ;
//     subtitle: string ;
//     buttonText: string ;
//     image: string ;
//   };
//   features: {
//     title: string ;
//     subtitle: string ;
//     featureList: any[];
//     image: string ;
//   };
//   statement: {
//     title: string ;
//     content: string ;
//   };
//   app: {
//     image: string ;
//   };
//   crowdfunding: {
//     title: string ;
//     subtitle: string ;
//     buttonText: string ;
//     features: any[];
//   };
//   about: {
//     upgrade: {
//       title: string ;
//       description: string ;
//       image: string ;
//     };
//     beMoreHuman: {
//       title: string ;
//       subtitle: string ;
//       description: string ;
//       image: string ;
//     };
//     whyChoose: {
//       title: string ;
//       description: string ;
//       features: any[];
//     };
//     bragi: any[];
//     testimonials: TestimonialsData;
//   };
// }


export interface ShopifyMenuItem {
  id: string;
  title: string;
  url: string;
  type: string;
}

export interface ShopifyCart {
  id: string;
  lines: Array<{
    id: string;
    quantity: number;
    merchandise: {
      id: string;
      title: string;
      price: {
        amount: string;
        currencyCode: string;
      };
    };
  }>;
  totalQuantity: number;
  cost: {
    totalAmount: {
      amount: string;
      currencyCode: string;
    };
  };
}

export interface Metafield {
  key: string;
  value: string;
  namespace: string;
  reference: {
    image: {
      url: string;
    };
  };
}

export interface HeroData {
  title: string;
  subtitle: string;
  buttonText: string;
  image: string;
}

export interface Feature {
  title: string;
  subtitle: string;
  description: string;
  featureList: string[];
  image: string;
}

export interface FeaturesData {
  title: string;
  subtitle: string;
  list: Feature[];
}

export interface StatementData {
  title: string;
  content: string;
}

export interface AppData {
  image: string;
}

export interface CrowdfundingData {
  title: string;
  subtitle: string;
  buttonText: string;
  features: string[];
}

export interface AboutData {
  upgradeTitle?: string;
  upgradeSubtitle?: string;
  beMoreHuman?: string;
  whyChooseArfve?: string;
  bragi?: string;
}

export interface Testimonial {
  quote: string;
  author?: string;
  role?: string;
  imageUrl?: string;
  name: string;
  review: string;
  rating: number;
}

export interface HeaderData {
  menuItems: ShopifyMenuItem[];
}

export interface FooterData {
  menuItems: ShopifyMenuItem[];
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
  };
}

export interface TestimonialsData {
  title: string;
  list: Testimonial[];
}

export interface AboutPageData {
  hero: {
    title: string;
    subtitle: string;
    buttonText: string;
    image: string;
  };
  features: {
    title: string;
    subtitle: string;
    featureList: any[];
    image: string;
  };
  statement: {
    title: string;
    content: string;
  };
  app: {
    image: string;
  };
  crowdfunding: {
    title: string;
    subtitle: string;
    buttonText: string;
    features: Feature[];
  };
  about: {
    upgrade: {
      title: string;
      description: string;
      image: string;
    };
    beMoreHuman: {
      title: string;
      subtitle: string;
      description: string;
      image: string;
    };
    whyChoose: {
      title: string;
      description: string;
      features: Feature[];
    };
     bragi: string[];
    // bragi: BragiItem[];
    testimonials: TestimonialsData;
  };
}

export type BragiItem = {
  icon: string;
  title: string;
  description: string;
};