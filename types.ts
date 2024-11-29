export interface Business {
  title: string;
  overview: string;
  slug: {
    current: string;
  };
  mainImage: {
    asset: {
      _ref: string;
      _type: string;
    };
    alt?: string;
  };
  content: Array<{
    _type: 'block' | 'image';
    children?: Array<{ text: string }>;
    asset?: {
      _ref: string;
      _type: string;
    };
    alt?: string;
  }>;

  authorName?: string;
  authorAvatar?: {
    asset: {
      _ref: string;
      _type: string;
      url?: string;
    };
  };
  readTime?: number;
  publishedDate?: string;

  category?: {
    _ref: string;  
    _type: 'reference'; 
  };
}

// 2: Food and drink
export interface FoodandDrink {
  title: string;
  overview: string;
  slug: {
    current: string;
  };
  mainImage: {
    asset: {
      _ref: string;
      _type: string;
    };
    alt?: string;
  };
  content: Array<{
    _type: 'block' | 'image';
    children?: Array<{ text: string }>;
    asset?: {
      _ref: string;
      _type: string;
    };
    alt?: string;
  }>;

  authorName?: string;
  authorAvatar?: {
    asset: {
      _ref: string;
      _type: string;
      url?: string;
    };
  };
  readTime?: number;
  publishedDate?: string;

    category?: {
    _ref: string;  
    _type: 'reference'; 
  };
}

// 3: Health and Fitness
export interface HealthndFitness {
  title: string;
  overview: string;
  slug: {
    current: string;
  };
  mainImage: {
    asset: {
      _ref: string;
      _type: string;
    };
    alt?: string;
  };
  content: Array<{
    _type: 'block' | 'image';
    children?: Array<{ text: string }>;
    asset?: {
      _ref: string;
      _type: string;
    };
    alt?: string;
  }>;

  authorName?: string;
  authorAvatar?: {
    asset: {
      _ref: string;
      _type: string;
      url?: string;
    };
  };
  readTime?: number;
  publishedDate?: string;

    category?: {
    _ref: string;  
    _type: 'reference'; 
  };
}

// 4:News and Current Affairs
export interface NewsandCurrentAffairs {
  title: string;
  overview: string;
  slug: {
    current: string;
  };
  mainImage: {
    asset: {
      _ref: string;
      _type: string;
    };
    alt?: string;
  };
  content: Array<{
    _type: 'block' | 'image';
    children?: Array<{ text: string }>;
    asset?: {
      _ref: string;
      _type: string;
    };
    alt?: string;
  }>;

  authorName?: string;
  authorAvatar?: {
    asset: {
      _ref: string;
      _type: string;
      url?: string;
    };
  };
  readTime?: number;
  publishedDate?: string;

    category?: {
    _ref: string;  
    _type: 'reference'; 
  };
}

// 5: sports
export interface Sports {
  title: string;
  overview: string;
  slug: {
    current: string;
  };
  mainImage: {
    asset: {
      _ref: string;
      _type: string;
    };
    alt?: string;
  };
  content: Array<{
    _type: 'block' | 'image';
    children?: Array<{ text: string }>;
    asset?: {
      _ref: string;
      _type: string;
    };
    alt?: string;
  }>;

  authorName?: string;
  authorAvatar?: {
    asset: {
      _ref: string;
      _type: string;
      url?: string;
    };
  };
  readTime?: number;
  publishedDate?: string;

    category?: {
    _ref: string;  
    _type: 'reference'; 
  };
}

//6: Technology and Innovation
export interface TechandInnovation {
  title: string;
  overview: string;
  slug: {
    current: string;
  };
  mainImage: {
    asset: {
      _ref: string;
      _type: string;
    };
    alt?: string;
  };
  content: Array<{
    _type: 'block' | 'image';
    children?: Array<{ text: string }>;
    asset?: {
      _ref: string;
      _type: string;
    };
    alt?: string;
  }>;

  authorName?: string;
  authorAvatar?: {
    asset: {
      _ref: string;
      _type: string;
      url?: string;
    };
  };
  readTime?: number;
  publishedDate?: string;

    category?: {
    _ref: string;  
    _type: 'reference'; 
  };
}
