"use client"
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
const AnimatedImageCircle = () => {
  const images = [
    "/assets/images/icc6.jpg",
    "/assets/images/icc2.jpg",
    "/assets/images/icc3.jpg",
    "/assets/images/icc4.jpg",
    "/assets/images/icc5.jpg",
  ]; // Add paths to your images here


  const [activeImage, setActiveImage] = useState(0);

  const clickNext = () => {
    activeImage === images.length - 1
      ? setActiveImage(0)
      : setActiveImage(activeImage + 1);
  };
  const clickPrev = () => {
    activeImage === 0
      ? setActiveImage(images.length - 1)
      : setActiveImage(activeImage - 1);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      clickNext();
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, [activeImage]);


  return (
    <div className=" flex flex-col rounded-xl" 
          >
     
       <AnimatePresence mode="wait" className=" flex flex-col rounded-xl " 
          >
          <motion.img
            key={activeImage}
            src={images[activeImage]}
            alt={`Image ${activeImage + 1}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            style={{
              objectFit: "cover",
              borderRadius: 10
            }}
          />
        </AnimatePresence>
    </div>
      
  );
};
  
  export default AnimatedImageCircle;