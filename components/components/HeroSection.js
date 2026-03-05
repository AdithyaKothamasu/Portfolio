'use client';

import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="relative w-full max-w-6xl mx-auto mt-15 px-4 md:px-8 pb-16 md:pb-24">
      {/* Desktop corner portrait - plain image */}
      <div className="pointer-events-none hidden md:block absolute right-4 top-4">
        <div className="relative w-80 h-80">
          <Image
            src="/hiking.jpeg"
            alt="Portrait of Adithya Kothamasu"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      <div className="flex flex-col gap-6 md:gap-8">
        {/* Mobile portrait, still small and secondary - plain image */}
        <div className="flex justify-end md:hidden pt-4">
          <div className="relative w-40">
            <Image
              src="/hero.png"
              alt="Portrait of Adithya Kothamasu"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        <div className="max-w-3xl space-y-5 md:space-y-7 text-left opacity-0 translate-y-3 animate-[heroFadeIn_0.7s_ease-out_forwards]">
          <p className="text-xs md:text-sm uppercase tracking-[0.25em] text-white/50">
            Software · Product · Entrepreneurship
          </p>

          {/* <h1 className="text-3xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-white">
            <span className="font-light text-white/70">Sai</span>
            {' '}Adithya{' '}
            <span className="font-light text-white/70">Kothamasu</span>
          </h1> */}

          <div className="space-y-3 md:space-y-4 text-white/80 md:text-lg leading-relaxed">
            <p>
              I&apos;m a{' '}
              <span className="inline-flex items-center rounded-full text-xs md:text-lg font-medium text-yellow-300">
                software developer
              </span>
              ,{' '}
              <span className="inline-flex items-center rounded-full text-xs md:text-lg font-medium text-red-400">
                entrepreneur
              </span>
              , and{' '}
              <span className="inline-flex items-center rounded-full text-xs md:text-lg font-medium text-blue-400">
                student
              </span>
              .
            </p>
            <p>
              I am currently pursuing a Bachelor&apos;s in{' '}
              <span className="font-semibold text-yellow-300">Computer Science</span> with a minor in{' '}
              <span className="font-semibold text-red-400">Finance</span> at BITS Pilani, Hyderabad
              Campus.
            </p>
            <p>
              I build products that solve{' '}
              <span className="font-semibold text-blue-400">real problems</span> and have fun along
              the way.
            </p>
            <p>
              When I&apos;m not coding, you&apos;ll find me at the gym, playing volleyball, or
              bingeing on Youtube.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

