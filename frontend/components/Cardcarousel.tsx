"use client";
import Image from "next/image";
import React from "react";
import { Card, Carousel } from "./ui/card-carousel";

export function CardsCarousel() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className="w-full h-full pt-10">
      <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
      Discover IPL Exclusives      </h2>
      <Carousel items={cards} />
    </div>
  );
}

const data = [
    {
      category: "Merchandise",
      title: "Support your team with official IPL jerseys!",
      src: "/jersey.jpg",
    },
    {
      category: "Accessories",
      title: "Exclusive team caps for true IPL fans.",
      src: "/ipl-cap.jpg",
    },
    {
      category: "Memorabilia",
      title: "Autographed cricket bats by IPL stars.",
      src: "/ipl-bat.avif",
    },
    {
      category: "Events",
      title: "Book tickets for the next IPL match near you!",
      src: "/ipl-ticket.webp",
    },
    {
      category: "Offers",
      title: "Special discounts on IPL merchandise this season!",
      src: "/ipl-logo.jpg",
    },
    {
        category: "Merchandise",
        title: "Support your team with official IPL jerseys!",
        src: "/jersey.jpg",
      },
  
    {
        category: "Fan Zone",
        title: "Customize IPL-themed phone cases and mugs.",
        src: "/fan-zone.webp",
      },
      {
        category: "Accessories",
        title: "Exclusive team caps for true IPL fans.",
        src: "/ipl-cap.jpg",
      },
  
    {
      category: "Celebrations",
      title: "Celebrate IPL victory with party decorations and cakes!",
      src: "/ipl-cake.webp",
    
    },
  ];
  
  
