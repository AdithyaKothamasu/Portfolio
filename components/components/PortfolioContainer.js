'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import EntryScreen from './EntryScreen';
import MainPage from './page';

export default function PortfolioContainer() {
  const [showMainPage, setShowMainPage] = useState(false);

  const handleTransition = () => {
    setShowMainPage(true);
  };

  return (
    <div className="min-h-screen w-full bg-[#0f0f0f] relative text-white">
      {/* Fixed Background Grid Pattern */}
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, #262626 1px, transparent 1px),
            linear-gradient(to bottom, #262626 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px",
        }}
      />
      
      {/* Scrollable Content Container */}
      <div className="relative z-10 min-h-screen overflow-y-auto">
        {/* Component Content with Animation */}
        <AnimatePresence mode="wait">
          {!showMainPage ? (
            <motion.div
              key="entry"
              initial={{ opacity: 1, scale: 1 }}
              exit={{ 
                opacity: 1,
                scale: 20,
                transition: { duration: 1.5, ease: "easeIn" }
              }}
              className="min-h-screen flex items-center justify-center"
            >
              <EntryScreen onTransition={handleTransition} />
            </motion.div>
          ) : (
            <motion.div
              key="main"
              initial={{ opacity: 1, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeIn" }}
              className="min-h-screen"
            >
              <MainPage />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
