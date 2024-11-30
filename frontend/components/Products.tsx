'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { 
  ShoppingCart, 
  Heart, 
  Star, 
  Filter 
} from 'lucide-react';

const PRODUCT_CATEGORIES = [
  'Jerseys', 
  'Accessories', 
  'Collectibles', 
  'Fan Gear'
];

const PRODUCTS = [
  {
    id: 1,
    name: 'RCB Official Jersey 2024',
    price: '₹2,999',
    category: 'Jerseys',
    image: '/jersey.jpg',
    rating: 4.5,
    description: 'Authentic Royal Challengers Bangalore jersey, made with premium breathable fabric.'
  },
  {
    id: 2,
    name: 'Mumbai Indians Cap',
    price: '₹799',
    category: 'Accessories',
    image: '/jersey.jpg',
    rating: 4.7,
    description: 'Official Mumbai Indians baseball cap with embroidered team logo.'
  },
  {
    id: 3,
    name: 'CSK Commemorative Bat',
    price: '₹6,999',
    category: 'Collectibles',
    image: '/jersey.jpg',
    rating: 4.9,
    description: 'Limited edition bat signed by Chennai Super Kings players.'
  },
  {
    id: 4,
    name: 'IPL Trophy Replica',
    price: '₹4,499',
    category: 'Collectibles',
    image: '/jersey.jpg',
    rating: 4.8,
    description: 'Exact replica of the IPL Championship Trophy, perfect for collectors.'
  },
  {
    id: 5,
    name: 'Team India Fan Scarf',
    price: '₹599',
    category: 'Fan Gear',
    image: '/jersey.jpg',
    rating: 4.6,
    description: 'Soft, warm scarf with Indian cricket team colors and emblem.'
  },
  {
    id: 6,
    name: 'Cricket Gloves Pro',
    price: '₹2,499',
    category: 'Accessories',
    image: '/jersey.jpg',
    rating: 4.7,
    description: 'Professional grade batting gloves with advanced grip technology.'
  }
];

export default function ProductSection() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');

  const filteredProducts = selectedCategory === 'All' 
    ? PRODUCTS 
    : PRODUCTS.filter(product => product.category === selectedCategory);

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch(sortBy) {
      case 'price-low':
        return parseInt(a.price.replace('₹', '')) - parseInt(b.price.replace('₹', ''));
      case 'price-high':
        return parseInt(b.price.replace('₹', '')) - parseInt(a.price.replace('₹', ''));
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  return (
    <section className="max-w-7xl mx-auto px-4 py-16 ">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
         
      <h1 className="mt-6 px-6 py-3 font-bold border rounded-xl bg-gradient-to-t from-neutral-800 to-neutral-100 bg-clip-text text-transparent text-4xl transition">
        All Products 
      </h1>
   
      </motion.div>

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
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6"
      >
        {sortedProducts.map((product) => (
          <motion.div
            key={product.id}
            variants={{
              hidden: { y: 20, opacity: 0 },
              visible: { y: 0, opacity: 1 }
            }}
            whileHover={{ scale: 1.05 }}
            className=" rounded-2xl shadow-lg overflow-hidden group bg-gray-950"
          >
            <div className="relative aspect-square">
              <Image 
                src={product.image}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
             
            </div>
            <div className="p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-lg text-white">{product.name}</h3>
                <div className="flex items-center text-yellow-500">
                  <Star className="w-4 h-4 mr-1 fill-current" />
                  <span className="text-sm">{product.rating}</span>
                </div>
              </div>
              <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                {product.description}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-blue-600">{product.price}</span>
                <Button 
                  variant="default" 
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 group"
                >
                  <ShoppingCart className="mr-2 w-4 h-4 group-hover:animate-bounce" /> 
                  Add to Cart
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}