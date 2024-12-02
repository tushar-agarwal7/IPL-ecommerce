"use client";
import { Heart, Menu, Search, ShoppingCart, Trash2, User } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { UserDropdown } from "./UserDropdown";
import Image from "next/image";
import { useTheme } from "@/app/context/ThemeContext";
import { toast, Toaster } from 'sonner';
import Confetti from 'react-confetti';

type User = {
  name: string;
  email: string;
  image?: string;
};

interface CartItem {
  _id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isConfettiActive, setIsConfettiActive] = useState(false);
  const { theme } = useTheme();
  

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const removeFromCart = (productId: string) => {
    const newCart = cart.filter(item => item._id !== productId);
    
    localStorage.setItem('cart', JSON.stringify(newCart));
    
    toast.error('Item removed from cart');
    setCart(newCart);
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }

    const newCart = cart.map(item => 
      item._id === productId 
        ? {...item, quantity: newQuantity}
        : item
    );

    localStorage.setItem('cart', JSON.stringify(newCart));
    
    setCart(newCart);
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
  
    const orderId = Math.random().toString(36).substring(2, 10).toUpperCase();
    
    const orderSummary = {
      orderId,
      items: cart,
      total: calculateTotal(),
      date: new Date().toLocaleDateString(),
      estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString() // 7 days 
    };
  
    toast.info('Processing your order...', {
      duration: 2000
    });
  
    setTimeout(() => {
      setIsConfettiActive(true);
      toast.success('Order Placed Successfully!', {
        description: `Order #${orderId}\nTotal: ₹${orderSummary.total}\nEstimated Delivery: ${orderSummary.estimatedDelivery}`,
        duration: 5000
      });
  
      //  Clear cart
      localStorage.removeItem('cart');
      setCart([]);
      setIsCartOpen(false);

      setTimeout(() => {
        setIsConfettiActive(false);
      }, 5000);
    }, 2000);
  };

  return (
    <>
      <Toaster />
      {isConfettiActive && (
                  <Confetti
                  width={window.innerWidth}
                  height={window.innerHeight}
                  recycle={false}
                  numberOfPieces={300}
                />
      )}
      <header
        className="shadow-md sticky top-0 z-50"
        style={{
          backgroundColor: theme ? theme.primaryColor : 'black',
          color: theme ? theme.textColor : 'white'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative w-10 h-10">
                <Image
                  src={theme ? theme.logo : "/logo.png"}
                  alt="Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <h1 className="text-2xl font-bold">
                {theme ? theme.name : 'IPL'}
              </h1>
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <div 
                className="relative cursor-pointer"
                onClick={() => setIsCartOpen(!isCartOpen)}
              >
                <ShoppingCart 
                  className={`w-6 h-6 ${theme 
                    ? `text-[${theme.textColor}] hover:opacity-70` 
                    : 'text-white hover:opacity-70'
                  }`} 
                />
                {cart.length > 0 && (
                  <span 
                    className="absolute -top-2 -right-2 bg-red-500 text-white 
                    rounded-full px-2 py-1 text-xs font-bold"
                  >
                    {cart.reduce((total, item) => total + item.quantity, 0)}
                  </span>
                )}
              </div>
              
              {/* User Section */}
              <div>
                {user ? (
                  <UserDropdown
                    email={user.email}
                    name={user.name}
                    userImage={user.image || "https://ui-avatars.com/api/?name=User&background=random"}
                  />
                ) : (
                  <Button variant="ghost" asChild>
                    <Link href="/login">Login</Link>
                  </Button>
                )}
              </div>
            </div>
            
            {/* Mobile Menu */}
            <button
              onClick={toggleMenu}
              aria-label="Menu"
              className="md:hidden p-2 rounded-full"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
        
        {/* Mobile Menu Drawer */}
        {menuOpen && (
          <div 
            className="md:hidden shadow-lg absolute top-full inset-x-0"
            style={{
              backgroundColor: theme ? theme.primaryColor : 'black',
              color: theme ? theme.textColor : 'white'
            }}
          >
            <div className="flex flex-col items-start gap-4 p-4">
              {/* Mobile Shopping Cart */}
              <div 
                className="flex items-center gap-2 w-full cursor-pointer"
                onClick={() => setIsCartOpen(!isCartOpen)}
              >
                <ShoppingCart size={20} />
                <span>Cart</span>
                {cart.length > 0 && (
                  <span className="ml-2 bg-red-500 text-white rounded-full px-2 py-1 text-xs">
                    {cart.reduce((total, item) => total + item.quantity, 0)}
                  </span>
                )}
              </div>
              
              {/* User Section */}
              <div>
                {user ? (
                  <UserDropdown
                    email={user.email}
                    name={user.name}
                    userImage={user.image || "https://ui-avatars.com/api/?name=User&background=random"}
                  />
                ) : (
                  <Button variant="ghost" asChild>
                    <Link href="/login">Login</Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Cart Sidebar */}
      {isCartOpen && (
  <div 
    className={`fixed inset-0 z-50 transform transition-transform duration-300 ease-in-out bg-opacity-50 bg-black ${
      isCartOpen ? 'translate-x-0' : 'translate-x-full'
    }`}
  >
    <div 
      className="absolute top-0 right-0 w-full sm:w-96 h-full bg-white shadow-xl overflow-y-auto" 
      style={{ backgroundColor: theme ? theme.primaryColor : 'white' }}
    >
      <div 
        className="p-4"
        style={{ color: theme ? theme.textColor : 'black' }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Your Cart</h2>
          <button 
            onClick={() => setIsCartOpen(false)}
            className="text-gray-500 hover:text-gray-700"
            style={{ color: theme ? theme.textColor : 'inherit' }}
          >
            Close
          </button>
        </div>

        {cart.length === 0 ? (
          <p className="text-center text-gray-500">Your cart is empty</p>
        ) : (
          <>
            {cart.map((item) => (
              <div 
                key={item._id} 
                className="flex items-center justify-between border-b py-4"
              >
                <div className="flex items-center">
                  <Image 
                    src={item.image || '/jersey.jpg'} 
                    alt={item.name} 
                    width={50} 
                    height={50} 
                    className="object-cover mr-4" 
                  />
                  <div>
                    <h3 className="font-bold text-sm">{item.name}</h3>
                    <p className="text-sm">₹{item.price}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <button 
                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                    className="px-2 py-1 bg-gray-200 text-black rounded-l"
                  >
                    -
                  </button>
                  <span className="px-3 py-1 text-black bg-gray-100 text-sm">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                    className="px-2 py-1 text-black bg-gray-200 rounded-r"
                  >
                    +
                  </button>
                  <button 
                    onClick={() => removeFromCart(item._id)}
                    className="ml-4 text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
            <div className="mt-6">
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>₹{calculateTotal()}</span>
              </div>
              <Button 
                className="w-full mt-4"
                onClick={handleCheckout}
              >
                Checkout
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  </div>
)}

    </>
  );
};

export default Navbar;