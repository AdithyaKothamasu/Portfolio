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

  const handleTransition = useCallback(() => {
    setTransitionTriggered(true);
  }, []);

  const handleMidpoint = useCallback(() => {
    setShowMainPage(true);
  }, []);

  const handleTransitionComplete = useCallback(() => {
    setTransitionDone(true);
  }, []);

  const mainLayerClassName = transitionDone
    ? 'relative z-10 min-h-screen'
    : 'fixed inset-0 z-10 overflow-hidden pointer-events-none';

  return (
    <div className="min-h-screen w-full bg-[#0f0f0f] relative text-white">
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

      <motion.div
        initial={false}
        animate={{ opacity: showMainPage ? 1 : 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className={mainLayerClassName}
        aria-hidden={!showMainPage}
      >
        <MainPage />
      </motion.div>

      {!showMainPage && (
        <div className="fixed inset-0 z-20 flex items-center justify-center">
          <EntryScreen onTransition={handleTransition} />
        </div>
      )}

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
