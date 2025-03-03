
export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  blurImage?: string;
  featured?: boolean;
  new?: boolean;
  stock: number;
  rating?: number;
  reviews?: number;
};

export const products: Product[] = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    description: "Immerse yourself in stunning sound quality with our premium wireless headphones. Featuring active noise cancellation, 30-hour battery life, and luxurious memory foam ear cushions.",
    price: 299,
    category: "Audio",
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
    blurImage: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=20&q=10",
    featured: true,
    new: true,
    stock: 15,
    rating: 4.8,
    reviews: 124,
  },
  {
    id: "2",
    name: "Minimalist Desk Lamp",
    description: "This elegant desk lamp combines form and function with its minimalist design and warm, adjustable lighting. Perfect for your home office or reading nook.",
    price: 89,
    category: "Home",
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
    blurImage: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=20&q=10",
    featured: true,
    stock: 23,
    rating: 4.5,
    reviews: 47,
  },
  {
    id: "3",
    name: "Classic Leather Wallet",
    description: "Crafted from full-grain leather, this classic wallet ages beautifully and includes smart organization for cards and cash with RFID protection.",
    price: 59,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
    blurImage: "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=20&q=10",
    featured: false,
    stock: 38,
    rating: 4.7,
    reviews: 85,
  },
  {
    id: "4",
    name: "Ceramic Pour-Over Coffee Set",
    description: "Elevate your morning ritual with this beautifully designed ceramic pour-over coffee set, allowing for precise temperature control and optimal extraction.",
    price: 65,
    category: "Kitchen",
    image: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d",
    blurImage: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d?auto=format&fit=crop&w=20&q=10",
    featured: true,
    stock: 12,
    rating: 4.9,
    reviews: 32,
  },
  {
    id: "5",
    name: "Wooden Wall Clock",
    description: "Add a touch of natural elegance to any room with this handcrafted wooden wall clock. Silent movement ensures a peaceful environment.",
    price: 45,
    category: "Home",
    image: "https://images.unsplash.com/photo-1493962853295-0fd70327578a",
    blurImage: "https://images.unsplash.com/photo-1493962853295-0fd70327578a?auto=format&fit=crop&w=20&q=10",
    featured: false,
    new: true,
    stock: 27,
    rating: 4.3,
    reviews: 19,
  }
];

export const categories = [
  { name: "All", value: "all" },
  { name: "Audio", value: "audio" },
  { name: "Home", value: "home" },
  { name: "Accessories", value: "accessories" },
  { name: "Kitchen", value: "kitchen" },
];

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

export const getNewProducts = (): Product[] => {
  return products.filter(product => product.new);
};

export const getProductsByCategory = (category: string): Product[] => {
  if (category === "all") return products;
  return products.filter(product => product.category.toLowerCase() === category.toLowerCase());
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};
