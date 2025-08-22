'use client';

import { useRouter } from 'next/navigation';

export default function MainPage() {
  return (
    <div className="min-h-screen w-full relative text-white">
      {/* Your Content/Components */}
      <div className="relative z-10 p-8">
        <h1 className="text-4xl font-bold mb-4">Welcome to My Portfolio</h1>
        <p className="text-xl">This is the main content area.</p>
      </div>
    </div>
  );
}
