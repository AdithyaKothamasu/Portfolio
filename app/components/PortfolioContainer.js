'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import EntryScreen from './EntryScreen';
import MainPage from '../main/page';

export default function PortfolioContainer() {
  const [showMainPage, setShowMainPage] = useState(false);

  const handleTransition = () => {
    setShowMainPage(true);
  };

  return (
    <div className="min-h-screen w-full bg-[#0f0f0f] relative text-white">
      {/* Shared Background Grid Pattern */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, #262626 1px, transparent 1px),
            linear-gradient(to bottom, #262626 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px",
        }}
      />
      
      {/* Component Content with Animation */}
      <AnimatePresence mode="wait">
        {!showMainPage ? (
          <motion.div
            key="entry"
            initial={{ opacity: 1, scale: 1 }}
            exit={{ 
              opacity: 0.3,
              scale: 5,
              transition: { duration: 1.5, ease: "easeIn" }
            }}
            className="absolute inset-0 z-10"
          >
            <EntryScreen onTransition={handleTransition} />
          </motion.div>
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute inset-0 z-10"
          >
            <MainPage />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
