'use client'
import Image from 'next/image';
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { ShoppingCart, ArrowRight } from 'lucide-react';

import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay"
import { useTheme } from '@/app/context/ThemeContext';

const PRODUCTS = [
  {
    name: 'Cricket Jersey Collector\'s Edition',
    price: '₹2,999',
    primaryColor: 'bg-gradient-to-br from-blue-600 to-blue-800',
    productImage: '/jersey.jpg',
    description: 'Limited Edition IPL Jersey Collection - Authentic Team Designs'
  },
  {
    name: 'Premium Cricket Bat',
    price: '₹7,499',
    primaryColor: 'bg-gradient-to-br from-yellow-500 to-yellow-700',
    productImage: '/dhoni.jpg',
    description: 'Professional Grade Cricket Bat - Used by Top Players'
  },
  {
    name: 'IPL Fan Merchandise Kit',
    price: '₹1,499',
    primaryColor: 'bg-gradient-to-br from-orange-600 to-orange-800',
    productImage: '/kit-ipl.jpg',
    description: 'Complete Fan Experience Kit with Accessories and Collectibles'
  }
];

export default function Hero() {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false })
  );
  const { theme } = useTheme(); 

  return (
    <div 
    className="relative h-[500px] md:h-[600px] max-w-7xl mx-auto rounded-3xl mt-10 overflow-hidden shadow-2xl"
    style={{
      background: theme 
        ? `linear-gradient(to bottom right, ${theme.gradient.from}, ${theme.gradient.to})`
        : 'linear-gradient(to right, #1e3a8a, #4338ca)'
    }}
  >      <Image
        src="/cricket.jpg"
        alt="IPL Merchandise Store"
        fill
        className="absolute inset-0 object-cover object-center  filter brightness-50 opacity-70"
        priority
      />
      
      <div className="relative z-20 h-full flex flex-col lg:flex-row items-center justify-between p-6 lg:p-8">
        <motion.div 
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-1/2 text-white text-center lg:text-left space-y-6"
        >
          <motion.h1 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              type: "spring", 
              stiffness: 100, 
              delay: 0.2 
            }}
            className="text-4xl sm:text-5xl md:text-6xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-red-600"
          >
            IPL Merchandise Store
          </motion.h1>
          
          <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-6 leading-relaxed">
            Discover premium cricket merchandise, fan collectibles, and official team gear for true cricket enthusiasts.
          </p>
          
          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 justify-center lg:justify-start">
        <Button 
          variant="default" 
          size="lg" 
          style={{
            backgroundColor: theme ? theme.primaryColor : '#yellow-500',
            color: theme ? theme.textColor : '#1e3a8a'
          }}
          className="hover:bg-opacity-90 transition-all transform hover:scale-105 group"
        >
          <ShoppingCart className="mr-2" /> Shop Now 
          <ArrowRight className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Button>
      </div>
        </motion.div>
        
<motion.div 
  initial={{ opacity: 0, x: 100 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.8 }}
  className="w-full lg:w-1/2 mt-12 lg:mt-0 lg:flex lg:justify-end hidden lg:block"
>
  <Carousel 
    plugins={[plugin.current]}
    className="w-full max-w-96 mx-auto lg:mx-0"
    opts={{
      align: "start",
      loop: true,
    }}
  >
    <CarouselContent>
      {PRODUCTS.map((product, index) => (
        <CarouselItem key={index}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-center relative"
          >
            <div className="absolute inset-0 bg-black/20 rounded-2xl group-hover:opacity-100 opacity-0 transition-opacity duration-300"></div>
            <Image 
              src={product.productImage} 
              alt={`${product.name}`}
              layout="responsive" 
              width={320}
              height={380}
              className="object-contain rounded-xl mb-4 relative z-10"
            />
          </motion.div>
        </CarouselItem>
      ))}
    </CarouselContent>
  </Carousel>
</motion.div>

      </div>
    </div>
  );
}
