import { useTheme } from "@/app/context/ThemeContext";
import React from "react";

const Marquee = () => {
    const { theme } = useTheme();

  return (
    <div className=" py-4"
    style={{
        backgroundColor: theme ? theme.primaryColor : 'black',
        color: theme ? theme.textColor : 'black'
      }}
    
    >
      <div className="overflow-hidden whitespace-nowrap">
        <div className="flex animate-marquee space-x-8">
          {[
            "🚀 Free Shipping on orders above ₹999!",
            "🔥 Limited-time Discounts!",
            "💡 24/7 Customer Support!",
            "🎉 New Products Added Weekly!",
            "🏏 IPL Official Merchandise Now Available!",
          ].map((text, index) => (
            <span
              key={index}
              className="text-lg md:text-xl font-bold text-white px-8 transform hover:scale-105 transition-all"
            >
              {text}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Marquee;
