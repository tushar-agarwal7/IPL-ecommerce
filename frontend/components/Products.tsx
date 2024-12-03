'use client'
import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { ShoppingCart, Star, Trash2 } from 'lucide-react';
import { useTheme } from '@/app/context/ThemeContext';
import axios from 'axios';
import { toast, Toaster } from 'sonner';
import Link from 'next/link';

interface Product {
  _id: string;
  name: string;
  team: string;
  price: number;
  image: string;
  description: string;
}

interface CartItem extends Product {
  quantity: number;
}

export default function ProductSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('featured');
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userTeam, setUserTeam] = useState<string>('');

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }

    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      const storedUserTeam = parsedUser?.team;
      if (storedUserTeam) {
        setUserTeam(storedUserTeam);
      }
    }
  }, []);

  const BACKEND_URL = useMemo(() => process.env.NEXT_PUBLIC_BACKEND_URL, []);
  useEffect(() => {
    if (!userTeam) return; 
    const fetchProducts = async () => {
      try {
        const response = await axios.get<Product[]>(`${BACKEND_URL}/api/v1/products/all`, {
          params: { team: userTeam }
        });
        setProducts(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        toast.error('Failed to load products');
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [userTeam]);

  // Cart functionality
  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item._id === product._id);
      
      let newCart;
      if (existingItem) {
        newCart = prevCart.map(item => 
          item._id === product._id 
            ? {...item, quantity: item.quantity + 1}
            : item
        );
      } else {
        newCart = [...prevCart, {...product, quantity: 1}];
      }

      localStorage.setItem('cart', JSON.stringify(newCart));
      
      toast.success(`${product.name} added to cart. Please Refresh your window`);
      
      return newCart;
    });
  };

  const PRODUCT_CATEGORIES = ['All', ...new Set(products.map(product => product.team))];

  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(product => product.team === selectedCategory);

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      default:
        return 0;
    }
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <section
      className="max-w-7xl mx-auto px-4 pb-20 flex flex-col relative"
      // style={{
      //   background: theme
      //     ? `linear-gradient(to bottom, ${theme.gradient.from}20, ${theme.gradient.to}20)`
      //     : 'transparent'
      // }}
    >
      <Toaster />

      
  

      <h1 className="mt-6 px-6 py-3 text-center mb-5 font-bold border rounded-xl bg-gradient-to-t from-neutral-800 to-neutral-100 bg-clip-text text-transparent text-4xl transition">
        All Products
      </h1>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              delayChildren: 0.2,
              staggerChildren: 0.1
            }
          }
        }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        {sortedProducts.map((product) => (
          <motion.div
            key={product._id}
            variants={{
              hidden: { y: 20, opacity: 0 },
              visible: { y: 0, opacity: 1 }
            }}
            whileHover={{ scale: 1.05 }}
            className="rounded-2xl shadow-lg overflow-hidden group"
            style={{
              backgroundColor: theme
                ? `${theme.primaryColor}20`
                : 'bg-gray-950'
            }}
          >
            <div className="relative aspect-square">
              <Image
                src={product.image || '/jersey.jpg'}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="p-4">
              <div className="flex justify-between items-center mb-2">
                <h3
                  className="font-bold text-lg sm:text-base"
                  style={{ color: theme ? theme.textColor : 'white' }}
                >
                  {product.name}
                </h3>
                <div className="flex items-center text-yellow-500">
                  <Star className="w-4 h-4 mr-1 fill-current" />
                  <span className="text-sm">4.5</span>
                </div>
              </div>
              <p
                className="text-gray-500 text-sm mb-4 line-clamp-2 sm:text-xs"
                style={{ color: theme ? `${theme.textColor}80` : 'text-gray-500' }}
              >
                {product.description}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-black sm:text-lg"
                style={{
                  color: theme ? theme.textColor : 'white'
                }}
                >
                  ₹{product.price}
                </span>
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => addToCart(product)}
                  className={`hover:opacity-90 group ${theme
                    ? `bg-[${theme.primaryColor}] text-[${theme.textColor}] hover:bg-[${theme.secondaryColor}]`
                    : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                  style={{
                    color: theme ? theme.textColor : 'white'
                  }}
                >
                  <ShoppingCart className="mr-2 w-4 h-4 group-hover:animate-bounce"  />
                  Add to Cart
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {sortedProducts.length === 0 && (
        <div className="text-center text-gray-500 mt-8">
          No products found in this category.
        </div>
      )}
    </section>
  );
}