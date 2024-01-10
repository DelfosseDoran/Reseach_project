interface ProductData {
  responseStatus: string;
  responseMessage: string;
  productTitle: string;
  manufacturer: string;
  countReview: number;
  answeredQuestions: number;
  productRating: string;
  asin: string;
  sizeSelection: any[]; // Replace with appropriate type
  soldBy: string;
  fulfilledBy: string;
  sellerId: string;
  warehouseAvailability: string;
  retailPrice: number;
  price: number;
  priceRange: any; // Replace with appropriate type
  shippingPrice: number;
  priceShippingInformation: string;
  priceSaving: any; // Replace with appropriate type
  features: string[];
  imageUrlList: string[];
  videoeUrlList: string[];
  productDescription: string;
  productDetails: {
    name: string;
    value: string;
  }[];
  minimalQuantity: string;
  dealPrice: number;
  salePrice: number;
  reviews: {
    text: string;
    date: string;
    rating: string;
    title: string;
    userName: string;
    url: string;
    imageUrlList: string[];
    variationList: any[]; // Replace with appropriate type
  }[];
  productSpecification: any[]; // Replace with appropriate type
  mainImage: {
    imageUrl: string;
    imageResolution: string;
  };
  variations: any[]; // Replace with appropriate type
  bookVariations: any[]; // Replace with appropriate type
  categories: string[];
  categoriesExtended: {
    name: string;
    url: string;
    node: string;
  }[];
  currency: any; // Replace with appropriate type
  acKeywordLink: any; // Replace with appropriate type
  deliveryMessage: any; // Replace with appropriate type
  rentPrice: number;
  usedPrice: number;
  retailPriceRent: number;
  coupon: any; // Replace with appropriate type
  series: any; // Replace with appropriate type
  importantInformation: any[]; // Replace with appropriate type
  buyBoxUsed: any; // Replace with appropriate type
  aboutProduct: any[]; // Replace with appropriate type
  prime: boolean;
  addon: boolean;
  pantry: boolean;
  used: boolean;
}
