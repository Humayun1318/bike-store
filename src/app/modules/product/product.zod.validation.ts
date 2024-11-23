import { z } from 'zod';

// Define the Zod schema for product validation
const ProductValidationSchema = z.object({
  name: z.string().min(2, "Product name is wrong").trim(),  
  brand: z.string().min(1, "Product brand is wrong").trim(),  
  price: z.number().min(0, "Product price must be a positive number"),  
  // Ensure the category is one of the allowed values
  category: z.enum(['Mountain', 'Hybrid', 'Road', 'Electric'], {
    invalid_type_error: "Product category must be following this, ['Mountain', 'Hybrid', 'Road', 'Electric']."
  }),
  
  description: z.string().min(1, "Product description is missing").trim(),  
  quantity: z.number().min(1, "Product quantity must be greater than zero"),  
  inStock: z.boolean(), 
});

export default ProductValidationSchema;