
//This is the type of product schema

export type TProduct = {
  name: string;
  brand: string;
  price: number;
  category: "Road" | "Hybrid" | "Electric" | "Mountain";
  description: string;
  quantity: number;
  inStock: boolean;
  createdAt?: Date;  // Optional because MongoDB generates this field automatically
  updatedAt?: Date;  // Optional because MongoDB generates this field automatically
}