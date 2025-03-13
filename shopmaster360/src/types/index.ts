export interface Product {
  id: string;
  name: string;
  price: {
    regular: number;
    sale: number;
    discountPercentage: number;
  };
  media: {
    type: "image" | "video";
    path: string;
  }[];
  inventory: {
    stock: number;
  };
}

export interface DecodedToken {
  id: string;
  email: string;
  name?: string;
  role?: string;
  iat?: number;
  exp?: number;
}
