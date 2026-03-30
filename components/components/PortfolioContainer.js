'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import EntryScreen from './EntryScreen';
import MainPage from './page';
import CloudTransition from './CloudTransition';

export default function PortfolioContainer() {
  const [showMainPage, setShowMainPage] = useState(false);
  const [transitionTriggered, setTransitionTriggered] = useState(false);
  const [transitionDone, setTransitionDone] = useState(false);

  const handleTransition = () => {
    setTransitionTriggered(true);
  };

  const handleMidpoint = useCallback(() => {
    setShowMainPage(true);
  }, []);

  const handleTransitionComplete = useCallback(() => {
    setTransitionDone(true);
  }, []);

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

      {/* Content */}
      <div className="relative z-10 min-h-screen overflow-y-auto">
        {!showMainPage ? (
          <div className="min-h-screen flex items-center justify-center">
            <EntryScreen onTransition={handleTransition} />
          </div>
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
            className="min-h-screen"
          >
            <MainPage />
          </motion.div>
        )}
      </div>

      {/* Cloud transition overlay -- always mounted until transition completes */}
      {!transitionDone && (
        <CloudTransition
          triggered={transitionTriggered}
          onMidpoint={handleMidpoint}
          onComplete={handleTransitionComplete}
        />
      )}
    </div>
  );
}
